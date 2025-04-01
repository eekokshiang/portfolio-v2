import React from 'react';

import './About.scss';

function About() {
  return (
    <div className="about-container">
      <p className="about-name">
        NAME<span className="name-highlight"> ee kok shiang</span>
      </p>
      <div className="about-desc">
        <p>
          I am a multidisciplinary digital designer with a passion for crafting
          bold, intuitive, and engaging visual experiences. With a foundation in
          graphic design and a flair for front-end aesthetics, I bring concepts
          to life across UI/UX, illustration, and web design.
        </p>
        <p>
          Problem-solving is my playground—whether it's fine-tuning a layout,
          elevating user journeys, or building full-scale digital products from
          the ground up. I designed a government-approved website and developed
          the UI/UX for a startup mobile application, proving my ability to
          create with precision, purpose, and impact.
        </p>
        <p>
          Lately, I’ve been leaning into the world of programming—diving into
          front-end development to expand my creative toolkit. While I’m just
          getting started, I’m excited to explore full-stack development in the
          near future, blending design and code to build seamless, standout
          digital experiences.
        </p>
        <p>
          Always evolving, I thrive on creativity, clean design, and a
          relentless learning curve. I don’t just make things look good—I make
          them work beautifully.
        </p>
      </div>
    </div>
  );
}

export default About;
