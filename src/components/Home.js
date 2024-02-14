// Home.js
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Home = () => {
    const history = useNavigate();
    const [inpval, setInpval] = useState({
        name: '',
        email: '',
        date: '',
        password: '',
    });

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const addData = async (e) => {
        e.preventDefault();

        const { name, email, date, password } = inpval;

        if (name === '' || email === '' || date === '' || password === '') {
            toast.error('All fields are required!', {
                position: 'top-center',
            });
        } else {
            try {
                const response = await fetch('http://localhost:5000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inpval),
                });


                const data = await response.json();

                if (response.status === 201) {
                    console.log('User registered successfully');
                    toast.success('User registered successfully', {
                        position: 'top-center',
                    });
                    history('/login');
                } else {
                    console.error(data.error);
                    toast.error('Internal Server Error', {
                        position: 'top-center',
                    });
                }
            } catch (error) {
                console.error(error);
                toast.error('Error connecting to the server', {
                    position: 'top-center',
                });
            }
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className="d-flex justify-content-between">
                    <div className="left_data mt-3 p-3" style={{ width: '100%' }}>
                        <h3 className="text-center col-lg-6">Sign Up</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    name="name"
                                    onChange={getdata}
                                    placeholder="Enter Your Name"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={getdata}
                                    placeholder="Enter email"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control onChange={getdata} name="date" type="date" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={getdata}
                                    placeholder="Password"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                className="col-lg-6"
                                onClick={addData}
                                style={{ background: '#9EA5EA ' }}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                        <p className="mt-3">
                            Already Have an Account{' '}
                            <span>
                                <NavLink to="/login">SignIn</NavLink>
                            </span>{' '}
                        </p>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    );
};

export default Home;
