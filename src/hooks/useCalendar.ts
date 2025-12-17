import { useState, useCallback } from 'react';
import { BOOKED_DATES } from '../data/bookings';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }, []);

  const getFirstDayOfMonth = useCallback((date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }, []);

  const changeMonth = useCallback((increment: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + increment));
  }, []);

  const setMonth = useCallback((month: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear(), month, 1));
  }, []);

  const setYear = useCallback((year: number) => {
    setCurrentDate(prev => new Date(year, prev.getMonth(), 1));
  }, []);

  const getBookedDatesForMonth = useCallback((hallName: string, month: number): number[] => {
    const year = currentDate.getFullYear();
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
  }, [currentDate]);

  const isToday = useCallback((day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth() &&
      today.getDate() === day
    );
  }, [currentDate]);

  const isCurrentMonth = useCallback(() => {
    const today = new Date();
    return (
      today.getFullYear() === currentDate.getFullYear() &&
      today.getMonth() === currentDate.getMonth()
    );
  }, [currentDate]);

  const formatDateMessage = useCallback((day: number, hall: string) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return `Hello,\n\nI am interested in booking the ${hall} for ${formattedDate}. Could you please provide me with information about:\n\n1. Availability for this date\n2. Pricing and packages available\n3. Required deposit and payment terms\n\nThank you for your assistance.\n\nBest regards`;
  }, [currentDate]);

  const generateCalendarDays = useCallback(() => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    return Array.from({ length: 42 }, (_, i) => {
      const day = i - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    });
  }, [currentDate, getDaysInMonth, getFirstDayOfMonth]);

  return {
    currentDate,
    setCurrentDate,
    changeMonth,
    setMonth,
    setYear,
    getBookedDatesForMonth,
    isToday,
    isCurrentMonth,
    formatDateMessage,
    generateCalendarDays,
    month: currentDate.getMonth(),
    year: currentDate.getFullYear()
  };
}
