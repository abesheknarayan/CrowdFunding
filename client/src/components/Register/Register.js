import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Register.css";
import { Button, Typography } from "@mui/material";
import * as web3Utils from 'web3-utils'

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: undefined,
        desc: undefined,
        fund: 0
    }
  }

  handleNameChange = (e) => {
      let name = e.target.value;
      this.setState({name:name});
  }

  handleDescChange = (e) => {
      let desc = e.target.value;
      this.setState({desc:desc})
  }

  handleFundChange = (e) => {
      let fund = e.target.value;
      this.setState({fund:fund})
  }

  registerCase = async() => {
      let {name,desc,fund} = this.state;
      await this.props.contract.methods.registerCase(
          name,desc,web3Utils.toWei(String(fund),"ether")
      ).send({
          from:this.props.account,
          value: web3Utils.toWei("2","ether")
      })
  }

  render() {
    return (
      <div>
        <Box component="form" noValidate autoComplete="off" textAlign="center">
          <Typography style={{ fontFamily: "Pacifico,cursive",marginTop:'30px' }} variant ="h3"> Register a case!</Typography>
          <div>
            <TextField
              label="Case Name"
              variant="outlined"
              style={{ marginTop: "40px" }}
              onKeyUp={this.handleNameChange}
            />
          </div>
          <div>
            <TextField
              label="Case Description"
              multiline
              variant="outlined"
              style={{ margin: "20px" }}
              onKeyUp={this.handleDescChange}

            />
          </div>
          <div>
            <TextField
              label="Fund Required"
              variant="outlined"
              type="number"
              inputProps={{min:0}}
              placeholder="in ether"
              style={{ margin: "20px" }}
              onKeyUp={this.handleFundChange}
            />
          </div>
          <div>
              <Typography style={{color:"black",opacity:'0.5',margin:'20px',fontFamily:"Prompt, sans-serif"}} >
                  *2 ethers will be deducted from ur account for case registration
              </Typography>
          </div>
          <Button variant="contained" onClick={this.registerCase}>
              Register
          </Button>
        </Box>
      </div>
    );
  }
}
