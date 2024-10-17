import web3 from './web3';
import EscrowedJson from './Escrowed.json';
import { CONTRACT_ADDRESS } from './constants';
import { Contract } from 'web3';

const { abi, evm }: any = EscrowedJson;

const escrowed = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

export default escrowed;
