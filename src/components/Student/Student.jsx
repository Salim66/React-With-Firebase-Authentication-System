import React, { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, Button, Card, CloseButton, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../../firebase';

const Student = () => {

    const db = getFirestore(app);
    const storage = getStorage(app);

    const [studentInput, setStudentInput] = useState({
        name : '',
        location  : '',
        cell  : '',
        photo  : ''
    });

    console.log(studentInput);

    // Preveiw Image State
    const [preview, setPreveiw] = useState('');

    // Get File name 
    const [file, setFile] = useState('');

    // Loading Data Load
    const [loading, setLoading] = useState(false);

    // Handle image preview
    let handleImagePreview = (e) => {
        let file = e.target.files[0];
        let imageURL = URL.createObjectURL(file);
        setPreveiw(imageURL);
        setFile(file);
    }


    const [students, setStudents] = useState([]);



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

    // submit student data 
    const handleStudentForm = async(e) => {
        e.preventDefault();

        if(studentInput.name === '' || studentInput.location === '' || studentInput.cell === ''){

            setAlert({
                msg : 'All fields are required!',
                type: 'danger',
                status : true
            });

        }else {

            let imageName = new Date().getTime() + file.name;
            const storeRef = ref(storage, 'students/' + imageName);
            const uploadImage = uploadBytesResumable(storeRef, file);

            uploadImage.on("state_change", (snapshot) => {
                setLoading(true);
            }, (error) => {

            }, () => {
                getDownloadURL(uploadImage.snapshot.ref).then(filePath => {

                       // automatically id add
                        addDoc(collection(db, "students"), {
                            name : studentInput.name,
                            location : studentInput.location,
                            cell : studentInput.cell,
                            photo : filePath
                        })

                        setLoading(false);

                })
            })

            // manual id add
            // await setDoc(doc(db, "students", '1'), {
            //     name : studentInput.name,
            //     location : studentInput.location,
            //     cell : studentInput.cell,
            //     photo : studentInput.photo
            // })

         

            setAlert({
                msg : 'Student added successfull :)',
                type: 'success',
                status : true
            });

            setStudentInput({
                name : '',
                location  : '',
                cell  : '',
                photo  : ''
            });

        }
        e.target.reset();
        setPreveiw('');

    }


    // data fetch by firestore
    useEffect(() => {

        onSnapshot(collection(db, 'students'), (data) => {

            let student_list = [];

            data.docs.forEach((col) => {
                student_list.push(col.data());
            });

            setStudents(student_list);


        })

    }, [db]);


    


  return (
    <>
        <Container className='my-5'>
            <Row className='justify-content-center'>
                <Col md={4}>
                    <Card>
                        <Card.Header>Add new student</Card.Header>
                        { alert.status && <Alert variant={alert.type} className='d-flex justify-content-between'>{alert.msg} <CloseButton onClick={handleAlertClose}></CloseButton></Alert> }
                        <Card.Body>
                            <Form onSubmit={ handleStudentForm }>
                                <div className='my-3'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' value={studentInput.name} onChange={ e => setStudentInput({ ...studentInput, name : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Form.Label>Location</Form.Label>
                                    <Form.Control type='text' value={studentInput.location} onChange={ e => setStudentInput({ ...studentInput, location : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Form.Label>Cell</Form.Label>
                                    <Form.Control type='text' value={studentInput.cell} onChange={ e => setStudentInput({ ...studentInput, cell : e.target.value }) } />
                                </div>
                                <div className='my-3'>
                                    <Form.Label>Photo</Form.Label>
                                    <Form.Control type='file' onChange={ (e) => handleImagePreview(e) } />
                                    <hr />
                                    <img style={{ maxWidth: '100%' }} src={ preview } alt="" />
                                </div>
                                <div className='my-3'>
                                    <Button type='submit'>Add new</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className='student-card'>
                        <Card.Header>All student list</Card.Header>
                        <Card.Body>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Location</th>
                                        <th>Cell</th>
                                        <th>Photo</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        students.map((data, index) => 
                                        <tr>
                                            <td>{ index + 1 }</td>
                                            <td>{ data.name }</td>
                                            <td>{ data.location }</td>
                                            <td>{ data.cell }</td>
                                            <td><img src={ data.photo } alt="" /></td>
                                            <td>
                                                <Button className='btn btn-sm btn-info'>View</Button> &nbsp;
                                                <Button className='btn btn-sm btn-warning'>Edit</Button> &nbsp;
                                                <Button className='btn btn-sm btn-danger'>Delete</Button>
                                            </td>
                                        </tr>
                                        )
                                    }

                                    {
                                        loading && <h4>Loading ....</h4>
                                    }

                                    
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>
  )
};

export default Student;