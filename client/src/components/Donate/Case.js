import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { TextField } from "@mui/material";
import LinearProgressWithLabel from "./ProgressBar";
import * as web3Utils from "web3-utils";

export default class Case extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      donationValue: 0,
    };
  }

  handleDonationToCase = async () => {
    let { account, contract, caseObj } = this.props;
    let fund = String(this.state.donationValue);
    // converting to wei
    await contract.methods.fundCase(caseObj.id).send({
      from: account,
      value: web3Utils.toWei(fund, "ether"),
    });
  };

  handleDonationFundChange = (e) => {
    let nowFund = Number(e.target.value);
    this.setState({
      donationValue: nowFund,
    });
  };

  render() {
    let { index, caseObj } = this.props;
    let {name,description,moneyReceived,targetFund} = caseObj;
    moneyReceived = web3Utils.fromWei(String(moneyReceived),"ether");
    targetFund = web3Utils.fromWei(String(targetFund),"ether");
    return (
      <Box sx={{ width: 275, minHeight: "375px",margin:5 }} key={index}>
        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Typography textAlign="center">{name}</Typography>
              <Typography>{description}</Typography>
              <Typography textAlign="center">
                {moneyReceived}/{targetFund} collected
              </Typography>
              <LinearProgressWithLabel
                value={
                  (Number(moneyReceived) / Number(targetFund))*100
                }
              />
            </CardContent>
            {this.props.showDonate && (
              <CardActions align="center">
                <div>
                  <TextField
                    label="Donate"
                    variant="outlined"
                    type="number"
                    inputProps={{ min: 0 }}
                    placeholder="in ether"
                    size="small"
                    style={{ margin: "20px" }}
                    onChange={this.handleDonationFundChange}
                  />
                </div>
                <Button
                  variant="contained"
                  size="small"
                  onClick={this.handleDonationToCase}
                >
                  Donate
                </Button>
              </CardActions>
            )}
          </React.Fragment>
        </Card>
      </Box>
    );
  }
}
