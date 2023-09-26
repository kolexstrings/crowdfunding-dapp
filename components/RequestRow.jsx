import React, {useState} from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';
import { Router } from '../routes';

const { Row, Cell } = Table;

const RequestRow = ({id, address, request, approversCount}) => {

    const description = request.description;
    const amount = web3.utils.fromWei(request.value, 'ether');
    const recipient = request.recipient;
    const approvalCount = request.approvalCount.toString();
    const readyToFinalize = parseInt(approvalCount) > parseInt(approversCount) / 2;

    async function handleApprove () {
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            })
            Router.pushRoute(`/campaigns/${address}/requests`)
        } catch(error) {
            console.error("There was an error approving this request: ", error)
        }
    };

    async function handleFinalize () {
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.finalizeRequest(id).send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${address}/requests`)
        } catch(error) {
            console.error("There was an issue finalzing this request: ", error);
        }
    }

    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{description}</Cell>
            <Cell>{amount}</Cell>
            <Cell>{recipient}</Cell>
            <Cell>{approvalCount}/{approversCount.toString()}</Cell>
            <Cell>
                {request.complete ? null : (
                    <Button color='green' basic onClick={handleApprove}>Approve</Button>
                )} 
            </Cell>
            <Cell>
                {request.complete ? null : (
                    <Button color='teal' basic onClick={handleFinalize}>Finalize</Button>
                )}
            </Cell>
        </Row>
    )
}

export default RequestRow;