require("dotenv").config();
// Require web3.js library
const Web3 = require("web3");

// Set up Ethereum node URL from environment variable
const network = process.env.ETHEREUM_NETWORK_SEPOLIA;
const infuraNodeUrl = `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`;

// Set up wallet address to monitor from environment variable
const walletAddress = process.env.METAMASK_WALLET_ADDRESS_1;

// Connect to Ethereum node using HTTP provider
const web3 = new Web3(new Web3.providers.HttpProvider(infuraNodeUrl));

// Set up event listener for new transactions
web3.eth.subscribe("pendingTransactions", function (error, result) {
  if (!error) {
    console.log(result);
  }
});

// Set up event listener for new blocks
web3.eth.subscribe("newBlockHeaders", function (error, result) {
  if (!error) {
    console.log(result);
  }
});

// Get balance of wallet address
web3.eth.getBalance(walletAddress, function (error, result) {
  if (!error) {
    console.log("Balance: " + result);
  }
});

// Get transaction history of wallet address
web3.eth.getTransactionCount(walletAddress, function (error, count) {
  if (!error) {
    console.log("Transaction count: " + count);
    for (let i = 0; i < count; i++) {
      web3.eth.getTransaction(
        web3.eth.accounts[walletAddress][i],
        function (error, tx) {
          if (!error) {
            console.log("Transaction " + i + ": " + tx);
          }
        }
      );
    }
  }
});
