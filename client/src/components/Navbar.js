import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import AppLogo from '../images/logo.png';

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const AppNavbar = () => {

  const authContext = useContext(UserContext);

  return (
    <Navbar className="navcustom" expand="lg" fixed="top">
      <Navbar.Brand href="/"><img alt="logo" id="appLogo" src={AppLogo} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav.Item className="ml-auto">
          <Nav.Link href="/"><h6 className="linkText">Home</h6></Nav.Link>
        </Nav.Item>
        {!authContext.authState.auth &&
          <Nav.Item>
            <Nav.Link href="/login"><h6 className="linkText">Login</h6></Nav.Link>
          </Nav.Item>
        }
        {!authContext.authState.auth &&
          <Nav.Item>
            <Nav.Link href="/register"><h6 className="linkText">Register</h6></Nav.Link>
          </Nav.Item>
        }
        {authContext.authState.auth &&
          <Nav.Item>
            <Nav.Link styles="color: #fff" href="/account"><h6 className="linkText">Profile</h6></Nav.Link>
          </Nav.Item>
        }
        {authContext.authState.auth &&
          <Nav.Item>
            <Nav.Link styles="color: #fff" href="/logout"><h6 className="linkText">Logout</h6></Nav.Link>
          </Nav.Item>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}




export default AppNavbar;
