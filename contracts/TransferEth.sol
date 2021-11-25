// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract TransferEth {
    address owner;
    uint contractBank;
    mapping (address => uint) netWorth;
    event transferEvent(address _from, address _to, uint val);
    constructor(){
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function getOwnerAddress() public view returns (address) {
        return owner;
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function payEth() external payable {
        contractBank += msg.value;
    }

    function payEthToAnotherAddress(address _to) public payable {
        require(msg.value >= 0);
        payable(_to).transfer(msg.value);
    }

}