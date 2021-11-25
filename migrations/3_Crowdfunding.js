const CrowdFundContract = artifacts.require("CrowdFunding")

module.exports = function(deployer) {
    deployer.deploy(CrowdFundContract)
}