const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require ('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');
const { verify } = require('crypto');

let accounts;
let factory;
let campaign;
let campaignAddress;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    const addresses = await factory.methods.getDeployedCampaigns().call();
    campaignAddress = addresses[0];

    campaign = await new web3.eth.Contract(JSON.parse(
        compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(factory.options.address);
    });

    it('contract caller is the manager', async () => {
        const manager = await campaign.methods.manager().call()

        assert.equal(accounts[0], manager);
    });

    it('can donate money to become approver', async ()=> {
        await campaign.methods.contribute().send({
            from: accounts[1], 
            value: '200', 
            gas: '1000000'
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call()

        assert(isContributor);
    });

    it('it requires a minimum contribution', async ()=> {
       try {
        await campaign.methods.contribute().send({
            from:accounts[0], 
            value: '50',
            gas: '1000000'
        });
        assert(false);
       } catch (error) {
        assert(error);
       }
    });

    it ('allows manager to create request', async ()=> {
        await campaign.methods.createRequest("Hire Blockchain Engineer", "10", accounts[1]).send({
            from: accounts[0], 
            gas: '1000000'
        });

       const requests = await campaign.methods.requests(0).call()

       assert.equal(requests.description, 'Hire Blockchain Engineer');
       console.log(requests.description);

    });

    it ('campaign works from end to end', async ()=> {
        await campaign.methods.contribute().send({
            from: accounts[0], 
            value: web3.utils.toWei('10','ether'),
            gas: '1000000'
        });
        await campaign.methods.createRequest("Buy drilling tools", web3.utils.toWei('5', 'ether'), accounts[1])
        .send ({
            from: accounts[0], 
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0], 
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0], 
            gas: '1000000'
        });

        let balance = await web3.eth.getBalance(accounts[1])
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance);

        console.log(balance)
        assert(balance > 1004);
    });
});