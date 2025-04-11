// src/pages/MainPage.tsx
import { useState, useRef, useEffect } from 'react';
import styles from './MainPage.module.css';
import myComputerIcon from '@/shared/assets/icons/my-computer.png';
import trashIcon from '@/shared/assets/icons/trash.png';
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaStepBackward,
  FaStepForward,
} from 'react-icons/fa';
import { SecondSection } from '@/widgets/secondSection';
import { ThirdSection } from '@/widgets/thirdSection';
import { FourSection } from '@/widgets/fourSection';
import { FifthSection } from '@/widgets/fiveSection';

const MainPage = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [showMyComputer, setShowMyComputer] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  // Список треков
  const tracks = [
    {
      src: '/sounds/the-social-network.mp3',
      title: 'The Social Network - Trent Reznor',
    },
    {
      src: '/sounds/kavinsky-nightcall-instrumental.mp3',
      title: 'Kavinsky - Nightcall (Instrumental)',
    },
    // Добавь больше треков, если нужно
  ];

  const audioRef = useRef<HTMLAudioElement>(null);
  const browserContentRef = useRef<HTMLDivElement>(null);

  // Регулировка громкости
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Остановка музыки при воспроизведении видео
  useEffect(() => {
    const handleVideoPlay = () => {
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    const handleVideoPause = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    };

    window.addEventListener('videoPlay', handleVideoPlay);
    window.addEventListener('videoPause', handleVideoPause);

    return () => {
      window.removeEventListener('videoPlay', handleVideoPlay);
      window.removeEventListener('videoPause', handleVideoPause);
    };
  }, [isPlaying]);

  const handleMyComputerClick = () => {
    setShowMyComputer(true);
  };

  const handleTrashClick = () => {
    setShowTrash(true);
  };

  const handleCloseMyComputer = () => {
    setShowMyComputer(false);
  };

  const handleCloseTrash = () => {
    setShowTrash(false);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const handleVolumeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handlePreviousTrack = () => {
    const newIndex =
      currentTrackIndex === 0
        ? tracks.length - 1
        : currentTrackIndex - 1;
    setCurrentTrackIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = tracks[newIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleNextTrack = () => {
    const newIndex =
      currentTrackIndex === tracks.length - 1
        ? 0
        : currentTrackIndex + 1;
    setCurrentTrackIndex(newIndex);
    if (audioRef.current) {
      audioRef.current.src = tracks[newIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className={styles.desktop}>
      {/* Иконки на рабочем столе */}
      <div className={styles.iconWrapper}>
        <div
          className={styles.icon}
          style={{ top: '1.25rem', left: '1.25rem' }}
          onClick={handleMyComputerClick}
        >
          <img
            src={myComputerIcon}
            alt="My Computer"
            className={styles.iconImage}
          />
          <span className={styles.iconLabel}>My Computer</span>
        </div>
        <div
          className={styles.icon}
          style={{ top: '5rem', left: '1.25rem' }}
          onClick={handleTrashClick}
        >
          <img
            src={trashIcon}
            alt="Trash"
            className={styles.iconImage}
          />
          <span className={styles.iconLabel}>Trash</span>
        </div>
      </div>

      {/* Окно "Мой компьютер" */}
      {showMyComputer && (
        <div className={styles.window}>
          <div className={styles.windowHeader}>
            <span
              className={styles.closeButton}
              onClick={handleCloseMyComputer}
            ></span>
            <span className={styles.minimizeButton}></span>
            <span className={styles.maximizeButton}></span>
            <span className={styles.windowTitle}>My Computer</span>
          </div>
          <div className={styles.windowBody}>
            <p>Содержимое: PoetryGen v1.0</p>
          </div>
        </div>
      )}

      {/* Окно "Корзина" */}
      {showTrash && (
        <div className={styles.window}>
          <div className={styles.windowHeader}>
            <span
              className={styles.closeButton}
              onClick={handleCloseTrash}
            ></span>
            <span className={styles.minimizeButton}></span>
            <span className={styles.maximizeButton}></span>
            <span className={styles.windowTitle}>Trash</span>
          </div>
          <div className={styles.windowBody}>
            <p>Корзина пуста</p>
          </div>
        </div>
      )}

      {/* Окно проигрывателя */}
      <div className={styles.playerWindow}>
        <div className={styles.playerHeader}>
          <span className={styles.windowTitle}>
            Windows Media Player
          </span>
        </div>
        <div className={styles.playerBody}>
          <audio
            ref={audioRef}
            src={tracks[currentTrackIndex].src}
            loop
            autoPlay
          />
          <div className={styles.playerControls}>
            <div className={styles.trackInfo}>
              <span>{tracks[currentTrackIndex].title}</span>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={handlePreviousTrack}
                className={styles.playerButton}
              >
                <FaStepBackward className={styles.playerIcon} />
              </button>
              <button
                onClick={handlePlayPause}
                className={styles.playerButton}
              >
                {isPlaying ? (
                  <FaPause className={styles.playerIcon} />
                ) : (
                  <FaPlay className={styles.playerIcon} />
                )}
              </button>
              <button
                onClick={handleNextTrack}
                className={styles.playerButton}
              >
                <FaStepForward className={styles.playerIcon} />
              </button>
            </div>
            <div className={styles.volumeControl}>
              <FaVolumeUp className={styles.playerIcon} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Основное окно слайда */}
      {!isMinimized ? (
        <div
          className={`${styles.window} ${isMaximized ? styles.windowMaximized : ''}`}
        >
          <div className={styles.windowHeader}>
            <span
              className={styles.closeButton}
              onClick={() => setIsMinimized(true)}
            ></span>
            <span
              className={styles.minimizeButton}
              onClick={() => setIsMinimized(true)}
            ></span>
            <span
              className={styles.maximizeButton}
              onClick={handleMaximize}
            ></span>
            <span className={styles.windowTitle}>Window</span>
          </div>
          <div className={styles.windowBody}>
            <div className={styles.browser}>
              <div className={styles.browserHeader}>
                <span className={styles.browserTitle}>
                  Internet Explorer
                </span>
              </div>
              <div className={styles.browserToolbar}>
                <button className={styles.toolbarButton}>Back</button>
                <button className={styles.toolbarButton}>
                  Forward
                </button>
                <button className={styles.toolbarButton}>
                  Refresh
                </button>
              </div>
              <div
                className={styles.browserContent}
                ref={browserContentRef}
              >
                <SecondSection
                  containerRef={browserContentRef}
                  setCurrentTrackIndex={setCurrentTrackIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
                <ThirdSection
                  containerRef={browserContentRef}
                  setCurrentTrackIndex={setCurrentTrackIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
                <FourSection
                  containerRef={browserContentRef}
                  setCurrentTrackIndex={setCurrentTrackIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
                <FifthSection
                  containerRef={browserContentRef}
                  setCurrentTrackIndex={setCurrentTrackIndex}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={styles.minimizedWindow}
          onClick={() => setIsMinimized(false)}
        >
          Internet Explorer
        </div>
      )}
    </div>
  );
};

export default MainPage;
