import React from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Profile = ({ setAuthCheck }) => {

    const navigate = useNavigate();

    const handleUserLogout = (e) => {

        e.preventDefault();
        sessionStorage.removeItem('auth');
        setAuthCheck(false);
        navigate('/');

    }

  return (
    <>
        <Container className='my-5'>
            <Row className='justify-content-center'>
                <Col md={5}>
                    <Card>
                        <img src='https://static.remove.bg/remove-bg-web/3a4699427405e2861e1fd6aabd6280baee37b558/assets/start-1abfb4fe2980eabfbbaaa4365a0692539f7cd2725f324f904565a9a744f8e214.jpg' />
                        <Card.Body>
                            <div className='profile-dec'>
                                <h2>Salim Hasan Riad</h2>
                                <h6>salimhasanriad@gmail.com</h6>
                                <a onClick={ handleUserLogout } href='#'>Logout</a>
                            </div>
                        </Card.Body>
                        <Card.Footer>
                            <Link to='/students'>Add Students</Link>
                        </Card.Footer>
                    </Card>                    
                </Col>
            </Row>
        </Container>
    </>
  )
};

export default Profile;