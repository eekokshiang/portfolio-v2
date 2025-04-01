import React from 'react';

import { ReactComponent as Html5Icon } from '../../../../assets/svgs/html5-icon.svg';
import { ReactComponent as SassIcon } from '../../../../assets/svgs/sass-icon.svg';
import { ReactComponent as JavascriptIcon } from '../../../../assets/svgs/javascript-icon.svg';
import { ReactComponent as ReactJsIcon } from '../../../../assets/svgs/reactjs-icon.svg';
import { ReactComponent as FigmaIcon } from '../../../../assets/svgs/figma-icon.svg';
import { ReactComponent as XdIcon } from '../../../../assets/svgs/xd-icon.svg';
import { ReactComponent as PsIcon } from '../../../../assets/svgs/ps-icon.svg';
import { ReactComponent as AiIcon } from '../../../../assets/svgs/ai-icon.svg';
import { ReactComponent as DrawIcon } from '../../../../assets/svgs/draw-icon.svg';

import './Skills.scss';

export const skillIcons = [
  { icon: <Html5Icon />, title: 'HTML 5' },
  { icon: <SassIcon />, title: 'SASS/SCSS' },
  { icon: <JavascriptIcon />, title: 'Javascript' },
  { icon: <ReactJsIcon />, title: 'React JS' },
  { icon: <FigmaIcon />, title: 'Figma' },
  { icon: <XdIcon />, title: 'Adobe XD' },
  { icon: <PsIcon />, title: 'Photoshop' },
  { icon: <AiIcon />, title: 'Illustrator' },
  { icon: <DrawIcon />, title: 'Illustration' },
];

function Skills() {
  return (
    <div className="skills-container">
      {skillIcons.map((data, index) => (
        <div key={index} className="box">
          {data.icon}
          <div className="title">{data.title}</div>
        </div>
      ))}
    </div>
  );
}

export default Skills;
