import React, { useState, useContext } from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import Lottie from 'react-lottie';
import * as animation from '../animations/register.json';
import { useHistory } from 'react-router-dom';

import { UserContext, signIn } from '../context/UserContext';


const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};
const Register = () => {

    // Form Handling
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [passwordError, setPasswordError] = useState({});

    const submitForm = (e) => {
        e.preventDefault();
        const formValidated = validateForm();

        if (formValidated) {
            // Network Operations
            registerUser();
        }
    }


    const validateForm = () => {
        const nameError = {};
        const emailError = {};
        const passwordError = {};
        let validated = true;

        if (name.trim().length < 1 || name.trim().length > 20 || name.match(/\d/)) {
            nameError.invalid = "Your name does not meet our guidelines"
            validated = false;
        }

        if (password.trim().length < 5) {
            passwordError.lengthError = "Password must be longer than 5 characters"
            validated = false;
        }

        if (email.trim().length === 0) {
            emailError.validEmail = "Please enter a valid email"
            validated = false;
        }

        setNameError(nameError);
        setEmailError(emailError);
        setPasswordError(passwordError)

        return validated;
    }

    const url = "http://localhost:8000/api/register"
    const history = useHistory();
    const authContext = useContext(UserContext);

    function registerUser() {

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                "name": name,
                "email": email,
                "password": password
            })
        }).then(response => response.json())
            .then(
                (responseBody) => {
                    const token = responseBody["data"]["api_token"];
                    delete responseBody["data"]["api_token"];

                    authContext.dispatch({
                        type: signIn,
                        payload: {
                            token: token,
                            user: responseBody["data"]
                        }
                    })
                    // Required for profile
                    localStorage.setItem("name", responseBody["data"]["name"]);
                    localStorage.setItem("email", responseBody["data"]["email"]);
                    localStorage.setItem("created", responseBody["data"]["created_at"]);
                    history.push(`/`);
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    return (
        <div style={{ height: "100vh", marginBottom: 220 }}>
            <div style={{
                height: "60vh", backgroundColor: "#cf009e"
            }}></div>
            <Card className="loginCard">
                <Lottie options={config}
                    style={{ marginBottom: 30 }}
                    height={210}
                    width={280} />
                <Form onSubmit={submitForm} id="loginForm">
                    <Form.Group controlId="formBasicText">
                        <Form.Control
                            className="formField"
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        {Object.keys(nameError).map((key) => {
                            return <div key={key} className="formError">{nameError[key]}</div>
                        })}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                            className="formField"
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                        {Object.keys(emailError).map((key) => {
                            return <div key={key} className="formError">{emailError[key]}</div>
                        })}
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control
                            className="formField"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }} />
                        {Object.keys(passwordError).map((key) => {
                            return <div key={key} className="formError">{passwordError[key]}</div>
                        })}
                    </Form.Group>
                    <Button className="registerBtn" variant="primary" type="submit">
                        Register
                </Button>
                </Form>
            </Card>
        </div>
    );
}




export default Register;
