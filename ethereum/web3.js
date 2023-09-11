import Web3 from "web3";
require('dotenv').config(); 

let web3;
const infuraUrl = process.env.INFURA_URL

if (typeof window !== 'undefined' && typeof window.ethereum !== "undefined") {
    //We are in the browser and metamask is running.
    window.ethereum.request({method: 'eth_requestAccounts'});
    web3 = new Web3(window.ethereum);
} else {
    //We are on the server *OR* the user is not runnnig metamask
    const provider = new Web3.providers.HttpProvider(
        'https://sepolia.infura.io/v3/fddcd5cb27ed40b9bcbbb8cd0dfed8b1'
    );
    web3 = new Web3(provider)
}

export default web3;