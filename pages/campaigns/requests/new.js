import React,{ useState } from 'react';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import { Router, Link } from '../../../routes';


const RequestNew = ({address}) => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit (event) {
        event.preventDefault();

        const campaign = Campaign(address);
        
        setLoading(true);
        setErrorMessage("");

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({
                from: accounts[0]
            });

            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (error) {
            console.error("There was an issue create a new request: ", error);
            setErrorMessage(error.message);
        }

        setLoading(false);

    } 


    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>
                  Back
                </a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={handleSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                    value={description}
                    onChange={(event)=> setDescription(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Value in ether</label>
                    <Input 
                    value={value}
                    onChange={(event)=> setValue(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                    value={recipient}
                    onChange={(event)=> setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header ="Oops" content={errorMessage}/>
                <Button loading={loading}  primary>Create!</Button>
            </Form>
        </Layout>
        
    );
}

export default RequestNew;

RequestNew.getInitialProps = async(props) => {
    const address = props.query.address
    return {address}
    
}
