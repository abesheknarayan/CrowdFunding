import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import "./Profile.css";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOwner: false,
      newOwnerAddress: "",
    };
  }

  componentDidMount = async () => {
    if (this.props.contract !== null) {
      await this.checkIfContractOwner();
    } else {
      await this.props.loadBlockchainData();
      await this.checkIfContractOwner();
    }
  };

  checkIfContractOwner = async () => {
    let { contract, account } = this.props;
    console.log(contract, account);
    let contractOwner = await this.props.contract.methods
      .getContractOwner()
      .call({ from: this.props.account });
    this.setState({ isOwner: contractOwner === this.props.account });
  };

  transferOwner = async () => {
    let {contract,account} = this.props;
    await contract.methods.transferOwnership(this.state.newOwnerAddress).call({
      from: account
    })
  };

  handleAddressChange = (e) => {
    let newAddress = e.target.value;
    this.setState({ newOwnerAddress: newAddress });
  };

  render() {
    return (
      <div>
        <Container>
          <Box
            sx={{ height: "50vh" }}
            style={{
              marginTop: "90px",
              borderStyle: "solid",
              borderWidth: "1px",
              borderRadius: "10px",
              borderColor: "#1976d2",
            }}
            textAlign="center"
          >
            <Typography
              className="profileData"
              style={{ fontFamily: "Pacifico,cursive" }}
              variant="h4"
            >
              Account
            </Typography>
            <Typography
              className="profileData"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {this.props.account}
            </Typography>
            <Typography
              className="profileData"
              variant="h4"
              style={{ fontFamily: "Pacifico,cursive" }}
            >
              Balance
            </Typography>
            <Typography
              className="profileData"
              style={{ fontFamily: "Outfit, sans-serif" }}
            >
              {this.props.balance} Ether
            </Typography>
          </Box>
        </Container>
      </div>
    );
  }
}
