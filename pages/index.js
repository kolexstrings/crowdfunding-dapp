import React from 'react';
import factory from '../ethereum/factory';
import {Card, Button} from 'semantic-ui-react'
import Layout from '../components/Layout'

const CampaignIndex = ({ campaigns }) => {
  

  const items = campaigns.map((address)=> {
    return (
      <Card key = {address} fluid>
        <Card.Content>
          <Card.Header>{address}</Card.Header>
          <Card.Description>
            <a>View Campaign</a>
          </Card.Description>
        </Card.Content>
      </Card>
    );
  });
  return (
    <Layout>
      <div>
      <h3>Open Campaigns</h3>
        <Button 
        floated='right'
        content='Create Campaign' 
        icon='add circle' 
        primary 
        />
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
