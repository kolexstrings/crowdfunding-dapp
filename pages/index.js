import React from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react'
import Layout from '../components/Layout'
import {Link} from '../routes';

const CampaignIndex = ({ campaigns }) => {
  

  const items = campaigns.map((address)=> {
    return (
      <Card key = {address} fluid>
        <Card.Content>
          <Card.Header>{address}</Card.Header>
          <Card.Description>
            <Link route={`/campaigns/${address}`}>
              <a>View Campaign</a>
            </Link>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });
  return (
    <Layout>
      <div>
      <h3>Open Campaigns</h3>

        <Link route = "/campaigns/new">
          <a>
          <Button 
            floated='right'
            content='Create Campaign' 
            icon='add circle' 
            primary 
          />
          </a>
        </Link>
       
        <Card.Group>{items}</Card.Group>
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
