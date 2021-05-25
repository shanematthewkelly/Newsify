import React from 'react';
import { Button, Container } from 'react-bootstrap';
import Lottie from 'react-lottie';
import * as animation from '../animations/logout.json'
import { useHistory } from 'react-router-dom';

const config = {
    loop: true,
    autoplay: true,
    animationData: animation.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Logout = () => {

    const history = useHistory();

    const revokeTokenAndRedirect = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        localStorage.removeItem("created");
        let path = `/login`;
        history.push(path);
    }

    return (
        <Container className="logoutCont">
            <div>
                <Lottie options={config}
                    style={{ marginBottom: 30 }}
                    height={210}
                    width={210} />
                <h3 className="logoutText">Are you sure you want to log out?</h3>
                <Button
                    className="logoutBtn"
                    variant="primary"
                    onClick={revokeTokenAndRedirect}>
                    Logout
                </Button>
            </div>
        </Container >
    );

}


export default Logout;
