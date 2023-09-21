import web3 from '../ethereum/web3';
import Campaign from '../ethereum/build/Campaign.json';

export  default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Campaign.interface), 
    address
  );
}

