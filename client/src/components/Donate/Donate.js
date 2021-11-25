import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

import AllCases from "./AllCases";
import UserCases from "./UserCases";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default class Donate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQ: "",
      value: 0,
    };
  }

  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  handleChange = (e, val) => {
    this.setState({
      value: val,
    });
  };

  render() {
    let { contract, account } = this.props;
    return (
      <Box sx={{ width: "100%" }} textAlign="center">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            centered
            aria-label="basic tabs example"
          >
            <Tab label="All Cases" {...this.a11yProps(0)} />
            <Tab label="Your Cases" {...this.a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={this.state.value} index={0}>
          <AllCases
            contract={contract}
            account={account}
            loadBlockchainData={this.props.loadBlockchainData}
          />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <UserCases
            contract={contract}
            account={account}
            loadBlockchainData={this.props.loadBlockchainData}
          />
        </TabPanel>
      </Box>
    );
  }
}
