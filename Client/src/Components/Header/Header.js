import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
function Header() {
  const handleSubmit=(e)=>{
      e.preventDefault();
      
  localStorage.clear()
  window.location.reload();

    }

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
          <button type="submit" onClick={(e) => { if (window.confirm('Do You Want to Logout?')) { handleSubmit(e) }; }} className="w-25 btn btn-lg btn-secondary" >Logout</button>
        </Navbar>

      </Container>
    </div>
  );
}

export default Header;
