import React from 'react';

import { ReactComponent as SquareDot } from '../../../../assets/svgs/square-dot.svg';

import './Experiences.scss';

function Experiences() {
  const experience = [
    {
      years: '2021 - 2024',
      duration: '// 3 YEARS',
      position: ['UI/UX Designer', 'Front-End Dev', 'Graphic Designer'],
      company: 'Torum Technology',
      companyType: 'STARTUP',
    },
    {
      years: '2020 - 2021',
      duration: '// 1 YEAR',
      position: ['Signage Designer', 'Graphic Designer'],
      company: 'MIINT DESIGN',
      companyType: 'Advertising COMPANY',
    },
  ];

  return (
    <div className="experience">
      <p className="desc">
        I originally started my career as a graphic designer. Over time, I
        transitioned into an IT company as a designer, where I expanded my
        knowledge into UI/UX, programming, finance, and blockchain. Throughout
        the years, I have continuously learned and evolved in these fields,
        broadening my expertise beyond design.
      </p>

      <div className="experience-container">
        {experience.map((data, index) => {
          return (
            <div key={index} className="experience-content">
              <div className="years">
                {data.years}
                <p className="second"> {data.duration}</p>
              </div>

              <div className="position">
                {data.position.map((role, i) => (
                  <React.Fragment key={i}>
                    <p>{role}</p>
                    {i !== data.position.length - 1 && <SquareDot />}
                  </React.Fragment>
                ))}
              </div>

              <div className="company">
                <div className="company-box"> {data.company} </div>
                <p className="company-box second">{data.companyType}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Experiences;
