// src/BaseLayout.tsx
import './BaseLayout.css';
import { useState } from 'react';
import { FirstSection } from '@/widgets/firstSection';
import { MainPage } from '@/pages/MainPage';

const BaseLayout = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <FirstSection key="first" onRestart={() => setCurrentSlide(1)} />,
    <MainPage key="main" />,
  ];

  return <main>{slides[currentSlide]}</main>;
};

export default BaseLayout;
