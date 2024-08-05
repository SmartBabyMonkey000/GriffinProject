import React from 'react';
// import { Link } from 'react-router-dom';
import { images } from '../../constants';
import './Footer.css';

const Footer = () => (
  <div className="app__footer section__padding" id="login">

    <div className="footerLogo">
      <img src={images.griffinLogo} alt="Griffin Logo" />
    </div>

    <div className="footerMessage">
      <p>Our vision is to create a Kingdom that will allow every holder to win life-changing giveaways!</p>
    </div>

    <div className="footerNav">
      <ul className="app__navbar-links">
        <li className="p__opensans"><a href="/">Home</a></li>
        <li className="p__opensans"><a href="/mint">Mint</a></li>
        <li className="p__opensans"><a href="/#tiers">Tiers</a></li>
        <li className="p__opensans"><a href="/#winners">Winners</a></li>
        <li className="p__opensans"><a href="/mynft">My NFT</a></li>
        <li className="p__opensans"><a href="/#faq">FAQ</a></li>
        <li className="p__opensans"><a href="/disclaimer">Disclaimer</a></li>
      </ul>
    </div>

    <h5 className="fcontactTitle">Contact</h5>
    <div className="footerContact">
      <a className="socialHead" href="http://discord.com" target="_blank" rel="noreferrer"><i className="fab fa-discord" aria-label="Discord" /></a>
      <a className="socialHead" href="http://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-twitter" aria-label="Twitter" /></a>
      <a className="socialHead" href="https://medium.com/@Griffin_Kingdom" target="_blank" rel="noreferrer"><i className="fab fa-medium" aria-label="Medium" /></a>
      <a className="socialHead" href="mailto:support@griffinkingdom.finance" target="_blank" rel="noreferrer"><i className="fa fa-envelope" aria-label="Email Us" /></a>
    </div>

    <div className="footer__copyright">
      <div className="footerPhoenixLogo">
        <p>Powered by</p>
        <a href="https://thephoenix.finance" target="_blank" rel="noreferrer"><img src={images.griffinPhoenixLogo} alt="Phoenix Community Capital" /></a>
      </div>
    </div>

  </div>
);

export default Footer;
