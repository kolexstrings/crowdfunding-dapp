const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');
require('dotenv').config(); 

const mnemonicPhrase = process.env.MNEMONIC
const infuraUrl = process.env.INFURA_URL


const provider = new HDWalletProvider(
  mnemonicPhrase,
  infuraUrl
);
const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0]});

    console.log("Contract deployed to: ", result.options.address);
  } catch (error) {
    console.error('There was an isssue deploying this contracts: ', error);
  }
 
  provider.engine.stop();

};
deploy();
