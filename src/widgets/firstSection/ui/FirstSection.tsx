// src/features/bsod-scene/ui/FirstSection.tsx
import { useEffect, useState } from 'react';
import styles from './FirstSection.module.css';

const FirstSection = ({ onRestart }: { onRestart: () => void }) => {
  const [showBsodMessage, setShowBsodMessage] = useState(true);
  const [titleVisible, setTitleVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  const title = '> 10 000 строк.';
  const subtitle = '> от любви до смерти.';

  // BSOD-сообщение в стиле Windows 98
  const bsodMessage = [
    'A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) +',
    '00010E36. The current application will be terminated.',
    '',
    '* Press any key to terminate the current application.',
    '* Press CTRL+ALT+DEL again to restart your computer. You will',
    '  lose any unsaved information in all applications.',
    '',
    'Press any key to continue _',
  ];

  const errorSound = new Audio('/sounds/error-beep.mp3');
  const startupSound = new Audio('/sounds/startup.mp3');

  // Обработчик нажатия клавиши Enter
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && showBsodMessage) {
        setShowBsodMessage(false);
        setTitleVisible(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () =>
      window.removeEventListener('keydown', handleKeyPress);
  }, [showBsodMessage]);

  // Эффект печати заголовка
  useEffect(() => {
    if (!titleVisible) return;

    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < title.length) {
        setTypedTitle((prev) => prev + title[index - 1]);
        index++;
      } else {
        clearInterval(typingInterval);
        let subIndex = 0;
        const subtitleInterval = setInterval(() => {
          if (subIndex < subtitle.length) {
            setTypedSubtitle((prev) => prev + subtitle[subIndex - 1]);
            subIndex++;
          } else {
            clearInterval(subtitleInterval);
            setButtonVisible(true);
            errorSound.play().catch((error) => {
              console.error('Error playing sound:', error);
            });
          }
        }, 100);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [titleVisible]);

  // Эффект загрузки
  useEffect(() => {
    if (!isLoading) return;

    startupSound.play().catch((error) => {
      console.error('Error playing startup sound:', error);
    });

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setFadeOut(true);
          setTimeout(() => {
            onRestart();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    return () => clearInterval(progressInterval);
  }, [isLoading, onRestart]);

  const handleRestartClick = () => {
    setIsLoading(true);
  };

  return (
    <div
      className={`${styles.bsod} ${fadeOut ? styles.fadeOut : ''}`}
    >
      {isLoading ? (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingWindow}>
            <div className={styles.loadingHeader}>Windows</div>
            <div className={styles.loadingBody}>
              <div className={styles.loadingText}>
                Please wait while your computer restarts...
              </div>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      ) : showBsodMessage ? (
        <div className={styles.bsodMessage}>
          <div className={styles.bsodHeader}>Windows</div>
          {bsodMessage.map((line, index) => (
            <div key={index} className={styles.bsodLine}>
              {line}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.titleText}>
            {typedTitle}
            {typedTitle.length < title.length && (
              <span className={styles.cursor}>█</span>
            )}
          </div>
          <div className={styles.subtitleText}>
            {typedSubtitle}
            {typedSubtitle.length < subtitle.length &&
              typedTitle.length === title.length && (
                <span className={styles.cursor}>█</span>
              )}
          </div>
          {buttonVisible && (
            <button
              className={styles.restartButton}
              onClick={handleRestartClick}
            >
              Restart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FirstSection;
