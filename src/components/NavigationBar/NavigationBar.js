import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowResize';
import { gsap } from 'gsap';

import NAVIGATION_PATHS from '../../constants/navigation';
import './NavigationBar.scss';

function NavigationBar({ onNavigatePulse }) {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { width } = useWindowSize();

  const handleNavigation = (path) => {
    const nextIndex = NAVIGATION_PATHS.findIndex((nav) => nav.path === path);
    if (nextIndex === -1) return;

    // Trigger the pulse animation
    if (onNavigatePulse) onNavigatePulse();

    navigateTo(path);

    gsap.to('.horizontal-scroll-container', {
      x: `-${nextIndex * 100}vw`,
      duration: `${width > 480 ? 0.5 : 0.2}`,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      className={`navigation-bar-container ${
        location.pathname === '/resume' && width < 480 ? 'bg-blur' : ''
      }`}
    >
      <p className="hint-to-scroll">
        &laquo; {width > 480 ? 'SCROLL' : 'SWIPE'} TO NAVIGATE &raquo;
      </p>

      <div className="navigation-bar">
        {NAVIGATION_PATHS.map((nav) => (
          <div
            key={nav.path}
            onClick={() => handleNavigation(nav.path)}
            className={`container ${
              location.pathname === nav.path ? 'active' : ''
            }`}
          >
            {nav.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavigationBar;
