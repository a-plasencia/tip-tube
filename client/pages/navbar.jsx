import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import React from 'react';

export default class NavbarScreen extends React.Component {
  render() {
    return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Final P</Navbar.Brand>
        <Navbar.Text className="justify-content-end text-white">{this.props.navbarText}</Navbar.Text>
      </Container>
    </Navbar>
    );
  }
}
