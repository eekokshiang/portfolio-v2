import React, { useEffect, useState, useRef } from 'react';

import './ScrambleText.scss';

const letters = '01';

const ScrambleText = ({ children, speed = 100, duration = 5000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [intervalId, setIntervalId] = useState(null);
  const [minHeight, setMinHeight] = useState(null);

  const hiddenRef = useRef(null);

  useEffect(() => {
    // Set the height based on the final text
    if (hiddenRef.current) {
      setMinHeight(hiddenRef.current.offsetHeight);
    }
  }, [children]);

  useEffect(() => {
    let iteration = 0;
    let originalText = children.toString();
    let scrambled = '';

    const totalIterations = Math.ceil(duration / speed);

    const scramble = setInterval(() => {
      scrambled = originalText
        .split('')
        .map((char, index) => {
          if (index < iteration) return originalText[index];
          return letters[Math.floor(Math.random() * letters.length)];
        })
        .join('');

      setDisplayText(scrambled);

      iteration += 1;

      if (iteration > originalText.length) {
        clearInterval(scramble);
        setDisplayText(originalText);
      }
    }, speed);

    setIntervalId(scramble);

    return () => clearInterval(intervalId);
  }, [children]);

  return (
    <>
      {/* Actual animated text */}
      <p
        className="scramble-text"
        style={{ minHeight: minHeight ? `${minHeight}px` : 'auto' }}
      >
        {displayText}
      </p>

      {/* Hidden ghost to reserve space */}
      <p className="scramble-text-measure" ref={hiddenRef} aria-hidden="true">
        {children}
      </p>
    </>
  );
};

export default ScrambleText;
