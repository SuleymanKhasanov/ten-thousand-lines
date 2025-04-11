// src/features/terminal-scene/ui/FifthSection.tsx
import { motion, useInView } from 'framer-motion';
import TypewriterText from '@/shared/ui/TextAnimations/TypewriterText/TypewriterText';
import style from './FiveSection.module.css';
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
      {word}{' '}
    </motion.span>
  );
};

const FifthSection = ({
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
      setCurrentTrackIndex(3); // Устанавливаем трек для FifthSection (например, четвёртый трек)
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [isInView, setCurrentTrackIndex, isPlaying, setIsPlaying]);

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

  const immortalityText =
    'Каждый написанный тобой файл — это не просто набор символов. Это отпечаток твоего мышления, твоей философии, твоих решений в моменте. Это маленькая капсула времени. Через год ты сам сможешь понять, кем ты был тогда, читая этот код. А другие — поймут, как ты думал, что считал важным, чему придавал смысл.';
  const words = immortalityText.split(' ');

  const text2 =
    'Каждый написанный тобой файл — это не просто набор символов. Это отпечаток твоего мышления, твоей философии, твоих решений в моменте. Это маленькая капсула времени. Через год ты сам сможешь понять, кем ты был тогда, читая этот код. А другие — поймут, как ты думал, что считал важным, чему придавал смысл.';
  const words2 = text2.split(' ');

  const text3 =
    'Ты можешь писать код просто чтобы он работал. А можешь писать — чтобы он жил. Чтобы он давал силу другим. Чтобы после тебя осталось что-то хорошее.';
  const words3 = text3.split(' ');

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
            Chapter IV - Immortality
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
              Глава IV: <br />
              <TypewriterText text="Бессмертие" speed={50} />
            </motion.h1>
            <motion.blockquote
              className={style.blockquote}
              variants={quoteVariants}
            >
              «Гении не падают с неба. Они — результат долгой цепи
              усилий.» <br /> — Фридрих Энгельс
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

            <div className={style.textContainer}>
              {words2.map((word, index) => (
                <Word
                  key={index}
                  word={word}
                  index={index}
                  containerRef={containerRef}
                />
              ))}
              <ul className={style.examplesList}>
                <li>Ядро Linux от Линуса Торвальдса.</li>
                <li>Git от того же Торвальдса.</li>
                <li>React от Джордана Уолке.</li>
                <li>UNIX, TCP/IP, Python…</li>
              </ul>
              <span>
                Они оставили не просто код — они оставили ценности.
                Принципы. Философию создания. Именно она делает
                продукт живым.
              </span>
            </div>

            <div className={style.listContainer}>
              <div className={style.listHeader}>
                Principles of Development
              </div>
              <div className={style.listBody}>
                <h3 className={style.subTitle}>
                  Зачем нам принципы разработки?
                </h3>
                <span>
                  Принципы — это то, что делает продукт сильным и
                  долговечным. Они не про конкретные технологии. Они
                  про то, как мы думаем. Как принимаем решения. Как
                  строим то, что будет жить после нас.
                </span>
                <h3 className={style.subTitle}>
                  Вот почему нам нужны принципы:
                </h3>
                <ul className={style.principlesList}>
                  <li>
                    <h4 className={style.principleTitle}>
                      Принцип смысла
                    </h4>
                    <span>
                      Если ты не понимаешь, зачем фича, зачем
                      компонент, зачем вообще продукт — значит, он уже
                      умирает. Продукт с сильной идеей живёт дольше.
                      Вдохновляет. Привлекает.
                    </span>
                  </li>
                  <li>
                    <h4 className={style.principleTitle}>
                      Принцип простоты
                    </h4>
                    <span>
                      Сложность убивает. Долговечный код — это тот,
                      что понятен даже спустя годы. Простой код =
                      живой код.
                    </span>
                  </li>
                  <li>
                    <h4 className={style.principleTitle}>
                      Принцип переиспользуемости
                    </h4>
                    <span>
                      Создавай так, чтобы можно было передавать,
                      делиться, вдохновлять других. Любой компонент
                      может стать open-source библиотекой. Любая идея
                      — стать статьёй, паттерном или best practice.
                    </span>
                  </li>
                  <li>
                    <h4 className={style.principleTitle}>
                      Принцип минимального ядра
                    </h4>
                    <span>
                      Всё остальное — модули. Плагины. Расширения. Но
                      в центре — простая, понятная архитектура. Без
                      перегруза. Без костылей. Она должна пережить
                      время.
                    </span>
                  </li>
                  <li>
                    <h4 className={style.principleTitle}>
                      Принцип передачи огня
                    </h4>
                    <span>
                      Учи. Пиши документацию. Веди примеры. Создавай
                      культуру, которая будет жить, даже если ты
                      уйдёшь. Это и есть бессмертие продукта — не в
                      технологиях, а в переданном духе.
                    </span>
                  </li>
                </ul>
              </div>
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
                  src="https://www.youtube.com/embed/8aCQgX31os8?si=PgMUZQWLVAJwxHJ3"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  className={style.videoIframe}
                ></iframe>
              </div>
            </motion.div>

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
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default FifthSection;
