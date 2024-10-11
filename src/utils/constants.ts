export const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
export const SEPOLIA_RPC =
  'https://rpc.ankr.com/eth_sepolia/3becd2d01b34b9aaada14a2aad12f01089cebabed27ea5bf1c950c413b34430f';
export const CONTRACT_ADDRESS = '0x223a770d7584D01725c91dfC636eD2866BdC0f14';

export const SERVER_IP = 'http://localhost:5000';

export interface Deed {
  id: number;
  title: string;
  description: string;
  payment_method: any;
  payment_type: any;
  amount: number;
  timeline: any;
  status: any;
  buyer_id: number;
  seller_id: number;
  category: any;
  createdAt: any;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}
