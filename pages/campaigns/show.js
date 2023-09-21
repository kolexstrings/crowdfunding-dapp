import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';

const CampaignShow = ({ summary }) => {

  if(summary) {
    console.log("Summary found in CampaignShow: ", summary) 
  } else {
    console.log("No summary was recieved in CampaignShow");
  }

  const { 
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
  } = summary;

  console.log("minimum contribution: ", minimumContribution)
  console.log("request count: ", requestsCount);
  console.log("approvers count: ", approversCount);

  const items = [
    {
      header: manager,
      meta: "Campaign Manager's Address",
      description:
        'The manager is the creator of the campaign and has the privilege of creating withdrawal requests',
        style: { overflowWrap: "break-word" }
    },
    {
      header: minimumContribution,
      meta: "Minimum contribution (Wei)",
      description: "You must contribute at least this much wei to become a minimum contribution",
    },
    {
      header: requestsCount,
      meta: "Number of Request", 
      description: 
      "The request count is the total number attempt tp withdraw money from the contract, request must be approved by approvers "
    },
    {
      header: approversCount,
      meta: "Number of Approvers",
      description: 
      "A number of people who have already donated to this campaign and have earned the right to approve request"
    },
    {
      header: web3.utils.fromWei(balance, 'ether'),
      meta: "Campaign Balance (ether)",
      description: "The balance is how much money this campaign has left"
    }
  ];

  return (
    <Layout> 
      <h3>Campaign Show</h3>
      <Card.Group items={items} />
    </Layout>
   
  );
};

CampaignShow.getInitialProps = async (props) => {
  try {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    console.log('Summary: ', summary);
    return {
      summary : {
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
      }
    };
  } catch (error) {
    console.error('There was an issue with the getSummary function: ', error);
  }
};

export default CampaignShow;
