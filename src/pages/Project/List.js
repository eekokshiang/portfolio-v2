import { ReactComponent as GithubIcon } from '../../assets/svgs/github-icon.svg';
import { ReactComponent as BehanceIcon } from '../../assets/svgs/behance-icon.svg';
import { ReactComponent as WebsiteIcon } from '../../assets/svgs/arrowtopright-icon.svg';
import { ReactComponent as FigmaIcon } from '../../assets/svgs/figma-small-icon.svg';

import projectOneImg from '../../assets/pngs/project1-img.png';
import projectOneTwo from '../../assets/pngs/project2-img.png';
import projectOneThree from '../../assets/pngs/project3-img.png';

const rawList = [
  {
    title: 'My Digital Playground',
    desc: 'Current website was crafted with passion—to share my work, highlight my skills, and offer a glimpse into my creative journey. Every piece reflects experience and artistry for what I do.',
    workOn: ['React JS', 'Javascript', 'SCSS', 'GSAP', 'Figma'],
    navigate: [
      {
        icon: <GithubIcon />,
        link: 'https://github.com/eekokshiang/portfolio-v2',
      },
      {
        icon: <FigmaIcon />,
        link: 'https://www.figma.com/design/mb2BOF7hjzLkssj2zYrGJ0/Portfolio?node-id=865-141&t=qGX7FJy27O7fkKt2-4',
      },
    ],
    previewImg: projectOneImg,
  },
  {
    title: 'TorumPay - Crypto Payment App',
    desc: 'Developed a government-authorized website for an app that approved by the Securities Commission Malaysia.',
    workOn: ['React JS', 'Javascript', 'SCSS'],
    navigate: [{ icon: <WebsiteIcon />, link: 'https://pay.torum.com/' }],
    previewImg: projectOneTwo,
  },
  {
    title: 'Torum V2',
    desc: 'A blockchain-based project designed to showcase immersive VR features seamlessly on mobile devices, blending cutting-edge technology with on-the-go accessibility.',
    workOn: ['React JS', 'Javascript', 'SCSS', 'Figma'],
    navigate: [{ icon: <WebsiteIcon />, link: 'https://intro.torum.com/' }],
    previewImg: projectOneThree,
  },
];

const List = rawList.map((item, index) => ({
  ...item,
  num: `${(index + 1).toString().padStart(3, '0')}`, // generates '001', '002', etc.
}));

export default List;
