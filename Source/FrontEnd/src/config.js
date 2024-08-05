var routerAbi = require("./contract/JoeRouterAbi.json");
var rewardAbi = require("./contract/RewardManagement.json");
var griffinAbi = require("./contract/GriffinAbi.json");
var nftAbi = require("./contract/NftAbi.json");

var config = {
    'main': {
        rpc: "https://api.avax.network/ext/bc/C/rpc",
        fireAddr: "0xfcc6CE74f4cd7eDEF0C5429bB99d38A3608043a5",
        chainId: 0xa86a,
        joeRouterAddr: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4",
        wavaxAddr: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        usdtAddr: "0xc7198437980c041c805A1EDcbA50c1Ce5db95118",
        griffinAddr: "0xA32782f6162a7d21B60E79C2F7b0629bF43b273e",
        rewardAddr: "0xB3cDf9482B7aFaEF502DD9cF84f5e9F3AbC2A723",
    },
    'test': {
        rpc: "https://api.avax-test.network/ext/bc/C/rpc",
        chainId: 0xa869,
        griffinAddr: "0xCC90e647b056a0f9e2f291E2C48224169D67E61A",
        rewardAddr: "0xa88CF98a3461e03d27e46e0D31d326ee0D755097",
        nftAddr: "0x7D194c4461275D39224B34bb2a23710293FD7397",
    },
    api: 'http://localhost:9000/api',
    rewardAbi: rewardAbi,
    griffinAbi: griffinAbi,
    joeRouterAbi: routerAbi,
    nftAbi: nftAbi
}


export default config;