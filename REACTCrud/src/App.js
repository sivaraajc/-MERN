import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './components/home';

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
