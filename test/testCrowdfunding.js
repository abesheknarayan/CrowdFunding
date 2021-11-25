const CrowdFundContract = artifacts.require("CrowdFunding");
const chai = require("chai");

contract("crowd funding", async (accounts) => {
  let instance;
  let [alice, bob] = accounts;
  beforeEach(async () => {
    instance = await CrowdFundContract.new();
  });

  xit("should register a case by Bob and 2 ether has to be deducted from Bob", async () => {
    let result = await instance.registerCase(
      "Pls help me!!",
      "sample desc",
      5,
      { value: web3.utils.toWei("2", "ether"), from: bob }
    );
    console.log(result.receipt.status);
    let cases = await instance.getAllCases();
    console.log(cases);
  });

  xit("should make bob donate to case registered by Alice", async () => {
    let result = await instance.registerCase("Case 2", "Sample desc 2", 7, {
      value: web3.utils.toWei("2", "ether"),
      from: alice,
    });
    console.log(result.receipt.status);
    let cases = await instance.getAllCases();
    console.log(cases[0].moneyReceived);

    // bob will donate
    let donateReq = await instance.fundCase(0, {
      value: web3.utils.toWei("3", "ether"),
      from: bob,
    });

    console.log(donateReq.receipt.status);
    let cases2 = await instance.getAllCases();
    console.log(cases2);
    chai
      .expect(cases2[0].moneyReceived)
      .to.equal(web3.utils.toWei("3", "ether"));
  });

  xit("should show contract owner", async () => {
    let res = await instance.getContractOwner();
    console.log(res);
  });

  xit("should register a case by bob and alice should withdraw contract fee of 2 ethers", async () => {
    let registerReq = await instance.registerCase(
      "Case 1 test",
      "Sample desc 2",
      7,
      {
        value: web3.utils.toWei("2", "ether"),
        from: bob,
      }
    );
    console.log(registerReq.receipt.status);
  });


  xit("should toggle case as finished as bob will pay full funding created by Alice and Alice should recieve the money", async () => {});

  xit("should register a case by alice and bob should be able to like it", async () => {});

  xit("should register a case by alice and bob should not be able to like it twice", async () => {});
});
