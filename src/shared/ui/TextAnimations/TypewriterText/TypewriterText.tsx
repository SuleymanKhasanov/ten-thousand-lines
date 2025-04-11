// src/shared/ui/TextAnimations/TypewriterText/TypewriterText.tsx
import { useState, useEffect } from 'react';
import style from './TypewriterText.module.css';

interface TypewriterTextProps {
  text: string;
  speed?: number; // Скорость печати (в миллисекундах на букву)
  className?: string;
}

const TypewriterText = ({
  text,
  speed = 50,
  className,
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={`${style.typewriter} ${className || ''}`}>
      {displayedText}
      {currentIndex < text.length && (
        <span className={style.cursor}>█</span>
      )}
    </span>
  );
};

export default TypewriterText;
