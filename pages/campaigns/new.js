import React, { useState } from 'react';
import Layout from '../../components/Layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

const CampaignNew = () => {

    const [minimumContribution, setMinimumContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false)

    const handleInput = (event) => {
        setMinimumContribution(event.target.value);
    }

const handleSubmit = async (event) => {
        event.preventDefault();

        setErrorMessage(''); //helps to ensure that when the button is clicked it cleans out previous error and starts on a clean sheet
        setLoading(true); //starts loading spinners immediately button is clicked and goes ahead to call the functions

        try {
            const accounts = await web3.eth.getAccounts();
            await  factory.methods.createCampaign(minimumContribution).send({
                from: accounts[0]
            });
        } catch (error) {
            setErrorMessage(error.message);
        }

        setLoading(false); //Stops button spinner when the fucntion calls are completed, either successfully or with an error
        
        Router.pushRoute('/');
    };



    return (
        <Layout>
            <div>
                <h3>Create a Campaign</h3>
                

                <Form onSubmit={handleSubmit} error={!!errorMessage}>
                    <Form.Field >
                    <label>Minimum Contribution</label>
                    <Input 
                    type='number'
                    label='wei'
                    labelPosition='right'
                    placeholder='0.00'
                    value={minimumContribution}
                    onChange={handleInput}
                    />
                    </Form.Field>

                    <Message error header='Oops !' content={errorMessage} />
                    <Button type='submit' primary loading={loading}>Create</Button>
                </Form>
           

            
            </div>
        </Layout>
    );
};

export default CampaignNew;