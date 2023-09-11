import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x03950381eD47b4Bb82d07Ee352393E42f39f0c48'
);

export default instance;