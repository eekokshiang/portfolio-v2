import { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { gsap } from 'gsap';

import NavigationBar from '../NavigationBar/NavigationBar';
import HorizontalScroll from '../HorizontalPage/HorizontalPage';

import bgVideo from '../../assets/videos/5e6c4080-3441-46f4-80a7-65bc995edcaa.mp4';
import bgJpg from '../../assets/jpgs/landing_video_background.jpg';

import './AppLayout.scss';

function AppLayout() {
  const circleRef = useRef(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const setRealVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setRealVh();

    window.addEventListener('resize', setRealVh);
    window.addEventListener('orientationchange', setRealVh);

    return () => {
      window.removeEventListener('resize', setRealVh);
      window.removeEventListener('orientationchange', setRealVh);
    };
  }, []);

  const triggerCirclePulse = () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    gsap.to(circleRef.current, {
      scale: 0.95,
      duration: 0.3,
      ease: 'power2.out',
      filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 1))',
      border: '1px #ffffff solid',
      onComplete: () => {
        gsap.to(circleRef.current, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
          filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0))',
          border: '1px #3f4549 solid',
        });
      },
    });

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, 600);
  };

  const handleWheel = () => {
    triggerCirclePulse();
  };

  return (
    <div className="app-layout" onWheelCapture={handleWheel}>
      <div className="bg-overlay" />
      <div className="circle" ref={circleRef} />
      <video autoPlay loop muted playsInline poster={bgJpg}>
        <source src={bgVideo} type="video/mp4" />
      </video>
      <HorizontalScroll>
        <Outlet />
      </HorizontalScroll>
      <NavigationBar onNavigatePulse={triggerCirclePulse} />
    </div>
  );
}

export default AppLayout;
