import { createStore } from 'redux';
import Web3 from 'web3';
import config from '../config';
import { NotificationManager } from 'react-notifications';
import axios from 'axios';


const web3 = new Web3(Web3.givenProvider);
const gWeb3 = new Web3(config.main.rpc);
const gTWeb3 = new Web3(config.test.rpc);
const router = new gWeb3.eth.Contract(config.joeRouterAbi, config.main.joeRouterAddr);


const griffin = new web3.eth.Contract(config.griffinAbi, config.test.griffinAddr);
const gGriffin = new gTWeb3.eth.Contract(config.griffinAbi, config.test.griffinAddr);
const gNft = new gTWeb3.eth.Contract(config.nftAbi, config.test.nftAddr);

const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_WALLET':
      if (!checkNetwork(state.chainId)) {
        return state;
      }
      web3.eth.getAccounts((err, accounts) => {
        if (!err) {
          store.dispatch({ type: 'RETURN_DATA', payload: { account: accounts[0] } });
          store.dispatch({ type: 'GET_USER_INFO', payload: { account: accounts[0] } });
        }
      });
      break;
    case 'MINT_NFT':
      if (!state.account) {
        connectAlert();
        return state;
      }
      if (!checkNetwork(state.chainId)) {
        return state;
      }
      try {
        griffin.methods.getNFTBundlePriceByUser(state.account, action.payload.amount).call()
          .then((price) => {
            griffin.methods.buyGriffinNFT(action.payload.amount)
              .send({ from: state.account, value: price })
              .then(() => {
                NotificationManager.success("Success to mint NFT!", "Success", 2000);
                getGlobalInfo();
              }).catch((e) => {
                NotificationManager.error("Failed to mint NFT!", "Error", 2000);
              })
          });
      } catch (e) {
        console.log("error :", e);
      } finally {
      }
      break;
    case 'GET_USER_INFO':
      var account = action.payload && action.payload.account ? action.payload.account : state.account;
      if (!account) {
        connectAlert();
        return state;
      }
      try {
        axios.post(`${config.api}/get_nft_list`, {
          address: account,
          sync_index: action.payload ? action.payload.sync_index : null
        }).then((result) => {
          store.dispatch({ type: 'RETURN_DATA', payload: { myNfts: result.data.list, account: account } });
        }).catch(() => {
          store.dispatch({ type: 'RETURN_DATA', payload: { account: account } });
        });
      } catch (e) {
      }
      break;
    case 'PAY_GRIFFIN_FEE':
      if (!state.account) {
        connectAlert();
        return state;
      }
      if (!checkNetwork(state.chainId)) {
        return state;
      }
      try {
        griffin.methods.getGriffinFee().call().then((fee) => {
          griffin.methods.payTokenGriffinFee(action.payload.tokenId)
            .send({ from: state.account, value: fee * 4 }).then(() => {
              NotificationManager.success("Success to pay fee", "Success", 2000);
              store.dispatch({ type: "GET_USER_INFO", payload: { sync_index: action.payload.sync_index } });
            }).catch((e) => {
              NotificationManager.error("Failed to pay fee", "Error", 2000);
            });
        });
      } catch (e) {
      }
      break;
    case 'RETURN_DATA':
      return { ...state, ...action.payload };
    default:
      break;
  }
  return state;
};


if (window.ethereum) {
  web3.eth.getAccounts((err, accounts) => {
    if (!err)
      store.dispatch({ type: 'GET_USER_INFO', payload: { account: accounts[0] } });
  });
  window.ethereum.on('accountsChanged', function (accounts) {
    store.dispatch({
      type: "RETURN_DATA",
      payload: { account: accounts[0] }
    });
  })
  window.ethereum.on('chainChanged', function (chainId) {
    checkNetwork(chainId);
    store.dispatch({
      type: "RETURN_DATA",
      payload: { chainId: chainId }
    });
  });
  web3.eth.getChainId().then((chainId) => {
    checkNetwork(chainId);
    store.dispatch({
      type: "RETURN_DATA",
      payload: { chainId: chainId }
    });
  })
}


const connectAlert = () => {
  NotificationManager.error("Please connect your wallet!", "Error", 2000);
}

const checkNetwork = (chainId) => {
  if (web3.utils.toHex(chainId) !== web3.utils.toHex(config.test.chainId)) {
    NotificationManager.warning("Change network to Avalanche C Chain!", "Warning", 2000);
    return false;
  }
  return true;
}



const getFireBalance = async () => {
  try {
    var pairs =
      ["0xfcc6CE74f4cd7eDEF0C5429bB99d38A3608043a5",
        "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        "0xc7198437980c041c805A1EDcbA50c1Ce5db95118"];
    var result = await router.methods.getAmountsOut("1000000000000000000", pairs).call();
    var fire_avax = gWeb3.utils.fromWei(result[1], 'ether');
    var fire_usdt = gWeb3.utils.fromWei(result[2], 'Mwei');
    store.dispatch({ type: 'RETURN_DATA', payload: { fire_avax, fire_usdt } });
  } catch (e) {

  } finally {
    setTimeout(getFireBalance, 10000);
  }
}

const getGlobalInfo = async () => {
  try {
    var totalNft = await gGriffin.methods._totalNFT().call();
    var nftPrice = await gGriffin.methods.getNFTPrice(totalNft).call();
    nftPrice = web3.utils.fromWei(nftPrice, 'ether');
    var tierCount = await gGriffin.methods.getTier(totalNft).call();
    var griffinCount = await gGriffin.methods._griffinCount().call();
    var winners = [];
    if (griffinCount > 0) {
      winners = await gGriffin.methods.getWinners(griffinCount - 1).call();
    }
    var lastGriffinTime = await gGriffin.methods._lastGriffin().call();
    var nftBaseUrl = await gNft.methods.getBaseURI().call();
    // // var nftBaseUrl = "https://ipfs.infura.io/ipfs/QmR8Fs5zseYYVhvVFjNS7EJQrNHwcs3UpswpC1QonWXZMn/";
    store.dispatch({ type: 'RETURN_DATA', payload: { totalNft, nftPrice, tierCount, winners, lastGriffinTime, nftBaseUrl } });
  } catch (e) {
    console.log("error in get global info!");
    console.log(e);
  }
  finally { }
}

const getCurrentTime = async () => {
  try {
    var currentTime = await gGriffin.methods.getCurrentTime().call();
    store.dispatch({ type: 'RETURN_DATA', payload: { currentTime } });
  } catch (e) {
    console.log("get current time error!");
    console.log(e);
  } finally {
    setTimeout(getCurrentTime, 5000);
  }
}


getGlobalInfo();
getFireBalance();
getCurrentTime();

const store = createStore(reducer);
export default store;
