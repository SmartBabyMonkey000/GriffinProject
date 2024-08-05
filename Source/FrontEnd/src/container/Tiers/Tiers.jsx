import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Tiers.css';

const Tiers = () => {
  const store = useSelector((state) => state);
  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    window.addEventListener('load', (event) => {
      // eslint-disable-next-line no-undef
      new Glide('.glide', {
        gap: 50,
        // eslint-disable-next-line no-undef
        // focusAt: 1,
        peek: 200,
        perView: 3,
        type: 'carousel',
        breakpoints: {
          1600: {
            perView: 2,
          },
          1100: {
            perView: 1,
            peek: 80,
          },
        },
      }).mount();
    });
  }, []);

  return (
    <div className="tiers" id="tiers">
      <h2 className="sectionTitle">Tiers</h2>

      <div className="draftWinners">Total Reward Amount from Nests for draw winners: 200 AVAX</div>
      <div className="nextTier">Total Reward Amount from Nests for next tier: 100 AVAX</div>

      <div className="glide">
        <div className="glide__track" data-glide-el="track">
          <div className="glide__slides">
            <div className="glide__slide tierBox">
              <h4>Tier One</h4>
              <span className="tierTitle">Description:</span>
              <p className="tierInfo">Active when 20% of NFTs have sold.</p>

              <span className="tierTitle">Cost per NFT:</span>
              <p className="tierInfo">2 AVAX</p>

              <span className="tierTitle">AirDrop Amount:</span>
              <p className="tierInfo">5 Nests/Week up to 260 Nests</p>

              <span className="tierTitle">Nests Awarded:</span>
              <p className="tierInfo">To be determined</p>
            </div>

            <div className={store && store.tierCount >= 2 ? 'glide__slide tierBox' : 'glide_slide tierBox hiddenBox'}>
              <h4>Tier Two</h4>
              <span className="tierTitle">Description:</span>
              <p className="tierInfo">Active when 40% of NFTs have sold.</p>

              <span className="tierTitle">Cost per NFT:</span>
              <p className="tierInfo">3 AVAX</p>

              <span className="tierTitle">AirDrop Amount:</span>
              <p className="tierInfo">10 Nests/Week up to 520 Nests</p>

              <span className="tierTitle">Nests Awarded:</span>
              <p className="tierInfo">To be determined</p>
            </div>

            <div className={store && store.tierCount >= 3 ? 'glide__slide tierBox' : 'glide_slide tierBox hiddenBox'}>
              <h4>Tier Three</h4>
              <span className="tierTitle">Description:</span>
              <p className="tierInfo">Active when 60% of NFTs have sold.</p>

              <span className="tierTitle">Cost per NFT:</span>
              <p className="tierInfo">3.5 AVAX</p>

              <span className="tierTitle">AirDrop Amount:</span>
              <p className="tierInfo">15 Nests/Week up to 780 Nests</p>

              <span className="tierTitle">Nests Awarded:</span>
              <p className="tierInfo">To be determined</p>
            </div>

            <div className={store && store.tierCount >= 4 ? 'glide__slide tierBox' : 'glide_slide tierBox hiddenBox'}>
              <h4>Tier Four</h4>
              <span className="tierTitle">Description:</span>
              <p className="tierInfo">Active when 80% of NFTs have sold.</p>

              <span className="tierTitle">Cost per NFT:</span>
              <p className="tierInfo">4 AVAX</p>

              <span className="tierTitle">AirDrop Amount:</span>
              <p className="tierInfo">20 Nests/Week up to 1040 Nests</p>

              <span className="tierTitle">Nests Awarded:</span>
              <p className="tierInfo">To be determined</p>
            </div>

            <div className={store && store.tierCount >= 5 ? 'glide__slide tierBox' : 'glide_slide tierBox hiddenBox'}>
              <h4>Tier Five</h4>
              <span className="tierTitle">Description:</span>
              <p className="tierInfo">Active when 100% of NFTs have sold.</p>

              <span className="tierTitle">Cost per NFT:</span>
              <p className="tierInfo">4.5 AVAX</p>

              <span className="tierTitle">AirDrop Amount:</span>
              <p className="tierInfo">25 Nests/Week up to 1300 Nests</p>

              <span className="tierTitle">Nests Awarded:</span>
              <p className="tierInfo">To be determined</p>
            </div>
          </div>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button type="button" className="glide__arrow glide__arrow--left" data-glide-dir="<">prev</button>
          <button type="button" className="glide__arrow glide__arrow--right" data-glide-dir=">">next</button>
        </div>
      </div>
      <div className="winnersSelect">
        <a href="/mint" className="custom__button mintNow">Mint Now</a>
      </div>
    </div>
  );
};
export default Tiers;
