import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import NAVIGATION_PATHS from '../../constants/navigation';

import './HorizontalPage.scss';

const HorizontalScroll = () => {
  const ref = useRef(null);
  const isScrolling = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Desktop Scroll
  useEffect(() => {
    const handleWheel = (event) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      let currentIndex = NAVIGATION_PATHS.findIndex(
        (page) => page.path === location.pathname
      );
      let newIndex = currentIndex;

      if (event.deltaY > 0 && currentIndex < NAVIGATION_PATHS.length - 1) {
        newIndex += 1;
      } else if (event.deltaY < 0 && currentIndex > 0) {
        newIndex -= 1;
      }

      if (newIndex !== currentIndex) {
        navigate(NAVIGATION_PATHS[newIndex].path);
        gsap.to(ref.current, {
          x: `-${newIndex * 100}vw`,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setTimeout(() => {
              isScrolling.current = false;
            }, 100);
          },
        });
      } else {
        isScrolling.current = false;
      }
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [location, navigate]);

  // Mobile Touch
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 60;

    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX; // initialize both to avoid accidental tiny delta
    };

    const handleTouchMove = (event) => {
      touchEndX = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (isScrolling.current) return;

      const deltaX = touchEndX - touchStartX;
      const absDeltaX = Math.abs(deltaX);

      if (absDeltaX < swipeThreshold) return; // 👈 Ignore tiny gestures / taps

      isScrolling.current = true;

      let currentIndex = NAVIGATION_PATHS.findIndex(
        (page) => page.path === location.pathname
      );
      let newIndex = currentIndex;

      if (deltaX < 0 && currentIndex < NAVIGATION_PATHS.length - 1) {
        newIndex += 1;
      } else if (deltaX > 0 && currentIndex > 0) {
        newIndex -= 1;
      }

      if (newIndex !== currentIndex) {
        navigate(NAVIGATION_PATHS[newIndex].path);
        gsap.to(ref.current, {
          x: `-${newIndex * 100}vw`,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            setTimeout(() => {
              isScrolling.current = false;
            }, 200);
          },
        });
      } else {
        isScrolling.current = false;
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [location, navigate]);

  // Sync on manual URL change
  useEffect(() => {
    const currentIndex = NAVIGATION_PATHS.findIndex(
      (page) => page.path === location.pathname
    );

    if (ref.current) {
      gsap.to(ref.current, {
        x: `-${currentIndex * 100}vw`,
        duration: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [location]);

  return (
    <div
      ref={ref}
      className="horizontal-scroll-container"
      style={{ width: `${NAVIGATION_PATHS.length * 100}vw` }}
    >
      {NAVIGATION_PATHS.map(({ component: PageContent, path }) => (
        <div key={path} className="section">
          <PageContent />
        </div>
      ))}
    </div>
  );
};

export default HorizontalScroll;
