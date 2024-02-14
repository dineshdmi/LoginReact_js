// Login.js
import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Login = () => {
    const history = useNavigate();
    const [inpval, setInpval] = useState({
        email: '',
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

        const getuserArr = localStorage.getItem('useryoutube');

        const { email, password } = inpval;
        if (email === '') {
            toast.error('Email field is required', {
                position: 'top-center',
            });
        } else if (!email.includes('@')) {
            toast.error('Please enter a valid email address', {
                position: 'top-center',
            });
        } else if (password === '') {
            toast.error('Password field is required', {
                position: 'top-center',
            });
        } else if (password.length < 5) {
            toast.error('Password length must be greater than five', {
                position: 'top-center',
            });
        } else {
            if (getuserArr && getuserArr.length) {
                const userdata = JSON.parse(getuserArr);
                const userlogin = userdata.filter((el, k) => {
                    return el.email === email && el.password === password;
                });

                if (userlogin.length === 0) {
                    alert('Invalid details');
                } else {
                    console.log('User login successfully');
                    localStorage.setItem('user_login', JSON.stringify(userlogin));
                    history('/details');
                }
            }
        }
    };

    return (
        <>
            <div className="container mt-3">
                <section className="d-flex justify-content-between">
                    <div className="left_data mt-3 p-3" style={{ width: '100%' }}>
                        <h3 className="text-center col-lg-6">Sign In</h3>
                        <Form>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Control
                                    type="email"
                                    name="email"
                                    onChange={getdata}
                                    placeholder="Enter email"
                                />
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
                            Already Have an Account <span>SignIn</span>{' '}
                        </p>
                    </div>
                </section>
                <ToastContainer />
            </div>
        </>
    );
};

export default Login;
