import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button} from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

const CampaignShow = ({ summary, address }) => {
  const { 
    minimumContribution,
    balance,
    requestsCount,
    approversCount,
    manager,
  } = summary;
  const {} = address;

  const items = [
    {
      header: manager,
      meta: "Campaign Manager's Address",
      description:
        'The manager is the creator of the campaign and has the privilege of creating withdrawal requests',
        style: { overflowWrap: "break-word" }
    },
    {
      header: minimumContribution.toString(),
      meta: "Minimum contribution (wei)",
      description: "You must contribute at least this much wei to become a minimum contribution",
    },
    {
      header: requestsCount.toString(),
      meta: "Number of Request", 
      description: 
      "The request count is the total number attempt tp withdraw money from the contract, request must be approved by approvers "
    },
    {
      header: approversCount.toString(),
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
     <Grid columns={2}>

      <Grid.Row>
        <Grid.Column width={10}>
            <h3>Campaign Show</h3>
          {summary && (
            <Card.Group items={items} />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <ContributeForm address={address} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Link route={`/campaigns/${address}/requests`}>
            <a>
              <Button primary>View Requests</Button>
            </a>
          </Link>
        </Grid.Column>
      </Grid.Row>

    </Grid>
  </Layout>
   
  );
};

CampaignShow.getInitialProps = async (props) => {
  try {
    const campaign = Campaign(props.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
      address: props.query.address,
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
