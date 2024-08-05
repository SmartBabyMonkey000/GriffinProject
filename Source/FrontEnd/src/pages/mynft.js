import React, { useEffect, useState } from 'react';
import { images } from '../constants';
import { Navbar } from '../components';
import { Footer } from '../container';
import axios from 'axios';
import './mynft.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Otherpage() {
  const store = useSelector(state => state);
  const dispatch = useDispatch();
  const [nfts, setNfts] = useState([]);
  const [imgUrls, setImgUrls] = useState({});
  const [view, setView] = useState(false);
  const viewMore = () => {
    setView(true);
  };

  useEffect(async () => {
    if (store && store.myNfts) {
      var nfts = [];
      for (var i = 0; i < store.myNfts.length; i++) {
        var result;
        try {
          result = await axios.get(`${store.nftBaseUrl}/${store.myNfts[i].tokenId}.json`);
          nfts.push({ ...store.myNfts[i], image: result.data.image });
        } catch (e) {
          nfts.push({...store.myNfts[i]});
        }
      }
      setNfts(nfts);
    }
  }, [store]);



  const payFee = (tokenId, sync_index) => {
    dispatch({ type: 'PAY_GRIFFIN_FEE', payload: { tokenId: tokenId, sync_index: sync_index } });
  };

  const getImgUrl = async (tokenId) => {
    var result = await axios.get(`${store.nftBaseUrl}/${tokenId}.json`);
    var metadata = result.data;
    // console.log(metadata);
    // return metadata['image'];
  }

  const nftItem = (item, index) => {
    console.log("nft itme:", item);
    return (
      <div key={index} className="winnerHolder">
        <div className="imageWinner">
          {/* <img src={images.griffinSample} alt="Griffin NFT" /> */}
          <img src={item.image} alt="Griffin NFT" />
          <a href="/" className="seeAttrb">Attributes</a>
        </div>
        <div className="winInfo">
          <span className="winnerNum">#{item.tokenId}</span>
          <span className={item.remainCount == 0 ? 'nftStatus inactive' : 'nftStatus active'}>
            {
              item.remainCount == 0 ? 'Inactive' : 'Active'
            }
          </span>
          <span className="winHis">Winning History: {item.winnings}</span>
          <span className="winHis">Fees: due in {item.remainCount * 7} days</span>
          {/* <a href="/#"> */}
          <span className="payFees" onClick={() => { payFee(item.tokenId, item.sync_index) }}>Pay Fees</span>
          {/* </a> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="myNFTPage" id="mint">
        <div className="myNFTHolder">
          <div className="mynfts">
            <h1>My NFTs</h1>
            <div className="winnersContainer">
              {
                nfts && nfts.map((item, index) => {
                  if (!view) {
                    if (index < 6) {
                      return nftItem(item, index);
                    }
                  } else {
                    return nftItem(item, index);
                  }
                })
              }
            </div>
            <div className="winnersSelect">
              {
                !view ?
                  <button type="button" className="custom__button mintNow" onClick={() => { viewMore() }}>View All Winners</button> : ''
              }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
