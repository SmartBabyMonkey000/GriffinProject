import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus app__bg flex__center">

    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about griffinAboutText">

        <p className="p__opensans">Our Kingdom consists of <span className="mintNumb">10,000</span> unique Griffins.</p>

        <p className="p__opensans">With weekly <span className="phoenixAir">Phoenix Nest AirDrops</span> to Griffin Kingdom NFT members on the Avalanche blockchain.  </p>

        <div className="buttonHolds">
          <a href="/mint" type="button" className="custom__button mintNow">Mint Now</a>
        </div>
      </div>

      <div className="app__aboutus-content_about goldenGriffin" id="about">
        <img src={images.griffinGolden} alt="Golden Griffin" />
      </div>

    </div>
  </div>
);

export default AboutUs;
