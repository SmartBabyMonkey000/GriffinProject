// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../../phoenixv3/RewardManagementV3.sol";
import "./GriffinNFT.sol";

contract Griffin is Ownable {
    using SafeMath for uint256;

    struct CandidateInfo {
        address user;
        uint256 tokenId;
        uint256 remainCount;
    }

    struct WinnerInfo {
        address user;
        uint256 tokenId;
    }

    struct NFTInfo {
        uint256 tokenId;
        uint256 createTime;
    }

    event BuyNFT(address sender, uint256 nCount);
    event SetPeriodTime(address sender, uint256 period);
    event SetMaxOrderCount(address sender, uint256 count);
    event SetNFTPrice(address sender, uint256 newPrice1, uint256 newPrice2, uint256 newPrice3, uint256 newPrice4, uint256 newPrice5);
    event SetContractStatus(address sender, uint256 _newPauseContract);
    event SetGriffinFee(address sender, uint256 griffinFee);
    event SetTierCount(address sender, uint256 tier1, uint256 tier2, uint256 tier3, uint256 tier4, uint256 tier5);
    event SetWinnerCountPerTier(address sender, uint256 winner1, uint256 winner2, uint256 winner3, uint256 winner4, uint256 winner5);

    event SetTeamWallet(address sender, address wallet);
    event SetWinnerWallet(address sender, address wallet);
    event SetMaintenanceWallet(address sender, address wallet);
    event SetRoyaltyFee(address sender, uint256 winnerFee, uint256 teamFee);
    event AllGriffinFee(address sender, uint256 nCount);
    event TokenGriffinFee(address sender, uint256 tokenId, uint256 nCount);
    event ChangeTier(address sender, uint256 nTier);
    event SetBackendWallet(address sender, address wallet);
    event SetMinRepeatCount(address sender, uint256 minCount);

    event Received(address sender, uint256 value);
    event Fallback(address sender, uint256 value);

    uint256[5] _tierCount;

    uint256 pauseContract               = 0;
    uint256 MAX_ORDER_COUNT             = 20;               // maximum nft order count
    uint256 ONE_PERIOD_TIME             = 7 * 86400;        // seconds for one day
    uint256 ONETIME_GRIFFIN_FEE         = 25 * 10**15;
    uint256 _nftPrice;
    uint256 _unit                       = 10**18;
    uint256 _teamRoyalty                = 500;
    uint256 _winnerRoyalty              = 500;
    uint256 _minRepeatCount             = 4;
    uint256 public _nextTierLevel       = 0;
    uint256[2] public _avaxBalance;
    uint256[2] public _walletBalance;
    uint256 public _totalNFT;
    uint256 public _griffinRewards;
    uint256 public _griffinCount;
    uint256 public _lastGriffin;
    uint256[5] _nftPrices;
    uint256[5] _winnerCountPerTier;
    uint256 nounce                      = 0;
    uint256 spanSize                    = 100;
    uint256 consideringSpanIndex        = 0;
    mapping(address => bool)    public _whiteList;
    uint256 public _whiteListPrice;
    uint256 public _whiteListLimit      = 10;
    mapping(address => uint256) public _whiteListCount;
    mapping(address => uint256) public _buyHistory;
    uint256 public _buyLimit            = 100;
    address public _fireBird;



    address _teamWallet                 = 0x697A32dB1BDEF9152F445b06d6A9Fd6E90c02E3e; // team wallet
    address _winnerWallet               = 0x697A32dB1BDEF9152F445b06d6A9Fd6E90c02E3e; // winner wallet
    address payable _maintenanceWallet  = payable(0x697A32dB1BDEF9152F445b06d6A9Fd6E90c02E3e); // winner wallet
    address _backendWallet              = 0xDe08d67dcDfFBC9c016af5F3b8011A87d234523d; // backend wallet
    bool[10000] _indices;
    mapping(uint256 => address)[2] _wallets;
    mapping(uint256 => uint256) _griffinFee;
    mapping(uint256 => uint256) _winnerCount;
    mapping(uint256 => uint256) _createTime;
    mapping(uint256 => mapping(uint256 =>WinnerInfo)) _winners;

    GriffinNFT                  _griffinNFT;
    RewardManagementV3          _rewardManagement;

    /**
    * @dev Throws if called by any account other than the multi-signer.
    */
    modifier onlyMultiSignWallet() {
        require(owner() == _msgSender(), "Multi-signer: caller is not the multi-signer");
        _;
    }

    /**
    * @dev Throws if called by any account other than the multi-signer.
    */
    modifier onlyBackendWallet() {
        require(_backendWallet == _msgSender() || owner() == _msgSender(), "caller is not the backend wallet");
        _;
    }

    /**
    * @dev pause bond and redeem when pauseContract set 1
    */
    modifier disablePause() {
        require(pauseContract == 0, "Contract Paused");
        _;
    }

    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    fallback() external payable { 
        emit Fallback(msg.sender, msg.value);
    }

    constructor(address griffinNFTAddress, address payable rewardManagementV3Address) {
        _griffinNFT = GriffinNFT(griffinNFTAddress);
        _rewardManagement = RewardManagementV3(rewardManagementV3Address);

        _totalNFT = _griffinNFT.totalSupply();
        setTierCount(2000, 4000, 6000, 8000, 10000);
        setWinnerCountPerTier(5, 10, 15, 20, 25);
        setNFTPrice(3*10**18, 4*10**18, 5*10**18, 6*10**18, 7*10**18);
        //test ----
        // ONE_PERIOD_TIME = 300;
        // setTierCount(12, 24, 36, 48, 60);
    }

    function min(uint256 a, uint256 b) internal pure returns(uint256) {
        return a > b ? b : a;
    }

    function getPresaleCountByUser(address user, uint256 nCount) internal view returns(uint256) {
        if (getTier(_totalNFT) == 1) {
            uint256 wCount = 0;
            if ((_whiteList[user] || IERC721(_fireBird).balanceOf(user) > 0 || _rewardManagement.getNodeList(user).length > 0) && _whiteListCount[user] <= _whiteListLimit) {
                wCount = min(_whiteListLimit - _whiteListCount[user], nCount);
            }
            return wCount;
        } else {
            return 0;
        }
    }

    function getNFTBundlePriceByUser(address user, uint256 nCount ) public view returns(uint256) {
        uint256 wCount = getPresaleCountByUser(user, nCount);
        return wCount * _whiteListPrice + getNFTBundlePrice(nCount - wCount);
    }

    function getNFTBundlePrice(uint256 nCount) public view returns(uint256) {
        uint256 nftPrice;
        if(_totalNFT+nCount > _tierCount[_nextTierLevel]) {
            nftPrice = (_tierCount[_nextTierLevel] - _totalNFT) * getNFTPrice(_totalNFT);
            nftPrice += (_totalNFT+nCount - _tierCount[_nextTierLevel]) * getNFTPrice(_tierCount[_nextTierLevel]);
        } else {
            nftPrice = getNFTPrice(_totalNFT) * nCount;
        }
        return nftPrice;
    }

    function buyGriffinNFT(uint256 nCount) external payable {
        // uint256 nftPrice = getNFTBundlePrice(nCount);
        uint256 wCount = getPresaleCountByUser(msg.sender, nCount);

        if (getTier(_totalNFT) == 1) {
            require(_whiteList[msg.sender], "not a whitelist member");
            require(wCount == nCount, 
                    "exceed maximum buy count for whitelist member");
            require(wCount + _totalNFT <= _tierCount[0], "exceed maximum nft count of tier 1");
            if (IERC721(_fireBird).balanceOf(msg.sender) > 0 ) {
                _whiteList[msg.sender]  = true;
            }
        }
        require (_buyHistory[msg.sender] + nCount <= _buyLimit, "exceed maximum buy count");
        
        uint256 nftPrice = getNFTBundlePriceByUser(msg.sender, nCount);
        require(msg.value >= nftPrice, "insufficient funds");
        require(nCount <= MAX_ORDER_COUNT, "exceed maximum order count");
        require(_totalNFT + nCount <= _tierCount[4], "exceed maximum NFT count");
        
      
        // send to team wallet
        uint256 val = nftPrice * _teamRoyalty / 1000;
        if(val > 0) {
            payable(_teamWallet).transfer(val);
        }

        // send to winner wallet
        val = nftPrice  * _winnerRoyalty / 1000;
        if(val > 0) {
            payable(_winnerWallet).transfer(val);
        }

        uint256 tokenId;
        // mint nCount NFT
        for(uint256 i=0; i<nCount; i++) {
            tokenId = _griffinNFT.mint(msg.sender, randomIndex());
            _createTime[tokenId] = block.timestamp;
        }
        if(_totalNFT + nCount >= _tierCount[_nextTierLevel]) {
            changeTier();
        }
        _totalNFT += nCount;
        if (_whiteList[msg.sender]) {
            _whiteListCount[msg.sender] += getPresaleCountByUser(msg.sender, nCount);
        }
        _buyHistory[msg.sender] += nCount;
        emit BuyNFT(msg.sender, nCount);
    }

    function changeTier() public onlyMultiSignWallet{
        _nextTierLevel++;
        emit ChangeTier(msg.sender, getTier(_totalNFT));
    }

    function getAllNFT(address owner) external view returns(NFTInfo[] memory) {
        uint256 ct = _griffinNFT.balanceOf(owner);
        NFTInfo[] memory res = new NFTInfo[](ct);
        for(uint256 i=0; i<ct; i++) {
            res[i].tokenId = _griffinNFT.tokenOfOwnerByIndex(owner, i);
            res[i].createTime = _createTime[res[i].tokenId];
        }
        return res;
    }

    function payAllGriffinFee() external payable {
        uint256 nftCount = _griffinNFT.balanceOf(msg.sender);
        require(msg.value >= ONETIME_GRIFFIN_FEE * nftCount, "insufficient griffin fee");
        uint256 nCount = msg.value / ONETIME_GRIFFIN_FEE / nftCount;
        require(nCount >= _minRepeatCount, "lower than mininum repeat count");
        uint256 tokenId;
        for(uint8 i=0; i<nftCount; i++) {
            tokenId = _griffinNFT.tokenOfOwnerByIndex(msg.sender, i);
            if(_griffinFee[tokenId] < _griffinCount) {
                _griffinFee[tokenId] = _griffinCount;
            }
            _griffinFee[tokenId] += nCount;
        }
        // send all to _maintenanceWallet
        payable(_maintenanceWallet).transfer(msg.value);
        emit AllGriffinFee(msg.sender, nCount);
    }

    function payTokenGriffinFee(uint256 tokenId) external payable {
        require(msg.value >= ONETIME_GRIFFIN_FEE, "insufficient griffin fee");
        require(_griffinNFT.ownerOf(tokenId) == msg.sender, "have no token id");
        uint256 nCount = msg.value / ONETIME_GRIFFIN_FEE;
        require(nCount >= _minRepeatCount, "lower than minimum repeat count");
        if(_griffinFee[tokenId] < _griffinCount) {
            _griffinFee[tokenId] = _griffinCount;
        }
        _griffinFee[tokenId] += nCount;
        // send all to _maintenanceWallet
        payable(_maintenanceWallet).transfer(msg.value);
        emit TokenGriffinFee(msg.sender, tokenId, nCount);
    }

    function startgriffin() external payable onlyBackendWallet disablePause{
        require(block.timestamp - _lastGriffin >= ONE_PERIOD_TIME, "insufficient griffin period");
        
        //increase griffin count;
        _griffinCount++;
        //update last griffin time;
        _lastGriffin = block.timestamp;
    }

    function getWinners(uint256 griffinIndex) external view returns(WinnerInfo[] memory winners){
        winners = new WinnerInfo[](_winnerCount[griffinIndex]);
        for(uint256 i=0; i<_winnerCount[griffinIndex]; i++) {
            winners[i] = _winners[griffinIndex][i];
        }
        return winners;
    }

    function setWinners(uint256 griffinIndex, WinnerInfo[] memory winners) external onlyBackendWallet{
        require(griffinIndex < _griffinCount, "invalid griffin index");
        require(_winnerCount[griffinIndex] == 0, "already set");
        require(winners.length <= _winnerCountPerTier[getTier(_totalNFT)-1], "invalid winner count");
        for(uint256 i=0; i<winners.length; i++) {
            _winners[griffinIndex][i] = winners[i];
        }
        _winnerCount[griffinIndex] = winners.length;
    }

    function randomIndex() internal  returns (uint) 
    {
        require(pauseContract == 0, "Contract Paused");
        uint256 index;

        index = uint256(keccak256(abi.encodePacked(
            block.timestamp , block.difficulty , msg.sender, nounce++ , spanSize
        ))) % spanSize;

        index.add( consideringSpanIndex.mul(spanSize) );

        index = isExists(index);
        
        return index; 
    }

    function isExists(uint256 index) internal returns(uint256)
    {
        require(pauseContract == 0, "Contract Paused");
        uint256 idx=1;
        uint256 newIndex = index;
        if(_indices[newIndex] == true) 
        {
            for(idx = 0; idx < spanSize; idx++)
            {
                if(_indices[consideringSpanIndex.mul(spanSize).add(idx)] == false)
                {
                    newIndex = consideringSpanIndex.mul(spanSize).add(idx);
                    break;
                }
            }
        }
        _indices[newIndex] = true;
        return newIndex;
    }

    function getCandidates(uint256 nStart, uint256 nCount) external view returns(CandidateInfo[] memory) {
        if(nCount == 0) {// when nCount == 0, get all candidates.
            nCount = _totalNFT;
        }
        if(nStart + nCount > _totalNFT) {
            nCount = _totalNFT - nStart;
        }
        CandidateInfo[] memory candidates = new CandidateInfo[](nCount);
        for(uint256 i = 0; i < nCount; i++) {
            candidates[i].tokenId = _griffinNFT.tokenByIndex(nStart + i);
            candidates[i].user = _griffinNFT.ownerOf(candidates[i].tokenId);
            if(_griffinFee[candidates[i].tokenId] > _griffinCount) {
                candidates[i].remainCount = _griffinFee[candidates[i].tokenId] - _griffinCount;
            }
        }
        return candidates;
    }

    function getTier(uint256 nftCount) public view returns(uint256) {
        if(nftCount < _tierCount[0]) return 1;
        if(nftCount < _tierCount[1]) return 2;
        if(nftCount < _tierCount[2]) return 3;
        if(nftCount < _tierCount[3]) return 4;
        if(nftCount < _tierCount[4]) return 5;
        return 6;
    }

    function getTierCount() external view returns(uint256, uint256, uint256,uint256, uint256) {
        return (_tierCount[0], _tierCount[1], _tierCount[2], _tierCount[3], _tierCount[4]);
    }

    function setTierCount(uint256 tier1, uint256 tier2, uint256 tier3, uint256 tier4, uint256 tier5) public onlyMultiSignWallet{
        _tierCount[0] = tier1;
        _tierCount[1] = tier2;
        _tierCount[2] = tier3;
        _tierCount[3] = tier4;
        _tierCount[4] = tier5;
        emit SetTierCount(msg.sender, tier1, tier2, tier3, tier4, tier5);
    }

    function getWinnerCountPerTier() external view returns(uint256, uint256, uint256,uint256, uint256) {
        return (_winnerCountPerTier[0], _winnerCountPerTier[1], _winnerCountPerTier[2], _winnerCountPerTier[3], _winnerCountPerTier[4]);
    }

    function setWinnerCountPerTier(uint256 winner1, uint256 winner2, uint256 winner3, uint256 winner4, uint256 winner5) public onlyMultiSignWallet{
        _winnerCountPerTier[0] = winner1;
        _winnerCountPerTier[1] = winner2;
        _winnerCountPerTier[2] = winner3;
        _winnerCountPerTier[3] = winner4;
        _winnerCountPerTier[4] = winner5;
        emit SetWinnerCountPerTier(msg.sender, winner1, winner2, winner3, winner4, winner5);
    }

    function transferAssetOwner(address asset, address to) external onlyMultiSignWallet {
        Ownable(asset).transferOwnership(to);
    }

    function getNFTPrice(uint256 nftCount) public view returns(uint256) {
        return _nftPrices[getTier(nftCount)-1];
    }

    function setNFTPrice(uint256 newPrice1, uint256 newPrice2, uint256 newPrice3, uint256 newPrice4, uint256 newPrice5) public onlyMultiSignWallet disablePause{
        _nftPrice = newPrice1;
        _nftPrices[0] = newPrice1;
        _nftPrices[1] = newPrice2;
        _nftPrices[2] = newPrice3;
        _nftPrices[3] = newPrice4;
        _nftPrices[4] = newPrice5;
        emit SetNFTPrice(msg.sender, newPrice1, newPrice2, newPrice3, newPrice4, newPrice5);
    }

    function getGriffinFee() external view returns(uint256) {
        return ONETIME_GRIFFIN_FEE;
    }

    function setGriffinFee(uint256 griffinFee) external onlyMultiSignWallet disablePause{
        ONETIME_GRIFFIN_FEE = griffinFee;
        emit SetGriffinFee(msg.sender, griffinFee);
    }

    function getPeriodTime() external view returns(uint256) {
        return ONE_PERIOD_TIME;
    }

    function setPeriodTime(uint256 period) external onlyMultiSignWallet disablePause{
        ONE_PERIOD_TIME = period;
        emit SetPeriodTime(msg.sender, period);
    }

    function getLoyaltyFee() external view returns(uint256, uint256) {
        return (_winnerRoyalty, _teamRoyalty);
    }

    function setRoyaltyFee(uint256 winnerFee, uint256 teamFee) external onlyMultiSignWallet disablePause{
        require(winnerFee <= 1000, "winnerFee is too high.");
        require(teamFee <= 1000, "teamFee is too high.");
        require(winnerFee + teamFee <= 1000, "invalid parameter.");
        _winnerRoyalty = winnerFee;
        _teamRoyalty = teamFee;
        emit SetRoyaltyFee(msg.sender, winnerFee, teamFee);
    }

    function getTeamWallet() external view returns(address) {
        return _teamWallet;
    }

    function setTeamWallet(address team) external onlyMultiSignWallet{
        _teamWallet = team;
        emit SetTeamWallet(msg.sender, team);
    }

    function getWinnerWallet() external view returns(address) {
        return _winnerWallet;
    }

    function setWinnerWallet(address addr) external onlyMultiSignWallet{
        _winnerWallet = addr;
        emit SetWinnerWallet(msg.sender, addr);
    }

    function getMaintenanceWallet() external view returns(address) {
        return _maintenanceWallet;
    }

    function setMaintenanceWallet(address payable addr) external onlyMultiSignWallet{
        _maintenanceWallet = addr;
        emit SetMaintenanceWallet(msg.sender, addr);
    }    

    function getMaxOrderCount() external view returns(uint256) {
        return MAX_ORDER_COUNT;
    }

    function setMaxOrderCount(uint256 count) external onlyMultiSignWallet disablePause{
        MAX_ORDER_COUNT = count;
        emit SetMaxOrderCount(msg.sender, count);
    }

    function getContractStatus() external view returns (uint256) {
        return pauseContract;
    }

    function setContractStatus(uint256 _newPauseContract) external onlyMultiSignWallet disablePause {
        pauseContract = _newPauseContract;
        emit SetContractStatus(msg.sender, _newPauseContract);
    }

    function getBackendWallet() external view returns (address) {
        return _backendWallet;
    }

    function setBackendWallet(address wallet) external onlyMultiSignWallet disablePause {
        _backendWallet = wallet;
        emit SetBackendWallet(msg.sender, wallet);
    }

    function getMinRepeatCount() external view returns (uint256) {
        return _minRepeatCount;
    }

    function setMinRepeatCount(uint256 minCount) external onlyMultiSignWallet disablePause {
        _minRepeatCount = minCount;
        emit SetMinRepeatCount(msg.sender, minCount);
    }

    function getCurrentTime() external view returns(uint256) {
        return block.timestamp;
    }

    function withdraw(address tokenAddress, uint256 amount, address payable to) external onlyMultiSignWallet {
        uint256 balance;
        if(tokenAddress != address(0)) {
            balance = IERC20(tokenAddress).balanceOf(address(this));
            if(balance < amount) {
                amount = balance;
            }
            IERC20(tokenAddress).transfer(to, amount);
        } else {
            balance = address(this).balance;
            if(balance < amount) {
                amount = balance;
            }
            to.transfer(amount);
        }
    }

    function setWhiteListPrice(uint256 price) external onlyMultiSignWallet disablePause{
        _whiteListPrice = price;
    }

    function setWhiteListLimit(uint256 limit) external onlyMultiSignWallet disablePause{
        _whiteListLimit = limit;
    }

    function setWhiteList(address[] memory list) external onlyMultiSignWallet disablePause {
        for (uint256 i = 0; i < list.length; i++) {
            _whiteList[list[i]] = true;
        }
    }

    function removeFromWhiteList(address[] memory list) external onlyMultiSignWallet disablePause {
        for (uint256 i = 0; i < list.length; i++) {
            _whiteList[list[i]] = false;
        }
    }

    function getWhiteListCountPerUser(address user) external view returns(uint256) {
        return _whiteListCount[user];
    }

    function setBuyLimit(uint256 limit) external onlyMultiSignWallet disablePause {
        _buyLimit = limit;
    }

    function setWhiteListNft(address nftAddress)  external onlyMultiSignWallet disablePause {
        _fireBird = nftAddress;
    }

}
