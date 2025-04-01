import React from 'react';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import useWindowSize from '../../hooks/useWindowResize';

import Experiences from './Sections/Section1/Experiences';
import Skills from './Sections/Section2/Skills';
import About from './Sections/Section3/About';
import Blockchain from './Sections/Section4/Blockchain';

import { ReactComponent as DropDownIcon } from '../../assets/svgs/dropdown-icon.svg';

import './Resume.scss';

const section = [
  { id: 1, label: 'Experiences', content: <Experiences /> },
  { id: 2, label: 'Skills', content: <Skills /> },
  { id: 3, label: 'About', content: <About /> },
  { id: 4, label: 'Blockchain', content: <Blockchain /> },
];

function Resume() {
  const [selectedId, setSelectedId] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const contentWrapperRef = useRef();
  const { width } = useWindowSize();

  const handleDropDown = () => {
    if (dropDown) {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  useEffect(() => {
    // Animate in on first load
    gsap.fromTo(
      contentWrapperRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      }
    );
  }, []);

  const handleClick = (id) => {
    if (id === selectedId || isAnimating) return;

    setDropDown(false);

    setIsAnimating(true);

    // Animate OUT
    gsap.to(contentWrapperRef.current, {
      ...(width > 480 ? { x: -50 } : { y: -20 }), // 🧠 conditionally animate
      opacity: 0,
      duration: 0.2,
      ease: 'power2.inOut',

      onComplete: () => {
        setSelectedId(id); // switch content

        requestAnimationFrame(() => {
          // Animate in
          gsap.fromTo(
            contentWrapperRef.current,
            {
              ...(width > 480 ? { x: 50 } : { y: 20 }), // enter from x or y
              opacity: 0,
            },
            {
              x: 0,
              y: 0, // always reset both just in case
              opacity: 1,
              duration: 0.2,
              ease: 'power2.inOut',
              onComplete: () => setIsAnimating(false),
            }
          );
        });
      },
    });
  };

  return (
    <div className="resume">
      {width > 480 ? (
        <div className="section-selector-container">
          {section.map((section, index) => (
            <div
              key={section.id}
              onClick={() => handleClick(index)}
              className={`section-selector ${
                selectedId === index ? 'active' : ''
              }`}
            >
              {section.label}
            </div>
          ))}
        </div>
      ) : (
        <div className="section-selector-container mobile">
          {section[selectedId] && (
            <div
              key={section[selectedId].id}
              onClick={() => handleDropDown()}
              className={`section-selector-mobile ${
                section[selectedId] ? 'active-mobile' : ''
              }`}
            >
              {section[selectedId].label}
              <DropDownIcon
                className={dropDown === true ? 'rotate' : 'default'}
              />
            </div>
          )}

          {dropDown && (
            <div
              className="dropdown-container"
              onClick={(e) => {
                if (!e.target.classList.contains('dropdown-menu')) {
                  setDropDown(false);
                }
              }}
            >
              {section
                .map((item, index) => ({ item, index })) // preserve original index
                .filter(({ index }) => index !== selectedId)
                .map(({ item, index }) => (
                  <div
                    key={item.id}
                    onClick={() => handleClick(index)} // now using original index
                    className="dropdown-menu"
                  >
                    {item.label}
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      <div
        key={section[selectedId].id}
        ref={contentWrapperRef}
        className="section-page"
      >
        {section[selectedId].content}
      </div>
    </div>
  );
}

export default Resume;
