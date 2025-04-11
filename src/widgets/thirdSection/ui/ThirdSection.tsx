// src/features/terminal-scene/ui/ThirdSection.tsx
import { motion, useInView } from 'framer-motion';
import TypewriterText from '@/shared/ui/TextAnimations/TypewriterText/TypewriterText';
import style from './ThirdSection.module.css';
import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Pyramid } from '@/entities/pyramid/Pyramid';

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

const ThirdSection = ({
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
      setCurrentTrackIndex(1);
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

  const maslowText =
    'Абрахам Маслоу, выдающийся американский психолог, разработал свою знаменитую пирамиду потребностей, наблюдая за людьми и анализируя их мотивацию. Его исследования начались в 1930-х годах, когда он изучал поведение приматов в Университете Висконсина, а затем переключился на человеческий потенциал. Маслоу вдохновлялся такими личностями, как Альберт Эйнштейн и Элеонора Рузвельт, которых он считал примерами самоактуализации. В 1943 году он опубликовал статью «Теория человеческой мотивации», где впервые представил иерархию потребностей. Он утверждал, что базовые нужды — еда, безопасность, любовь — должны быть удовлетворены, прежде чем человек сможет стремиться к высшим целям, таким как творчество и самореализация.';
  const maslowWords = maslowText.split(' ');

  const text =
    'Почему одни становятся сеньорами за три года, а другие — остаются на месте пять? Всё начинается не с знаний. А с внутреннего состояния. Есть те, кто пробиваются сквозь страх, незнание и хаос. Они идут туда, где страшно. Ошибаются. Спрашивают. Терпят. Каждый их шаг — это битва: с ленью, неуверенностью, чужими ожиданиями. А есть другие. Те, кто застревают. В комфорте. В стабильной, но скучной задаче. В привычной технологии, которую они боятся сменить. В мыслях «я не готов», «я не такой умный», «ещё не время». Почему так происходит? Ответ — глубже, чем кажется. У каждого из нас — свои внутренние потребности. И пока базовые из них не закрыты, о развитии и росте не может быть и речи.';
  const words = text.split(' ');

  const text2 =
    'Как это работает в контексте карьерного роста? Например, человек, который не может обеспечить себе финансовую стабильность (потребность в безопасности), вряд ли будет готов рисковать на работе или пробовать новые проекты, которые могут быть нестабильными или требовать усилий, выходящих за рамки привычного. На другом конце спектра находится тот, кто уже удовлетворил свои основные потребности и имеет возможность сосредоточиться на более высоких целях: раскрытии своего потенциала, творчестве, лидерстве. Таким образом, внешняя среда и внутренние потребности напрямую влияют на способность человека двигаться впёрёд. Тот, кто нашел баланс и может удовлетворять свои базовые потребности, готов брать на себя риски, меняться и меняться быстро. В то время как тот, кто застрял в поиске стабильности и не решает проблемы на базовом уровне, будет ощущать себя замкнутым.';
  const words2 = text2.split(' ');

  const text3 =
    'Гениальность — это не природный дар, а результат постоянных усилий и преодоления внутренних барьеров. Люди, которые добиваются успеха, проходят через постоянные трудности, но делают это с осознанием, что результат будет стоить усилий. Они не просто хотят, чтобы им было хорошо сейчас — они стремятся к самореализации, к созданию чего-то значимого. А вот аутсайдеры часто остаются в своем состоянии, потому что их мотивация недостаточно сильна, чтобы изменить свою ситуацию. Они боятся ошибок, ищут идеальные условия для старта и не готовы выходить из зоны комфорта.';
  const words3 = text3.split(' ');

  return (
    <motion.div
      ref={sectionRef}
      className={style.sectionWrapper}
      variants={headerVariants}
    >
      <div className={style.window}>
        <div className={style.windowHeader}>
          <span className={style.windowTitle}>
            Chapter II - Growth
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
              Глава II: <br />
              <TypewriterText
                text="Рост. Гении и аутсайдеры"
                speed={50}
              />
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

            {/* Секция про Маслоу */}
            <div className={style.maslowContainer}>
              <div className={style.maslowHeader}>
                About Abraham Maslow
              </div>
              <div className={style.maslowBody}>
                <img
                  src="https://i.bigenc.ru/resizer/resize?sign=a_3yJu9EW3cM_qW4W9IJ4Q&filename=vault/e090e98aab26cb9ee887656847c254a4.webp&width=1200"
                  alt="Абрахам Маслоу"
                  className={style.maslowImage}
                />
                <div className={style.textContainer}>
                  {maslowWords.map((word, index) => (
                    <Word
                      key={index}
                      word={word}
                      index={index}
                      containerRef={containerRef}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={style.pyramidContainer}>
              <div className={style.pyramidHeader}>
                Maslow's Pyramid
              </div>
              <div className={style.pyramidBody}>
                <Canvas
                  camera={{ position: [0, 7, 15], fov: 50 }}
                  style={{
                    height: '600px',
                    width: '100%',
                  }}
                >
                  <ambientLight intensity={1.5} />
                  <pointLight
                    position={[10, 10, 10]}
                    intensity={0.8}
                  />
                  <pointLight
                    position={[-10, 10, -10]}
                    intensity={0.8}
                  />
                  <pointLight
                    position={[0, -10, 0]}
                    intensity={0.6}
                  />
                  <directionalLight
                    position={[0, 15, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                  />
                  <Pyramid
                    position={[0, -2, 0]}
                    scale={[1.5, 1.5, 1.5]}
                  />
                  <OrbitControls enableZoom={true} enablePan={true} />
                </Canvas>
              </div>
            </div>

            <div className={style.textContainer}>
              <h3 className={style.subTitle}>
                Влияние на карьерный рост
              </h3>
              {words2.map((word, index) => (
                <Word
                  key={index}
                  word={word}
                  index={index}
                  containerRef={containerRef}
                />
              ))}
            </div>

            <div className={style.textContainer}>
              <h3 className={style.subTitle}>
                Взгляд на гениев и аутсайдеров
              </h3>
              {words3.map((word, index) => (
                <Word
                  key={index}
                  word={word}
                  index={index}
                  containerRef={containerRef}
                />
              ))}
            </div>

            <div className={style.pollContainer}>
              <div className={style.pollHeader}>
                Poll - Share Your Thoughts
              </div>
              <div className={style.pollBody}>
                <iframe
                  src="https://wall.sli.do/event/3UpHmSDnLnegJAcJFAsAbB?section=39dc3d66-f108-490e-abf3-ce98bbfbb7d3"
                  height="600"
                  width="100%"
                  frameBorder="0"
                  allow="clipboard-write"
                  title="Slido"
                  className={style.pollIframe}
                ></iframe>
              </div>
            </div>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default ThirdSection;
