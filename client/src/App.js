import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./components/Home/Home";
import NavBar from "./components/Navbar/Navbar";
import Donate from "./components/Donate/Donate";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import Web3 from "web3";
import { utils } from "ethers";
import CrowdFunding from "./contracts/CrowdFunding.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: undefined,
      account: "",
      crowdfunding: null,
      crowdfundingAddress: null,
      balance: 0,
    };
  }

  loadBlockchainData = async (dispatch) => {
    if (typeof window.ethereum != undefined) {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const netId = await web3.eth.net.getId();
      // console.log(web3, netId);
      const accounts = await web3.eth.getAccounts();
      const balance = await web3.eth.getBalance(accounts[0]);
      // console.log(balance);
      this.setState({
        web3: web3,
        account: accounts[0],
        balance: parseFloat(utils.formatEther(balance)),
      });

      // load contracts

      try {
        const CrowdFundingContract = new web3.eth.Contract(
          CrowdFunding.abi,
          CrowdFunding.networks[netId].address
        );
        const CrowdFundingContractAddress =
          CrowdFunding.networks[netId].address;
        // console.log(CrowdFundingContract, CrowdFundingContractAddress);
        this.setState({
          crowdfunding: CrowdFundingContract,
          crowdfundingAddress: CrowdFundingContractAddress,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      window.alert("pls install metamask!");
    }
  };

  componentDidMount = async () => {
    await this.loadBlockchainData(this.props.dispatch);
  };

  render() {
    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload();
    });
    return (
      <React.Fragment>
        <Router>
          <NavBar account={this.state.account} balance={this.state.balance} />
          <Routes>
            <Route
              path="/find"
              element={
                <Donate
                  account={this.state.account}
                  balance={this.state.balance}
                  contract={this.state.crowdfunding}
                  loadBlockchainData={this.loadBlockchainData}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  account={this.state.account}
                  balance={this.state.balance}
                  contract={this.state.crowdfunding}
                  loadBlockchainData={this.loadBlockchainData}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  account={this.state.account}
                  balance={this.state.balance}
                  contract={this.state.crowdfunding}
                  loadBlockchainData={this.loadBlockchainData}
                />
              }
            />
            <Route
              path="/"
              element={
                <Home
                  account={this.state.account}
                  balance={this.state.balance}
                  loadBlockchainData={this.loadBlockchainData}
                />
              }
            />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
