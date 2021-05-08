import { useMutation } from '@apollo/client';
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Message, Segment } from 'semantic-ui-react'
import { loginMutation } from '../graphql/Mutations';
import { loginData, UserContext } from '../context/auth'

function Login(props) {

    const { setUserData } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const [loginUser, { data }] = useMutation(loginMutation)

    const login = async (e) => {
        e.preventDefault();
        try {
            await loginUser({
                variables: {
                    email: email,
                    password: password,
                },
            })
        } catch (err) {
            setError(err.message)
        }
        
        
    }

    useEffect(() => {
        if(data){
            loginData(data, setUserData);
            setError(null);
            props.history.push('/')

        }
    }, [data])

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large'>
                    <Segment stacked>
                        {error && <div className="error">{error}</div>}
                        <Form.Input 
                            fluid icon='user' 
                            iconPosition='left' 
                            placeholder='E-mail address' 
                            onChange = { (e) => setEmail(e.target.value)}
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            onChange = { (e) => setPassword(e.target.value)}
                        />
                        <Button color='teal' fluid size='large' onClick={login}>
                            Login
                        </Button>
                    </Segment>
                </Form>
                <Message>
                    New to us? <Link to="/signup">Sign Up</Link>
                </Message>
            </Grid.Column>
        </Grid>
    )
}

export default Login
