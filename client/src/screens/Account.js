import React from 'react';
import { Card, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';

const Account = () => {

    let username = localStorage.getItem("name");
    let email = localStorage.getItem("email");
    let created = localStorage.getItem("created");

    return (
        <div style={{ marginTop: 180 }}>
            <h1 style={{ marginLeft: 118, marginBottom: 30 }}>Account Information</h1>
            <Card id="accountCard">
                <Row>
                    <Button
                        className="userNameIcon"
                        variant="primary">
                        <div style={{ fontSize: 13 }}>
                            <FontAwesomeIcon style={{ color: "#fff" }} icon={faUserAlt} />
                        </div>
                    </Button>
                    <div style={{ margin: 'auto 0', marginLeft: 20 }}>
                        <h4 className="profileFieldText">{username}</h4>
                    </div>
                </Row>
            </Card>
            <Card id="accountCard">
                <Row>
                    <Button
                        className="userNameIcon"
                        variant="primary">
                        <div style={{ fontSize: 13 }}>
                            <FontAwesomeIcon style={{ color: "#fff" }} icon={faEnvelope} />
                        </div>
                    </Button>
                    <div style={{ margin: 'auto 0', marginLeft: 20 }}>
                        <h4 className="profileFieldText">{email}</h4>
                    </div>
                </Row>
            </Card>
            <Card id="accountCard">
                <Row>
                    <Button
                        className="userNameIcon"
                        variant="primary">
                        <div style={{ fontSize: 13 }}>
                            <FontAwesomeIcon style={{ color: "#fff" }} icon={faClock} />
                        </div>
                    </Button>
                    <div style={{ margin: 'auto 0', marginLeft: 20 }}>
                        <h4 className="profileFieldText">{(new Date(created)).toDateString()}</h4>
                    </div>
                </Row>
            </Card>
        </div>
    )
}

export default Account;