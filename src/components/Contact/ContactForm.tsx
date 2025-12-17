import { useState, forwardRef } from 'react';

interface ContactFormProps {
  className?: string;
}

export const ContactForm = forwardRef<HTMLTextAreaElement, ContactFormProps>(
  function ContactForm({ className = '' }, ref) {
    const [formResult, setFormResult] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSubmitting(true);
      setFormResult('Sending...');

      const formData = new FormData(event.currentTarget);
      formData.append('access_key', '103b8fb5-f70f-426e-b2e2-461d8ef178de');

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        if (data.success) {
          setFormResult("Thank you! We'll contact you soon.");
          event.currentTarget.reset();
        } else {
          setFormResult('Error sending message. Please try again.');
        }
      } catch {
        setFormResult('Error sending message. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <form className={`space-y-5 ${className}`} onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            aria-label="Your Name"
            required
            className="w-full px-4 py-3 bg-warmGray-800/80 border border-white/10 rounded-lg
                       input-focus-glow focus:outline-none focus:border-gold/50
                       placeholder:text-gray-500 transition-all duration-200"
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            aria-label="Your Email"
            required
            className="w-full px-4 py-3 bg-warmGray-800/80 border border-white/10 rounded-lg
                       input-focus-glow focus:outline-none focus:border-gold/50
                       placeholder:text-gray-500 transition-all duration-200"
          />
        </div>

        <div>
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            aria-label="Your Message"
            ref={ref}
            required
            className="w-full px-4 py-3 bg-warmGray-800/80 border border-white/10 rounded-lg
                       input-focus-glow focus:outline-none focus:border-gold/50
                       placeholder:text-gray-500 transition-all duration-200 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary bg-gold text-black font-semibold py-3 px-4 rounded-lg
                     tracking-wide uppercase text-sm
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {formResult && !isSubmitting && (
          <p
            className={`text-center text-sm py-2 rounded-lg ${
              formResult.includes('Error')
                ? 'text-red-400 bg-red-900/20'
                : 'text-green-400 bg-green-900/20'
            }`}
            role="status"
            aria-live="polite"
          >
            {formResult}
          </p>
        )}
      </form>
    );
  }
);
