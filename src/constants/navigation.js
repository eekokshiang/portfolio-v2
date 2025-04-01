import Home from '../pages/Home/Home';
import Resume from '../pages/Resume/Resume';
import Project from '../pages/Project/Project';
import Contact from '../pages/Contact/Contact';

const NAVIGATION_PATHS = [
  { name: 'home', path: '/', component: Home },
  { name: 'resume', path: '/resume', component: Resume },
  { name: 'project', path: '/project', component: Project },
  { name: 'contact', path: '/contact', component: Contact },
];

export default NAVIGATION_PATHS;
