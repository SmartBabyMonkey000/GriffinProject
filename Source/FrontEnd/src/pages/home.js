import React from 'react';

import {
  AboutUs,
  Footer,
  GriffinInfo,
  Tiers,
  Winners,
  Faq,
  Header,
} from '../container';
import { Navbar } from '../components';

const HomePage = () => (
  <div>
    <Navbar />
    <Header />
    <AboutUs />
    <GriffinInfo />
    <Tiers />
    <Winners />
    <Faq />
    <Footer />
  </div>
);

export default HomePage;
