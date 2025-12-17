export function Footer() {
  return (
    <footer className="bg-warmGray-900 py-8 border-t border-white/5" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Romanian Banquet Hall. Powered by{' '}
          <a
            href="https://aiwebhub.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-gold-light transition-colors"
          >
            AiWebHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
