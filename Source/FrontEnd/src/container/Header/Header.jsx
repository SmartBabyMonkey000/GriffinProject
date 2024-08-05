/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
import React from 'react';

import { images } from '../../constants';
import './Header.css';

window.addEventListener('load', () => {
  // eslint-disable-next-line no-unused-vars
  // eslint-disable-next-line no-undef
  let rellax = new Rellax('.rellax');
});

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <h1 className="app__header-h1"><img src={images.griffinLogo} alt="Griffin Kingdom" /></h1>
      <p className="headerSubheading" style={{ margin: '2rem 0' }}>PHOENIX FUTURES PRESENTS</p>
      <a href="/#about" type="button" className="custom__button arrowDown bounce"><i className="fa fa-arrow-down" aria-label="Arrow Down" /></a>
    </div>
    <div className="firstFly rellax" data-rellax-speed="24"><img src={images.griffinFly2} alt="Griffin flying" /></div>
    <div className="secondFly rellax" data-rellax-speed="10"><img src={images.griffinFly1} alt="Griffin flying" /></div>
    {/* <div className="thirdFly rellax" data-rellax-speed="-4"><img src={images.griffinFly1} alt="Griffin flying" /></div> */}
    <div className="fourthFly rellax" data-rellax-speed="3"><img src={images.griffinFly1} alt="Griffin flying" /></div>
  </div>
);

export default Header;
