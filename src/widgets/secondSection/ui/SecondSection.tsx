// src/features/terminal-scene/ui/SecondSection.tsx
import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TypewriterText from '@/shared/ui/TextAnimations/TypewriterText/TypewriterText';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import style from './SecondSection.module.css';

// Компонент для анимации отдельного слова
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

const SecondSection = ({
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
      setCurrentTrackIndex(0);
      if (!isPlaying) {
        setIsPlaying(true);
      }
    }
  }, [isInView, setCurrentTrackIndex, isPlaying, setIsPlaying]);

  // Тексты
  const text =
    'Вспомните ту самую первую строку кода, с которой все началось. Может, это был простой Hello, world!, но в тот момент что-то щёлкнуло. Экран ожил, терминал ответил, и вы поняли: что можете создавать. Не просто писать код, а строить свои миры. Вы не просто программировал — вы творили, экспериментировали, учились. И с каждой новой строчкой ты всё больше влюблялся в этот процесс.';
  const words = text.split(' ');

  const text2 =
    'Но этот путь не всегда лёгкий. Многие, кто начинает учиться программированию, сталкиваются с трудностями и сдаются. Исследования показывают, что до 94% тех, кто пробует учиться через онлайн-курсы, бросают это дело, не дойдя до конца. Даже в университетах около 10% студентов, выбравших компьютерные науки, уходят в первый же год, а в целом до трети не завершают программу. И всё же те, кто остаётся, находят нечто большее — страсть, которая меняет всё. Давай посмотрим на эти цифры поближе.';
  const words2 = text2.split(' ');

  const text3 =
    '…Но любовь — это только начало. Настоящее испытание начинается потом. Когда первый восторг проходит. Когда остаются только ты, клавиатура и тысяча строк, в которых легко потерять себя.';
  const words3 = text3.split(' ');

  // Состояние для интерактивного элемента
  const [userCode, setUserCode] = useState('Hello, world!');

  // Данные для графика
  const chartData = [
    { name: 'Онлайн-курсы', dropoutRate: 94 },
    { name: 'Университеты (1-й год)', dropoutRate: 10 },
    { name: 'Университеты (всего)', dropoutRate: 33 },
  ];

  // Состояние для динамической ширины графика
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(600);

  useEffect(() => {
    const updateChartWidth = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        setChartWidth(containerWidth - 40);
      }
    };

    updateChartWidth();
    window.addEventListener('resize', updateChartWidth);
    return () =>
      window.removeEventListener('resize', updateChartWidth);
  }, []);

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
            Chapter I - Love for Code
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
              Глава I: <br />
              <TypewriterText
                text="Влюблённость в код: как всё начиналось?"
                speed={50}
              />
            </motion.h1>
            <motion.blockquote
              className={style.blockquote}
              variants={quoteVariants}
            >
              "Код — это новая форма магии. Мы творим из пустоты."
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

            {/* Интерактивный элемент в стиле старого терминала */}
            <div className={style.interactiveContainer}>
              <div className={style.terminalHeader}>
                C:\CODE\FIRST.EXE
              </div>
              <div className={style.terminalBody}>
                <h3>Какой был твой первый код?</h3>
                <input
                  type="text"
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  placeholder="Напиши свой первый код..."
                  className={style.codeInput}
                />
                <div className={style.terminalOutput}>
                  <pre>&gt; {userCode}</pre>
                </div>
              </div>
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
            </div>

            {/* Статистика с графиком */}
            <div className={style.statsContainer}>
              <div className={style.statsHeader}>Statistics</div>
              <div className={style.statsBody}>
                <h3>Статистика отсева в обучении программированию</h3>
                <div
                  className={style.chartContainer}
                  ref={chartContainerRef}
                >
                  <BarChart
                    width={chartWidth}
                    height={300}
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="2 2"
                      stroke="#666"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#000"
                      fontFamily="MS Sans Serif"
                    />
                    <YAxis
                      label={{
                        value: 'Процент отсева (%)',
                        angle: -90,
                        position: 'insideLeft',
                        fill: '#000',
                        fontFamily: 'MS Sans Serif',
                      }}
                      stroke="#000"
                      fontFamily="MS Sans Serif"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#c0c0c0',
                        border: '1px solid #000',
                        fontFamily: 'MS Sans Serif',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="dropoutRate" fill="#00ff00" />
                  </BarChart>
                </div>
                <p className={style.statsConclusion}>
                  Эти цифры напоминают, что путь программиста — это
                  вызов, но он того стоит. Посмотри, как другие
                  находили вдохновение в этом процессе.
                </p>
              </div>
            </div>

            <div className={style.pollContainer}>
              <div className={style.pollHeader}>
                Poll - Share Your Thoughts
              </div>
              <div className={style.pollBody}>
                <iframe
                  src="https://wall.sli.do/event/ciSCLgr7t3pUzLAVhUy7zH?section=89faf5bb-ebe0-407c-b684-e28162db5ca1"
                  height="600"
                  width="100%"
                  frameBorder="0"
                  allow="clipboard-write"
                  title="Slido"
                  className={style.pollIframe}
                ></iframe>
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
                  src="https://www.youtube.com/embed/Z2qSUZ1o47U?si=nPc2bpEXBnbkmXmo"
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

export default SecondSection;
