// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

contract CrowdFunding {
    address owner;
    uint256 unFinishedCases = 0;
    uint256 StartupRegisterFee = 2 ether;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    struct Case {
        string name;
        string description;
        uint256 targetFund;
        uint256 moneyReceived;
        uint256 likes;
        uint256 id;
        bool isFundingComplete;
    }
    Case[] public cases;

    struct UserAndCaseId {
        address user;
        uint256 caseId;
    }

    // mapping from startup id to startup Owner
    mapping(uint256 => address) case_to_owner;

    mapping(address => uint256) ownerCasesCount;

    // mapping from users to caseId if they already liked or not
    mapping(bytes32 => bool) UserAlreadyLikedCase;

    function registerCase(
        string memory _name,
        string memory _desc,
        uint256 targetFund
    ) external payable {
        require(msg.value == StartupRegisterFee);
        uint256 id = cases.length;
        cases.push(Case(_name, _desc, targetFund, 0, 0, id, false));
        case_to_owner[id] = msg.sender;
        ownerCasesCount[msg.sender]++;
        unFinishedCases++;
        payable(owner).transfer(msg.value);
    }

    function withdrawContractFee() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function getAllCases() public view returns (Case[] memory) {
        return cases;
    }

    // returns only unFinished cases
    function getAllUnfinishedCases() public view returns (Case[] memory) {
        uint256 len = cases.length;
        Case[] memory result = new Case[](unFinishedCases);
        uint256 indx = 0;
        for (uint256 i = 0; i < len; i++) {
            if (!cases[i].isFundingComplete) {
                result[indx] = cases[i];
                indx++;
            }
        }
        return result;
    }

    // returns unfinished cases registered by sender
    function getAllUserCases() public view returns (Case[] memory) {
        uint256 len = ownerCasesCount[msg.sender];
        uint256 total = cases.length;
        Case[] memory result = new Case[](len);
        uint256 indx = 0;

        for (uint256 i = 0; i < total; i++) {
            if (
                !cases[i].isFundingComplete && (case_to_owner[i] == msg.sender)
            ) {
                result[indx] = cases[i];
                indx++;
            }
        }
        return result;
    }

    function getContractOwner() external view returns (address) {
        return owner;
    }

    function togglelikeCase(uint256 _caseId) external {
        bytes32 nowHash = keccak256(abi.encodePacked(msg.sender, _caseId));
        if (!UserAlreadyLikedCase[nowHash]) {
            cases[_caseId].likes++;
            UserAlreadyLikedCase[nowHash] = true;
        } else {
            cases[_caseId].likes--;
            UserAlreadyLikedCase[nowHash] = false;
        }
    }

    function fundCase(uint256 _caseId) public payable {
        require(msg.value >= 0);
        address caseOwner = case_to_owner[_caseId];
        cases[_caseId].moneyReceived += msg.value;
        if (cases[_caseId].moneyReceived >= cases[_caseId].targetFund) {
            cases[_caseId].isFundingComplete = true;
            unFinishedCases--;
            ownerCasesCount[caseOwner]--;
        }
        payable(caseOwner).transfer(msg.value);
    }
}
