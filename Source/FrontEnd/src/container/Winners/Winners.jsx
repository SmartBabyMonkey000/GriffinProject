/* eslint-disable react/jsx-indent */
import React, { useEffect, useState } from 'react';
import { images } from '../../constants';
import { useSelector } from 'react-redux';
import './Winners.css';
import axios from 'axios';
import moment from 'moment';

const Winners = () => {
  const store = useSelector(state => state);
  const [view, setView] = useState(false);
  const [winners, setWinners] = useState([]);

  const viewMore = () => {
    setView(true);
  }
  const timeDiff = (endTime, starTime) => {
    var diff = endTime - starTime;
    if (diff > 0) {
      var days = Math.floor(diff / 86400);
      var hours = Math.floor((diff - days * 3600 * 24) / 3600);
      var mins = Math.floor((diff - days * 3600 * 24 - hours * 3600) / 60);
      return days + "d " + hours + "h " + mins + "m";
    } else {
      return '';
    }
  };

  useEffect(async () => {
    if (store && store.winners) {
      var winners = [];
      for (var i = 0; i < store.winners.length; i++) {
        try {
          var result = await axios.get(`${store.nftBaseUrl}/${store.winners[i].tokenId}.json`);
          winners.push({ ...store.winners[i], image: result.data.image });
        } catch (e) {
          winners.push({ ...store.winners[i] });
        }
      }
      setWinners(winners);
    }
  }, [store]);

  const nftItem = (item, index) => {
    return (
      <div key={index} className="winnerHolder">
        <div className="imageWinner">
          <img src={item.image} alt="Griffin NFT" /></div>
        <div className="winInfo">
          <span className="winnerNum">#{item.tokenId}</span>
          <span className="winDraw">Draw: 1</span>
          <span className="winDate">Draw date: {moment(store.lastLotteryTime * 1000).format("DD/MM/YYYY")}</span>
          <span className="winHash">Wallet: {item.user.slice(0, 6) + "..." + item.user.slice(38)}</span>
        </div>
      </div>
    );
  }
  return (
    <div className="winners" id="winners">
      <div className="griffinCrown">
        <img src={images.griffinCrown} alt="Griffin Crown" />
      </div>
      <h2 className="sectionTitle">Winners</h2>
      <div className="winnersContainer">
        {
          winners.map((item, index) => {
            if (!view) {
              if (index < 6) {
                return nftItem(item, index);
              } else {
                return;
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

      <div className="nextLottery">
        {
          store && store.lastLotteryTime != 0 ?
            <span>Next Air Drop: {timeDiff(store.lastLotteryTime * 1 + 3600 * 24 * 7, store.currentTime)}</span> : ""
        }
      </div>
    </div>
  )
};

export default Winners;
