import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {


  return (

    <div>
      <Container>
        <h1>Personal Book Keeping</h1>

        <Navbar expand="lg" className="bg-body-tertiary">
          
          <Container>
            <Navbar.Brand href="/">Home</Navbar.Brand>
          </Container>
          <Container>
            <Navbar.Brand href="/create">ADD</Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
