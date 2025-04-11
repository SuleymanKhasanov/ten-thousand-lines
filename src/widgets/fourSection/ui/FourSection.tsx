// src/features/terminal-scene/ui/FourSection.tsx
import { motion, useInView } from 'framer-motion';
import TypewriterText from '@/shared/ui/TextAnimations/TypewriterText/TypewriterText';
import style from './FourSection.module.css';
import { useEffect, useRef, useState } from 'react';

const Word = ({
  word,
  index,
  containerRef,
}: {
  word: string;
  index: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      setIsScrollingDown(currentScrollTop > lastScrollTop);
      lastScrollTop = currentScrollTop;
    };

    container.addEventListener('scroll', handleScroll);
    return () =>
      container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  useEffect(() => {
    if (isInView && isScrollingDown) {
      setShouldAnimate(true);
    }
  }, [isInView, isScrollingDown]);

  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'linear',
        delay: index * 0.05, // Печатающий эффект
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={style.word}
      variants={wordVariants}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
    >
      {word === 'Hello, world!' ? (
        <code className={style.code}>{word}</code>
      ) : (
        word
      )}{' '}
    </motion.span>
  );
};

const FourSection = ({
  containerRef,
  setCurrentTrackIndex,
  isPlaying,
  setIsPlaying,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  setCurrentTrackIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.5 });

  // Меняем трек, когда секция становится видимой
  useEffect(() => {
    if (isInView) {
      setCurrentTrackIndex(2); // Устанавливаем трек для FourSection (например, третий трек)
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [isInView, setCurrentTrackIndex, isPlaying, setIsPlaying]);

  const text =
    'Гении вдохновляют. Они ведут за собой. Их энергия способна зажечь других. Но даже самый блестящий ум не сможет долго творить в хаосе. Смерть продукта — это не ошибка кода. Это потеря смысла. Выгорание начинается не с того, что человек устал. Оно начинается тогда, когда усилия перестают казаться значимыми. Когда человек делает, но не чувствует, зачем. Когда задачи приходят сверху без контекста. Когда скорость становится важнее качества. Когда культура ставит KPI выше людей.';
  const words = text.split(' ');

  const text2 =
    'Выгорание — это не проблема одного сотрудника. Это симптом болезни всей системы:';
  const words2 = text2.split(' ');

  const text3 =
    'Хороший продукт — это не только код. Это энергия, которая в него вложена. Если команда опустошена, продукт теряет жизнь.';
  const words3 = text3.split(' ');

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'linear',
      },
    },
  };

  const quoteVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'linear',
        delay: 0.2,
      },
    },
  };

  const videoVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'linear',
        delay: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      className={style.sectionWrapper}
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className={style.window}>
        <div className={style.windowHeader}>
          <span className={style.windowTitle}>
            Chapter III - From Genius to Death
          </span>
          <div className={style.windowButtons}>
            <span className={style.minimizeButton}></span>
            <span className={style.maximizeButton}></span>
            <span className={style.closeButton}></span>
          </div>
        </div>
        <div className={style.windowBody}>
          <div className={style.header}>
            <motion.h1
              className={style.title}
              variants={headerVariants}
            >
              Глава III: <br />
              <TypewriterText text="От Гениев к Смерти" speed={50} />
            </motion.h1>
            <motion.blockquote
              className={style.blockquote}
              variants={quoteVariants}
            >
              «Главное — не потерять душу по пути к цели.» <br /> —
              Карл Густав Юнг
            </motion.blockquote>
          </div>
          <main className={style.main}>
            <div className={style.textContainer}>
              {words.map((word, index) => (
                <Word
                  key={index}
                  word={word}
                  index={index}
                  containerRef={containerRef}
                />
              ))}
            </div>

            <div className={style.listContainer}>
              <div className={style.listHeader}>Burnout Symptoms</div>
              <div className={style.listBody}>
                <div className={style.textContainer}>
                  {words2.map((word, index) => (
                    <Word
                      key={index}
                      word={word}
                      index={index}
                      containerRef={containerRef}
                    />
                  ))}
                </div>
                <ul className={style.burnoutList}>
                  <li>Плохая коммуникация</li>
                  <li>Недостаток обратной связи</li>
                  <li>Отсутствие фокуса</li>
                  <li>
                    Постоянная спешка без стратегического взгляда
                  </li>
                  <li>
                    Иллюзия продуктивности, маскирующая внутреннюю
                    пустоту
                  </li>
                </ul>
              </div>
            </div>

            <div className={style.listContainer}>
              <div className={style.listHeader}>How to Survive?</div>
              <div className={style.listBody}>
                <h3 className={style.subTitle}>
                  Как не умереть по дороге?
                </h3>
                <ul className={style.survivalList}>
                  <li>
                    <b>Перезапуск.</b> Даже самые крутые команды
                    выгорают. Но те, кто умеют остановиться и
                    осмыслить, — выживают.
                  </li>
                  <li>
                    <b>Минимализм в задачах.</b> Убери всё лишнее. У
                    простоты всегда больше смысла, чем у
                    перегруженности.
                  </li>
                  <li>
                    <b>Люди важнее процессов.</b> Без здоровой команды
                    никакая архитектура не спасёт.
                  </li>
                  <li>
                    <b>Фокус.</b> Продукт не может делать всё. Команда
                    не может делать всё. Оставьте только главное.
                  </li>
                  <li>
                    <b>Смысл.</b> Регулярно возвращайся к вопросу:
                    зачем мы это делаем?
                  </li>
                </ul>
              </div>
            </div>

            <div className={style.textContainer}>
              {words3.map((word, index) => (
                <Word
                  key={index}
                  word={word}
                  index={index}
                  containerRef={containerRef}
                />
              ))}
            </div>

            <motion.div
              className={style.videoContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={videoVariants}
            >
              <div className={style.videoHeader}>Video Player</div>
              <div className={style.videoBody}>
                <iframe
                  width="100%"
                  height="500"
                  src="https://www.youtube.com/embed/r9SMEr9G2y4?si=_puzmBh-kj3r-445"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className={style.videoIframe}
                ></iframe>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default FourSection;
