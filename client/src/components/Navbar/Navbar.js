import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';


import "./Navbar.css";

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="navbar">
          <Toolbar>
            <Button color="inherit">
              <Link className="link" to="/">
                Home
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="link" to="/find">
                Find
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="link" to="/register">
                Register
              </Link>
            </Button>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button color="inherit" id="profileBtn">
              <Link className="link" to="/profile">
                Profile
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
