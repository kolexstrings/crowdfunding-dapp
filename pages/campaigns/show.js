import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

const CampaignShow = ({summary}) => {

}


CampaignShow.getInitialProps = async (props) => {
  const campaign = Campaign(props.query.address);

    try { 
    const summary = await campaign.methods.getSummary().call()
    console.log("Summary: ", summary)
      return {
        minimumContribution: summary[0],
        balance: summary[0],
        requestsCount: summary[0],
        approversCount: summary[0],
        manager:summary[0]
      };
    
    } catch(error) {
    console.error('There was an issue with the getSummary function: ',error);
  }
}


export default CampaignShow;