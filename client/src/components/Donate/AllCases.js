import React from "react";
import Case from "./Case";

export default class AllCases extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
    };
  }

  componentDidMount = async () => {
    if (this.props.contract !== null) {
      await this.loadAllCases();
    } else {
      await this.props.loadBlockchainData();
      await this.loadAllCases();
    }
  };

  loadAllCases = async () => {
    let { contract, account } = this.props;
    let result = await contract.methods.getAllUnfinishedCases().call({
      from: account,
    });
    this.setState({
      cases: result,
    });
  };

  render() {
    let { account, contract } = this.props;
    let { cases } = this.state;
    let caseUI = cases.map((fundcase, i) => {
      return (
        <Case
          caseObj={fundcase}
          index={i}
          key={i}
          showDonate={true}
          account={account}
          contract={contract}
        />
      );
    });
    return (
      <div style={{ display: "inline-flex" }}>
        {caseUI.length ? caseUI : <div>No cases yet!</div>}
      </div>
    );
  }
}
