import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button/Button';
import ScrambleText from '../../components/ScrambleText/ScrambleText';

import List from '../Project/List';
import { skillIcons } from '../Resume/Sections/Section2/Skills';

import { ReactComponent as EeLogo } from '../../assets/svgs/ee-logo.svg';
import { ReactComponent as GithubIcon } from '../../assets/svgs/github-icon.svg';
import { ReactComponent as LinkedInIcon } from '../../assets/svgs/linkedin-icon.svg';
import homeCharacter from '../../assets/pngs/home-character.png';

import './Home.scss';

function Home() {
  const currentYear = new Date().getFullYear();
  const stats = [
    { num: currentYear - 2020 - 1, text: 'YEARS OF EXPERIENCES' },
    { num: List.length, text: 'PROJECTS COMPLETED' },
    { num: skillIcons.length, text: 'SKILLS LEARNED' },
  ];
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="home-wrapper">
        {/* Page Header */}
        <div className="header">
          <EeLogo className="header-logo" />
          <div className="interact-section">
            <Button
              className="button--icon"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/ee-kok-shiang-44a292223/',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              <GithubIcon />
            </Button>
            <Button
              className="button--icon"
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/ee-kok-shiang-44a292223/',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              <LinkedInIcon />
            </Button>

            <Button
              className="button"
              onClick={() =>
                window.open(
                  '/files/eekokshiang-resume.pdf',
                  '_blank',
                  'noopener,noreferrer'
                )
              }
            >
              VIEW CV
            </Button>
            <div className="border-right" />
            <Button className="button" onClick={() => navigate('/contact')}>
              HIRE ME
            </Button>
          </div>
        </div>

        {/* {Page Content} */}
        <div className="content">
          <img src={homeCharacter} alt="character-img" className="character" />
          <div className="content-left">
            <div className="home-myname">
              <ScrambleText>I'M EE</ScrambleText>
            </div>
            <p className="home-desc">
              <ScrambleText speed="10">
                I believe great interfaces don’t just function — they feel
                right.
              </ScrambleText>
            </p>
          </div>

          <div className="content-right">
            <ScrambleText speed="100">✦ UI/UX DESIGNER</ScrambleText>
            <ScrambleText speed="100">✦ FRONT-END DEVELOPER</ScrambleText>
            <ScrambleText speed="100">✦ GRAPHIC DESIGNER</ScrambleText>
          </div>
        </div>

        {/* {Page Statistic} */}
        <div className="statistic">
          {stats.map((stat, index) => (
            <div className="stat-box" key={index}>
              <p className="stat-num">
                <ScrambleText speed="100">{stat.num}</ScrambleText>
              </p>

              <p className="stat-text">
                <ScrambleText speed="50">{stat.text}</ScrambleText>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
