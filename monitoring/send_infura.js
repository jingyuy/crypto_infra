require("dotenv").config();
const Web3 = require("web3");

async function main() {
  // Set up Ethereum node URL from environment variable
  const network = process.env.ETHEREUM_NETWORK_SEPOLIA;
  const chainId = parseInt(process.env.ETHEREUM_NETWORK_SEPOLIA_CHAIN_ID);

  // set the sending and receiving addresses
  const privateKey = process.env.METAMASK_PRIVATE_KEY_1;
  const toAddress = process.env.METAMASK_WALLET_ADDRESS_3;

  // set the amount
  const amount = "0.001";

  // Configuring the connection to an Ethereum node

  // create a web3 instance
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  );

  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(privateKey);

  // Estimatic the gas limit
  var limit = web3.eth
    .estimateGas({
      from: signer.address,
      to: toAddress,
      value: web3.utils.toWei("0.001"),
    })
    .then(console.log);

  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: toAddress,
    value: web3.utils.numberToHex(web3.utils.toWei(amount, "ether")),
    gas: web3.utils.toHex(limit),
    nonce: web3.eth.getTransactionCount(signer.address),
    maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei("2", "gwei")),
    chainId: chainId,
    type: 0x2,
  };

  signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
  console.log("Raw transaction data: " + signedTx.rawTransaction);

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

main();
