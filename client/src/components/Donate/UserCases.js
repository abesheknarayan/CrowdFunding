import React from "react";
import Case from "./Case";

export default class UserCases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.contract !== null) {
      await this.loadUserCases();
    } else {
      await this.props.loadBlockchainData();
      await this.loadUserCases();
    }
  };

  loadUserCases = async () => {
    let { contract, account } = this.props;
    let result = await contract.methods.getAllUserCases().call({
      from: account,
    });
    console.log(result);
    this.setState({
      cases: result,
    });
  };

  handleDonationToCase = async () => {};

  render() {
    let { account, contract } = this.props;
    let { cases } = this.state;
    let caseUI = cases.map((fundcase, i) => {
      return (
        <Case
          caseObj={fundcase}
          index={i}
          key={i}
          account={account}
          showDonate={false}
          contract={contract}
        />
      );
    });
    return (
      <div style={{ display: "inline-flex" }}>
        {caseUI.length ? caseUI : <div>You haven't created any cases yet!</div>}
      </div>
    );
  }
}
