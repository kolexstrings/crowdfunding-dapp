import React,{ useState } from 'react';
import Layout from '../../../components/Layout';
import web3 from '../../../ethereum/web3';
import Campaign from '../../../ethereum/campaign';
import {Form, Button, Message, Input} from 'semantic-ui-react';


const RequestNew = ({address}) => {
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");


    return (
        <Layout>
            <h3>Create a Request</h3>
            <Form>
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
                <Button primary>Create!</Button>
            </Form>
        </Layout>
        
    );
}

export default RequestNew;

RequestNew.getInitialProps = async(props) => {
    const address = props.query.address
    return {address}
    
}
