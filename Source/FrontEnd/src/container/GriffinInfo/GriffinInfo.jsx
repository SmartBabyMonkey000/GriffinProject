import React from 'react';

import { images } from '../../constants';
import './GriffinInfo.css';

const GriffinInfo = () => (
  <div className="app__aboutus griffinInfo flex__center" id="griffinInfo">
    <h2 className="sectionTitle">About</h2>
    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <p className="p__opensans">The Griffin Kingdom is a collection of 10,000 unique Griffin NFTs. Our vision is to create a Kingdom that will allow every holder the opportunity to win at least one life-changing giveaway! We believe that everyone should have the chance at passive income to live a better and more fulfilling life.</p>
        <p className="p__opensans">The AirDrops are made possible by PCC allocating 1300 Nests for the Griffin Kingdom. The project will operate on a tiered structure in which the number of AirDrops will increase as more NFTs sell. The AirDrops will start at Tier one when twenty percent of the NFTs have sold, allowing the members of Griffin Kingdom the ability to obtain a Fire Nest even when no one else can!</p>
        <p className="p__opensans">Yes, you read that right!!! Owning a Griffin Kingdom NFT will eventually be the ONLY way to obtain a newly created Fire Nest!!</p>

      </div>

      <div className="app__aboutus-content_about griffinNfts">
        <img src={images.griffinNFTS} alt="Griffin NFTs" />
        <a href="https://medium.com/@Griffin_Kingdom/whitepaper-and-roadmap-c78e07f37707" className="custom__button mintNow">See Our Whitepaper</a>
      </div>

    </div>
  </div>
);

export default GriffinInfo;
