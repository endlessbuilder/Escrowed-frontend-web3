import web3 from './web3';
import EscrowedJson from './Escrowed.json';

const { abi, evm }: any = EscrowedJson;

const Escrowed = (address: string) => {
  return new web3.eth.Contract(abi, address);
};

export default Escrowed;
