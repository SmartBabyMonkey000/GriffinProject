import React, { useEffect, useState } from 'react';
import { images } from '../constants';
import { Navbar } from '../components';
import { Footer } from '../container';
import { useDispatch, useSelector } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import './mint.css';

export default function Otherpage() {
  const [amount, setAmount] = useState(1);
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // useEffect(() => { console.log("store nft count", store) }, [store]);
  const changeAmount = (count) => {
    if (amount + count > 0 && amount + count <= 20) {
      setAmount(amount + count);
    }
  }

  const mintNft = () => {
    dispatch({ type: 'MINT_NFT', payload: { amount: amount } })
  }

  return (
    <div>
      <Navbar />
      <div className="mintPage" id="mint">
        <div className="mintHolder">
          <div className="minting">
            <h1>Mint Is Live</h1>
            <span className="mintCounter">{store && store.totalNft} / 10000</span>
            <p className="mintCost">1 Griffin Costs <span>{store && store.nftPrice} AVAX</span></p>
            <p className="mintMax">Max. 20 Mints Per Transaction</p>

            <div className="mintSelect">
              <button type="button" className="selectSize" onClick={() => { changeAmount(-1) }}>-</button>
              <p className="mintAmount"><span>{amount}</span> Griffin</p>
              <button type="button" className="selectSize" onClick={() => { changeAmount(1) }}>+</button>
            </div>

            <button type="button" className="custom__button mintNow onMint" onClick={() => { mintNft(); }}>Mint Now</button>
          </div>

          <div className="griffinCreature">
            <img src={images.griffinGolden} alt="Golden Griffin" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
