import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryImage } from '../../types';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function Lightbox({
  images,
  currentIndex,
  onClose,
  onPrevious,
  onNext
}: LightboxProps) {
  const currentImage = images[currentIndex];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onPrevious();
        break;
      case 'ArrowRight':
        onNext();
        break;
    }
  }, [onClose, onPrevious, onNext]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Use portal to render at document body level, ensuring proper fixed positioning
  return createPortal(
    <div
      className="lightbox-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 10000,
        }}
      >
        <X size={24} className="text-white" />
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Previous image"
        style={{
          position: 'fixed',
          left: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10000,
        }}
      >
        <ChevronLeft size={28} className="text-white" />
      </button>

      {/* Next button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        aria-label="Next image"
        style={{
          position: 'fixed',
          right: '1rem',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10000,
        }}
      >
        <ChevronRight size={28} className="text-white" />
      </button>

      {/* Image container - centered */}
      <div
        className="flex flex-col items-center justify-center"
        style={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          padding: '1rem',
        }}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="lightbox-image rounded-lg shadow-2xl"
          style={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
          }}
        />

        {/* Image counter and caption */}
        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
          <p className="text-white/60 text-sm mt-1">
            {currentImage.alt}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
