import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import AppLayout from './components/AppLayout/AppLayout';

import './App.scss';

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
