import { ethers, Wallet } from 'ethers';

export async function sendToken(
  amount,
  to,
  privateKey,
  rpcUrl
) {


  // Create a provider using the Infura RPC URL for Goerli
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  // Create a wallet instance from the sender's private key
  const wallet = new ethers.Wallet(privateKey, provider);

  // Construct the transaction object
  const tx = {
    to,
    value: ethers.utils.parseEther(amount.toString()),
  };

  // Sign the transaction with the sender's wallet
  const transaction = await wallet.sendTransaction(tx);

  // Wait for the transaction to be mined
  const receipt = await transaction.wait();

  return {receipt};
}