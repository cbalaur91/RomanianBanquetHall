import { useCallback, useMemo } from 'react';
import { BOOKED_DATES, MONTHS, WEEKDAYS } from '../../data/bookings';

interface BookingCalendarProps {
  hallName: string;
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onDateSelect: (message: string) => void;
}

export function BookingCalendar({
  hallName,
  currentDate,
  onDateChange,
  onDateSelect
}: BookingCalendarProps) {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const getDaysInMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }, []);

  const getBookedDatesForMonth = useCallback((): number[] => {
    const hall = hallName === 'Grand Ballroom' ? BOOKED_DATES.grandBallroom : BOOKED_DATES.chateauHall;

    // Check year-based format first
    const yearData = hall[year];
    if (yearData && typeof yearData === 'object' && !Array.isArray(yearData)) {
      const monthData = (yearData as Record<number, number[]>)[month + 1];
      if (monthData) return monthData;
    }

    // Fallback to legacy format
    const legacyData = hall[month + 1];
    if (Array.isArray(legacyData)) return legacyData;

    return [];
  }, [hallName, month, year]);

  const isToday = useCallback((day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === year &&
      today.getMonth() === month &&
      today.getDate() === day
    );
  }, [month, year]);

  const formatDateMessage = useCallback((day: number) => {
    const selectedDate = new Date(year, month, day);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `Hello,\n\nI am interested in booking the ${hallName} for ${formattedDate}. Could you please provide me with information about:\n\n1. Availability for this date\n2. Pricing and packages available\n3. Required deposit and payment terms\n\nThank you for your assistance.\n\nBest regards`;
  }, [hallName, month, year]);

  const days = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    return Array.from({ length: 42 }, (_, i) => {
      const day = i - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  }, [currentDate, getDaysInMonth, getFirstDayOfMonth]);

  const bookedDates = getBookedDatesForMonth();

  const changeMonth = (increment: number) => {
    onDateChange(new Date(year, month + increment, 1));
  };

  const setMonth = (newMonth: number) => {
    onDateChange(new Date(year, newMonth, 1));
  };

  const setYear = (newYear: number) => {
    onDateChange(new Date(newYear, month, 1));
  };

  const handleDateClick = (day: number) => {
    if (!bookedDates.includes(day)) {
      const message = formatDateMessage(day);
      onDateSelect(message);
    }
  };

  return (
    <div className="bg-warmGray-800/50 backdrop-blur-sm p-6 rounded-xl border border-white/5">
      <h3 className="text-2xl font-serif mb-6 text-center">{hallName}</h3>

      {/* Calendar navigation */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => changeMonth(-1)}
          className="text-gold hover:text-gold-light transition-colors px-3 py-1.5 rounded hover:bg-white/5"
          aria-label="Previous month"
        >
          ← Prev
        </button>

        <div className="flex items-center gap-2">
          <select
            value={month}
            onChange={(e) => setMonth(parseInt(e.target.value))}
            className="bg-warmGray-800 text-white border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
            aria-label="Select month"
          >
            {MONTHS.map((monthName, index) => (
              <option key={monthName} value={index}>
                {monthName}
              </option>
            ))}
          </select>

          <select
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}
            className="bg-warmGray-800 text-white border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gold/50 cursor-pointer"
            aria-label="Select year"
          >
            {Array.from({ length: 27 }, (_, i) => new Date().getFullYear() + i).map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => changeMonth(1)}
          className="text-gold hover:text-gold-light transition-colors px-3 py-1.5 rounded hover:bg-white/5"
          aria-label="Next month"
        >
          Next →
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isBooked = day !== null && bookedDates.includes(day);
          const isTodayDate = day !== null && isToday(day);

          return (
            <button
              key={i}
              onClick={() => day && handleDateClick(day)}
              disabled={!day || isBooked}
              className={`
                aspect-square flex items-center justify-center rounded-lg text-sm
                transition-all duration-200
                ${!day ? 'invisible' : ''}
                ${isBooked
                  ? 'bg-red-900/40 text-red-300 cursor-not-allowed'
                  : day
                    ? 'bg-warmGray-700/50 hover:bg-gold hover:text-black cursor-pointer hover:scale-105'
                    : ''
                }
                ${isTodayDate ? 'ring-2 ring-gold calendar-day-today' : ''}
              `}
              aria-label={
                day
                  ? isBooked
                    ? `${MONTHS[month]} ${day} - Booked`
                    : `${MONTHS[month]} ${day} - Available, click to inquire`
                  : undefined
              }
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warmGray-700/50 rounded" />
          <span className="text-gray-400">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-900/40 rounded" />
          <span className="text-gray-400">Booked</span>
        </div>
      </div>
    </div>
  );
}
