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
      <link
      async
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
      />
      <h3>Open Campaigns</h3>
        <Card.Group>{items}</Card.Group>
        <Button 
        content='Create Campaign' 
        icon='add circle' 
        primary 
        />
      </div>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignIndex;
