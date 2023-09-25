import React, { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react'
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

const ContributeForm = ({address}) => {
    const [value, setValue ] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit (event) {
        event.preventDefault();

        const campaign = Campaign(address);

        setLoading(true);
        setErrorMessage("")

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            })
            Router.replaceRoute(`/campaigns/${address}`)
        } catch(error) {
            console.error ("There was an issue contributing to this campaign: ", error);
            setErrorMessage(error.message);
        }

        setLoading(false);
        setValue("");
    }

    return (
        <Form onSubmit={handleSubmit} error={!! errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                value={value}
                onChange={(event)=> setValue(event.target.value)}
                label ="ether" 
                labelPosition='right'
                />
            </Form.Field>
            <Message error header ="Oops!" content={errorMessage}/>
            <Button primary loading={loading}>
                Contribute! 
            </Button>
        </Form>
    )

}

export default ContributeForm;