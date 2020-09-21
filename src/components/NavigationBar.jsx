import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Logo from '../assets/images/logo-twg.svg';

function NavigationBar() {
    return (
        <Navbar fixed="top" expand="lg" variant="light" bg="light">
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src={Logo}
                        className="d-inline-block align-top"
                        alt="TWG logo"
                    />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default NavigationBar