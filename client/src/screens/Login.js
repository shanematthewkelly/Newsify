import React, { useState, useContext } from 'react';
import { Form, Button, Card, Modal } from 'react-bootstrap'
import Lottie from 'react-lottie';
import * as animation from '../animations/login.json'
import { useHistory } from 'react-router-dom'

import { UserContext, signIn } from '../context/UserContext';



const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState({});
    const [passwordError, setPasswordError] = useState({});

    // Form Handling
    const submitForm = (e) => {
        e.preventDefault();
        const formValidated = validateForm();

        if (formValidated) {
            UserLoggedIn();
        }
    }

    const validateForm = () => {
        const emailError = {};
        const passwordError = {};
        let validated = true;

        if (password.trim().length < 5) {
            passwordError.lengthError = "Password must be longer than 5 characters"
            validated = false;
        }

        if (email.trim().length === 0) {
            emailError.validEmail = "Please enter a valid email"
            validated = false;
        }

        setEmailError(emailError);
        setPasswordError(passwordError)

        return validated;
    }

    const url = "http://localhost:8000/api/login"
    const history = useHistory();
    const authContext = useContext(UserContext);


    function UserLoggedIn() {

        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
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
            ).catch(function (error) {
                return alert("The login details you entered are incorrect")
            });
    }

    return (
        <div style={{ height: "100vh", marginBottom: 120 }}>
            <div style={{
                height: "60vh", backgroundColor: "#0617d4"
            }}></div>
            <Card className="loginCard">
                <Lottie options={config}
                    style={{ marginBottom: 30 }}
                    height={210}
                    width={210} />
                <Form onSubmit={submitForm} id="loginForm">
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
                    <Button className="loginBtn" variant="primary" type="submit">
                        Login
                </Button>
                </Form>
            </Card>
        </div>
    );

}

export default Login;
