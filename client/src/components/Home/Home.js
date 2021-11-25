import React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import logo from "./donate.jpg";

export default class Home extends React.Component {
  render() {
    return (
      <Box
        sx={{ width: 700, margin: "auto", marginTop: 10 }}
        textAlign="center"
      >
        <img
          style={{ maxWidth: 600, maxHeight: 500 }}
          alt="donation logo"
          src={logo}
        ></img>
        <Typography
          style={{ fontFamily: "Outfit,sans-serif", marginTop: "30px" }}
          variant="h4"
        >
          The value of life is not in its duration, but in its donation. You are
          not important because of how long you live, you are important because
          of how effective you live.
        </Typography>
      </Box>
    );
  }
}
