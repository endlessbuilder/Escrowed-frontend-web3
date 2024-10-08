import Web3 from 'web3';

let provider: any;

if (
  typeof window !== 'undefined' &&
  typeof (<any>window)?.ethereum !== 'undefined'
) {
  // we are in the browser and metamask is running
  (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  provider = (window as any).ethereum;
} else {
  const url = process.env.DEPLOY_ENDPOINT || '';
  // const mnemonic = process.env.DEPLOY_MNEMONIC || '';
  // provider = new HDWalletProvider(mnemonic, url);
  provider = new Web3.providers.HttpProvider(url);
}

const web3 = new Web3(provider);

export default web3;
