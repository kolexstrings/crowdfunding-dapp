import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json'

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xB711BDd521BC5f8e3A9753925BAbd1D7Aaa1eDf1'
);

export default instance;