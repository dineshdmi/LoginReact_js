import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Details = () => {
    const [logindata, setLoginData] = useState([]);
    const [show, setShow] = useState(false);
    const history = useNavigate();
    const todayDate = new Date().toISOString().slice(0, 10);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // eslint-disable-next-line
    const Birthday = () => {
        const getuser = localStorage.getItem("user_login");

        if (getuser) {
            const user = JSON.parse(getuser);
            setLoginData(user);

            // Check if the user has a matching date
            if (user && user.date === todayDate) {
                setTimeout(() => {
                    console.log("ok");
                    handleShow();
                }, 3000);
            }
        }
    };


    const userlogout = () => {
        localStorage.removeItem("user_login");
        history("/");
    };

    useEffect(() => {
        Birthday();
    }, []);

    return (
        <>
            {logindata.length === 0 ? (
                "error"
            ) : (
                <>
                    <h1>Details page</h1>
                    <h1>{logindata[0].name}</h1>
                    <Button onClick={userlogout}>LogOut</Button>

                    {logindata[0].date === todayDate ? (
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{logindata[0].name} 😄</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Wish you many happy returns of the day! 🍰</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={handleClose}>
                                    Save Changes
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    ) : (
                        ""
                    )}
                </>
            )}
        </>
    );
};

export default Details;
