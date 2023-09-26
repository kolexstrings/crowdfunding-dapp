import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from '../../../components/RequestRow';

const RequestIndex = ({address, requests, approversCount}) => {

    const { Header, Row, HeaderCell, Body } = Table;

   function renderRows () {
    return requests.map((request, index)=> {
        return <RequestRow 
        key={index}
        id={index}
        request={request}
        address={address}
        approversCount={approversCount}
        />
    });
   }

    return (
        <Layout>
            <h3>Requests</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>{renderRows()}</Body>
            </Table>
        </Layout>
    );
}

RequestIndex.getInitialProps = async (props) => {
    const address = props.query.address;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
        Array(parseInt(requestCount)).fill().map((element, index) => {
            return campaign.methods.requests(index).call()
        })
    );

    console.log("requests: ",requests);

    
    return { address, requests, requestCount, approversCount }
}

export default RequestIndex;