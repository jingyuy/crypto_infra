require("dotenv").config();
const Web3 = require("web3");

function main() {
  // Set up Ethereum node URL from environment variable
  const network = process.env.ETHEREUM_NETWORK_SEPOLIA;
  const infura_api_key = process.env.INFURA_API_KEY;

  // create a web3 instance
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${infura_api_key}`
    )
  );

  const newAccount = web3.eth.accounts.create();
  console.log("New Acount Address:", newAccount.address);
  console.log("New Account Private Key:", newAccount.privateKey);
}

main();
