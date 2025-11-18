import React, { useState } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavbarComp = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/?q=${encodeURIComponent(query.trim())}`);
    else navigate("/");
  };

  return (
    <Navbar  expand="lg" sticky="top" style={{backgroundColor:"black"}}>
      <Container>
        <Navbar.Brand as={Link} to="/"><img src="https://play-lh.googleusercontent.com/TB_8RMvDjxGmx06LBK-8opRFJ0msb6hSZalEtOMBmxgJ4jYE_i0BmdRuMWChCE76tLnxoytZ75Cew_r0_JDd" alt="" style={{height:"50px"}} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="fs-5 text-light">Home</Nav.Link>
            <Nav.Link as={Link} to="/tickets" className="fs-5 text-light">Tickets</Nav.Link>
          </Nav>

          <Form className="d-flex" onSubmit={onSearch}>
            <FormControl
              type="search"
              placeholder="Search movies..."
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ width: 300 }}
            />
            <Button className="btn btn-danger" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
