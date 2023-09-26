import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

const { Row, Cell } = Table;

const RequestRow = ({id, address, request, approversCount}) => {

    const description = request.description;
    const amount = web3.utils.fromWei(request.value, 'ether');
    const recipient = request.recipient;
    const approvalCount = request.approvalCount.toString();

    async function handleApproval () {
        const campaign = Campaign(address);
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.approveRequest(id).send({
                from: accounts[0]
            })
        } catch(error) {
            console.error("There was an error approving this request: ", error)
        }
    };

    return (
        <Row>
            <Cell>{id}</Cell>
            <Cell>{description}</Cell>
            <Cell>{amount}</Cell>
            <Cell>{recipient}</Cell>
            <Cell>{approvalCount}/{approversCount.toString()}</Cell>
            <Cell>
                <Button basic color='green' onClick={handleApproval}>Approve</Button>
            </Cell>
        </Row>
    )
}

export default RequestRow;