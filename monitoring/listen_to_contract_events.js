require("dotenv").config();
const Web3 = require("web3");
const erc20ContractABI = require("./erc_20_abi.json");
const WEBSOCKETS_URL = process.env.ALCHAMY_GOERLI_WEBSOCKETS_URL;
const GOERLI_ERC20_CONTRACT_ADDRESS = process.env.GOERLI_ERC20_CONTRACT_ADDRESS;

function listenToContract(address) {
  // Set up Ethereum node URL from environment variable
  // create a web3 instance
  const web3 = new Web3(WEBSOCKETS_URL);

  const erc20ContractAddress =
    address == null || address.length == 0
      ? GOERLI_ERC20_CONTRACT_ADDRESS
      : address;

  // Create the contract instance
  const usdtContract = new web3.eth.Contract(
    erc20ContractABI,
    erc20ContractAddress
  );

  // Listen to the Transfer event
  usdtContract.events
    .Transfer()
    .on("data", (event) => {
      console.log("Transfer event:", event.returnValues);
      // Handle the event data as needed
    })
    .on("error", (error) => {
      console.error("Error:", error);
      // Handle errors, if any
    });
}

module.exports = listenToContract;

if (require.main == module) {
  listenToContract();
}
