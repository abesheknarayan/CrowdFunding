const ZombieContract = artifacts.require("ZombieContract")

module.exports = function(deployer) {
    deployer.deploy(ZombieContract)
}