import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Header.css';

function Hospital_header() {
  return (
    <header className="hospital-header">
      <h1 className="hospital-title">Hospital Management</h1>
      <Navbar expand="lg" className="hospital-navbar">
        <Container>
          <Link to="/" className="hospital-brand">Hospital</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggle" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="hospital-nav">
              <Link to="/" className="nav-link">Patients</Link>
              <Link to="/add" className="nav-link">New Patient</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Hospital_header;