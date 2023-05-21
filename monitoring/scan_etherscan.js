require("dotenv").config();
const axios = require("axios");

const etherscanApiUrl = "https://api.etherscan.io/api";
const apiKey = process.env.ETHERSCAN_API_KEY;
const walletAddress = process.env.ROBINHOOD_WALLET_ADDRESS_1;

console.log(walletAddress);
const params = {
  module: "account",
  action: "txlist",
  address: walletAddress,
  sort: "desc",
  apikey: apiKey,
};

axios
  .get(etherscanApiUrl, { params })
  .then((response) => {
    console.log(response.data.result);
  })
  .catch((error) => {
    console.error(error);
  });
