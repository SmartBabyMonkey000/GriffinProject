// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GriffinNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using Counters for Counters.Counter;

    event SetBaseURI(address addr, string newUri);
    event SetURI(address addr, string newUri);
    event SetMaxSupply(address addr, uint256 maxSupply);

    uint256 private MAX_NFT_SUPPLY          = 10000;
    
    Counters.Counter private _tokenCounter;
    
    string private _baseURIExtended;

    /**
    * @dev Throws if called by any account other than the multi-signer.
    */
    modifier onlyMultiSignWallet() {
        require(owner() == _msgSender(), "Multi-signer: caller is not the multi-signer");
        _;
    }

    constructor() ERC721("Griffin","LTR") {
        _baseURIExtended = "https://ipfs.infura.io/";
    }

   /**
    * @dev Mint masterNFT For Free
    */
    function mint(address sender, uint256 tokenId) external onlyMultiSignWallet returns(uint256){
        // Test _tokenCounter
        require(_tokenCounter.current() <= MAX_NFT_SUPPLY, "exceed maximum supply");

        // Incrementing ID to create new token
        _tokenCounter.increment();

        _safeMint(sender, tokenId);
        return tokenId;
    }

    /**
     * @dev Burns `tokenId`. See {ERC721-_burn}.
     *
     * Requirements:
     *
     * - The caller must own `tokenId` or be an approved operator.
     */
    function burn(uint256 tokenId) public virtual {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }

    /**
     * @dev Return the base URI
     */
    function _baseURI() internal override view returns (string memory) {
        return _baseURIExtended;
    }

    function getBaseURI() external view returns(string memory) {
        return _baseURIExtended;
    }

    /**
     * @dev Set the base URI
     */
    function setBaseURI(string memory baseURI_) external onlyMultiSignWallet() {
        _baseURIExtended = baseURI_;
        emit SetBaseURI(msg.sender, baseURI_);
    }

    function getMaxSupply() external view returns (uint256) {
        return MAX_NFT_SUPPLY;
    }

    function setMaxSupply(uint256 maxSupply) external onlyMultiSignWallet() {
        MAX_NFT_SUPPLY = maxSupply;
        emit SetMaxSupply(msg.sender, maxSupply);
    }
}