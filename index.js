const fs = require("fs");
const path = require("path");

const axios = require("axios").default;

const coins = [
  "bitcoin",
  "bitcoin-diamond",
  "ethereum",
  "ripple",
  "tether",
  "dogecoin",
  "tron",
  "litecoin",
  "chainlink",
  "polkadot",
  "stellar",
  "usd-coin",
  "bitcoin-cash",
  "eos",
  "dai",
  "aave",
  "yearn-finance",
  "unicorn-token",
  "ampleforth",
  "digibyte",
  "greekmythology",
  "jpeg-d",
  "icon",
  "wbnb",
  "magic",
  "tezos",
  "gstcoin",
  "banano",
  "floordao",
  "dog",
  "gods-unchained",
  "vethor-token",
  "dead-knight",
  "doge-floki-coin",
  "apenft",
  "dogelon-mars",
  "gm",
  "bitdao",
  "yield-guild-games",
  "matic-network",
  "iotex",
  "shiba-inu",
  "near",
  "bitcoinlegend",
  "avalanche-2",
  "bitcoin-trust",
  "fantom",
  "harmony",
  "kuma-inu",
  "solana",
  "ethereum-classic",
  "terrausd",
  "celo",
  "tomochain",
  "cardano",
  "parachute",
  "vechain",
  "ravencoin",
  "waves",
  "sun",
  "the-sandbox",
  "amp-token",
  "decred",
  "true-usd",
  "elrond-erd-2",
  "bittorrent",
  "qtum",
  "terra-luna",
  "gala",
  "ape",
  "hex",
  "binance-usd",
  "axie-infinity",
  "zilliqa",
  "wrapped-cryptokitties",
  "turtlecoin",
  "squid-game",
  "constitutiondao",
];

(async function init() {
  try {
    console.log("⌛ Fetching data... ⌛");
    const { data: coinsPrice } = await axios({
      url: "https://api.coingecko.com/api/v3/simple/price",
      method: "GET",
      params: {
        ids: coins.join(","),
        vs_currencies: "usd",
      },
    });

    const { data: coinsInfo } = await axios({
      url: "https://api.coingecko.com/api/v3/coins/list",
      method: "GET",
    });

    let finalStr = "";
    coins.forEach((coin) => {
      for (const id in coinsPrice) {
        if (coin !== id) {
          continue;
        }

        for (const token of coinsInfo) {
          if (token.id !== id) {
            continue;
          }

          let symbol = token.symbol.toUpperCase();

          switch (symbol) {
            case "DKM":
              symbol = "DEAD";
              break;
            case "DOFI":
              symbol = "FLOKI";
              break;
            case "SUN":
              symbol = "SUNNEW";
              break;
            case "BTT":
              symbol = "NEWBTT";
              break;
            case "BAN":
              symbol = "BANANO";
              break;
          }

          // console.log(`-> ${symbol}: ${coinsPrice[`${id}`].usd}$ ✅`);

          finalStr += `${symbol} ${coinsPrice[`${id}`].usd}$\n`;
        }
      }
    });

    finalStr += "IDR 14433.5$\nINR 77.6$";

    const writeFile = path.resolve(__dirname, "prices.csv");

    fs.writeFileSync(writeFile, finalStr);

    console.log(`✅ Token prices gets saved on:\n ${writeFile}`);
  } catch (err) {
    console.log("Failed to fetch data ❌");
    console.log(err.message);
  }
})();

// Internal Errors Handling
const UNKOWN_ERROR = `-> Something went wrong ☹! Pls check your connection
 or contact the developer;`;

process.on("unhandledRejection", (_) => {
  console.log(UNKOWN_ERROR);
  process.exit(1);
});

process.on("uncaughtException", (_) => {
  console.log(UNKOWN_ERROR);
  process.exit(1);
});
