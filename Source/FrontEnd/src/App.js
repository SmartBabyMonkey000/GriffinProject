import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import Mint from './pages/mint';
import Disclaimer from './pages/disclaimer';
import MyNFT from './pages/mynft';

/**
 *
 * page changes router
 * add Route, element react router and pass the props
 * path as page route and element (will co  mponent need to render)
 */

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/mint" element={<Mint />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/mynft" element={<MyNFT />} />
    </Routes>
  </div>
);

export default App;
