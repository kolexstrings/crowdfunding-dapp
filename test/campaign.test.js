const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require ('../ethereum/build/CampaignFactoryjson')
const compiledCampaign = require('../ethereum/build/Campaignjson');

let accounts;
let factory;
let campaign;
let campaignAddress;


beforeEach(async ()=> {
    accounts = await web3.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({from: accounts[0], gas: '1000000' });

    await factory.methods.CreateCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    const addresses = await factory.methods.getDeployedCampaigns().call();
    const campaignAddress = addresses[0];

    campaign = await new web3.eth.Contract(JSON.parse(
        compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', ()=> {
        address =
    })
});