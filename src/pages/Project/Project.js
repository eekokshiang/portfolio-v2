import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

import useWindowSize from '../../hooks/useWindowResize';

import Button from '../../components/Button/Button';

import { ReactComponent as ButtonUp } from '../../assets/svgs/arrowup-icon.svg';
import { ReactComponent as ButtonDown } from '../../assets/svgs/arrowdown-icon.svg';

import List from './List';
import './Project.scss';

function Project() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const contentRef = useRef();
  const { width } = useWindowSize();

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [selectedIndex]); //Triggers on index change

  const handleNext = () => {
    if (selectedIndex < List.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handleBack = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  const disableNext = selectedIndex === 0 ? 'disable' : '';
  const disableBack = selectedIndex === List.length - 1 ? 'disable' : '';

  const current = List[selectedIndex];

  return (
    <div className="project">
      <div ref={contentRef} className="project-content">
        <div className="project-content-left">
          {width > 768 ? <p className="project-num">{current.num}</p> : ''}
          <div className="content-wrapper">
            <h2 className="project-title">{current.title}</h2>
            <p className="project-desc">{current.desc}</p>
            <div className="project-tech-wrapper">
              {current.workOn.map((tech, i) => (
                <div key={i} className="project-tech">
                  {tech}
                </div>
              ))}
            </div>
          </div>

          <div className="project-link-wrapper">
            {current.navigate.map((button, index) => (
              <Button
                key={index}
                onClick={() => window.open(button.link, '_blank')}
                rel="noopener noreferrer"
                className="project-link-button"
              >
                {button.icon}
                {button.text}
              </Button>
            ))}
          </div>
        </div>

        <div className="project-content-right">
          {width < 768 ? (
            <div className="project-mobile-header">
              <p>PROJECT</p>
              <p className="project-num">{current.num}</p>
            </div>
          ) : (
            ''
          )}
          <img src={current.previewImg} alt={current.title} />
        </div>
      </div>

      <div className="project-selector">
        <Button
          className={`project-switch-button ${disableNext}`}
          onClick={handleBack}
          disabled={selectedIndex === 0}
        >
          PREV PROJECT
          <ButtonUp />
        </Button>

        <Button
          className={`project-switch-button ${disableBack}`}
          onClick={handleNext}
          disabled={selectedIndex === List.length - 1}
        >
          NEXT PROJECT <ButtonDown />
        </Button>
      </div>
    </div>
  );
}

export default Project;
