import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { Form, FormControl } from "react-bootstrap";
import { useState } from "react";

const NavbarMenu = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  // Handle submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      navigate(`/search/${query}`);
    }
  };

  return (
    <AppBar position="static" style={{backgroundColor:"black", color:"white"}} className="p-1">
      <Toolbar className="d-flex justify-content-between">

        <div className="d-flex">
            {/* Brand / Logo */}
            <img src="https://play-lh.googleusercontent.com/TB_8RMvDjxGmx06LBK-8opRFJ0msb6hSZalEtOMBmxgJ4jYE_i0BmdRuMWChCE76tLnxoytZ75Cew_r0_JDd" alt=""  style={{height:"80px"}} className="rounded rounded-2 m-3"/>
            {/* 🔍 React-Bootstrap Search Bar */}
            <Form className="d-flex me-3 align-items-center" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search movies..."
                className="ms-5"
                style={{ width: "600px", height:"50px"}}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form>
        </div>

        <div>
            {/* Nav Links */}
            <Button color="inherit" component={Link} to="/" className="  me-5">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/tickets"className="  me-5">
              My Tickets
            </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarMenu;
