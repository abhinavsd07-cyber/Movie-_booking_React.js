import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const NavbarMenu = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          🎬 Movie Booking
        </Typography>

        <Button color="inherit"className="fs-5" component={Link} to="/">
          Home
        </Button>

        <Button color="inherit" component={Link} to="/tickets">
          My Tickets
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarMenu;
