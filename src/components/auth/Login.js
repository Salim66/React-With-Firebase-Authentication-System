import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, Button, Card, CloseButton, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { app } from '../../firebase';

const Login = ({ setAuthCheck }) => {

    const auth = getAuth(app);

    const [log, setLog] = useState({
        email : '',
        password : ''
    });

    const navigate = useNavigate();

    const [alert, setAlert] = useState({
        msg : '',
        type: 'danger',
        status : false
    }); 

    const handleAlertClose = () => {
        setAlert({
            msg : '',
            type: 'danger',
            status : false
        });
    }


    // Login Form Submit Handler
    let handleLoginForm = (e) => {
        e.preventDefault();
        
        if(log.email === '' || log.password === ''){

            setAlert({
                msg : 'All fields are required!',
                type: 'danger',
                status : true
            });

        }else {

            signInWithEmailAndPassword(auth, log.email, log.password).then(userCredential => {

                sessionStorage.setItem('auth', JSON.stringify(true));
                setAuthCheck(true);
                navigate('/profile');

            }).catch(error => {
                setAlert({
                    msg : 'Login Faield!',
                    type: 'danger',
                    status : true
                });
            });

        }

    }


  return (
    <>
        <Container className='my-5'>
            <Row className='justify-content-center'>
                <Col md={5}>
                    <Card>
                        <Card.Header>Login Your Account</Card.Header>
                        { alert.status && <Alert variant={alert.type} className='d-flex justify-content-between'>{alert.msg} <CloseButton onClick={handleAlertClose}></CloseButton></Alert> }
                        <Card.Body>
                            <Form onSubmit={ handleLoginForm }>
                                <div className='my-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' value={log.email} onChange={ e => setLog({ ...log, email : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' value={log.password} onChange={ e => setLog({ ...log, password : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Button type='submit'>Log In</Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Link to='/register'>Create an account</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
};

export default Login;