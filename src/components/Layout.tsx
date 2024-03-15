import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="">Home</Nav.Link>
                <Nav.Link as={Link} to="alldevelopers">All Developers</Nav.Link>
                <Nav.Link as={Link} to="addnewdeveloper">Add New Developer</Nav.Link>
                <Nav.Link as={Link} to="showskills">Show Skills</Nav.Link>
                <Nav.Link as={Link} to="addskill">Add Skill</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
