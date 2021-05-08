import { useMutation } from '@apollo/client';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import { signupData, UserContext } from '../context/auth';
import { createUserMutation } from '../graphql/Mutations';

function SignUp(props) {

    const { setUserData } = useContext(UserContext);
    const [error, setError] = useState(null);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [sex, setSex] = useState('');
    const [password, setPassword] = useState('');

    const [createUser, { data }] = useMutation(createUserMutation);

    const signup = async (e) => {
        e.preventDefault();
        try {
            await createUser({
                variables: {
                    firstName: firstname,
                    lastName: lastname,
                    username: username,
                    email: email,
                    sex: sex,
                    password: password,
                }
            })
        } catch (err) {
            setError(err.message)
        }
    }

    useEffect(() => {
        if(data){
            signupData(data, setUserData);
            setError(null);
            props.history.push("/")
        }
        
    }, [data])

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large'>
                    <Segment stacked>
                        {error && <div className="error">{error}</div>}
                        <Form.Input 
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Firstname'
                            onChange = { (e) => setFirstname(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Lastname'
                            onChange = { (e) => setLastname(e.target.value)}
                        />
                        <Form.Input 
                            fluid 
                            icon='user' 
                            iconPosition='left' 
                            placeholder='Username'
                            onChange = { (e) => setUsername(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='email'
                            onChange = { (e) => setEmail(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='sex'
                            onChange = { (e) => setSex(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange = { (e) => setPassword(e.target.value)}
                        />
                        <Button color='teal' fluid size='large' onClick={signup}>
                            Sign Up
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/login">Login</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default SignUp
