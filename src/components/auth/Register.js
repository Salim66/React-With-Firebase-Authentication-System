import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { Button, Card, CloseButton, Col, Container, Form, Row, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { app } from '../../firebase';

const Register = () => {


    // GetAuth
    const auth = getAuth(app);

    const [res, setRes] = useState({
        email : '',
        password : ''
    });

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

    const handleRegisterForm = (e) => {
        e.preventDefault();
        
        if(res.email === '' || res.password === ''){
            setAlert({
                msg : 'All fields are required!',
                type: 'danger',
                status : true
            });
        }else {

            createUserWithEmailAndPassword(auth, res.email, res.password).then(useCredential => {

                setAlert({
                    msg : 'User Create Successfully ): ',
                    type: 'success',
                    status : true
                });

                setRes({
                    email : '',
                    password : ''
                });

            }).catch(useCredential => {

                setAlert({
                    msg : 'Registation Faield!',
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
                        <Card.Header>Create an account</Card.Header>
                        { alert.status && <Alert variant={alert.type} className='d-flex justify-content-between'>{alert.msg} <CloseButton onClick={handleAlertClose}></CloseButton></Alert> }
                        <Card.Body>
                            <Form onSubmit={handleRegisterForm}>
                                <div className='my-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type='email' value={res.email} onChange={ e => setRes({ ...res, email : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type='password' value={res.password} onChange={ e => setRes({ ...res, password : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Button type='submit'>Create</Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer>
                            <Link to='/'>Login you account</Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
};

export default Register;