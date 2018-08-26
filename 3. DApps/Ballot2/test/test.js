let Ballot = artifacts.require("./Ballot.sol");

let ballotInstance;

let _voting = {
	"winner": 0,
	"one": 1,
	"two": 2,
	"three": 3
}

contract('Ballot Contract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("Contract deployment", function() {
    return Ballot.deployed().then(function (instance) {
      ballotInstance = instance;
      assert(ballotInstance !== undefined, 'Ballot contract should be defined');
    });
  });

  //Test case 2
  it("Valid user registration", function() {
    return ballotInstance.register(accounts[1], { from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[2], { from: accounts[0]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[3], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[4], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
      return ballotInstance.register(accounts[5], { from: accounts[0]});
    }).then(function(result) {
      assert.equal('0x01', result.receipt.status, 'Registration is valid');
    });
  });

  //Test case 3
  it("Valid voting", function() {
    return ballotInstance.vote(_voting.winner, {from: accounts[0]}).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.one, {from: accounts[1]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.two, {from: accounts[2]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.three, {from: accounts[3]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
      return ballotInstance.vote(_voting.winner, {from: accounts[4]});
    }).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'Voting is done');
    });
  });

  //Test case 4
  it("Validate winner", function () {
    return ballotInstance.winningProposal.call().then(function (result) {
      assert.equal(_voting.winner, result.toNumber(), 'Winner is validated with the expected winner');
    });
  });

  //Test case 5
  it("Valid individual votes", function () {
    return ballotInstance.getCount.call().then(function (result) {
      assert.equal(3, result[0].toNumber(), 'Individual vote is validated with expected vote count');
      assert.equal(1, result[1].toNumber(), 'Individual vote is validated with expected vote count');
      assert.equal(1, result[2].toNumber(), 'Individual vote is validated with expected vote count');
      assert.equal(1, result[3].toNumber(), 'Individual vote is validated with expected vote count');
    });
  });

//Negative cases
  it("Should NOT accept unauthorized registration", function () {
  return ballotInstance.register(accounts[6], { from: accounts[1]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
    }).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
  });

  it("Should NOT register already registered user", function () {
  return ballotInstance.register(accounts[1], { from: accounts[0]})
		.then(function (result) {
			throw("Condition not implemented in Smart Contract");
	}).catch(function (e) {
		if(e === "Condition not implemented in Smart Contract") {
			assert(false);
		} else {
			assert(true);
		}
	})
});

  it("Should NOT accept unregistered user vote", function () {
  return ballotInstance.vote(1, {from: accounts[7]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
    }).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
  });

  it("Should NOT vote again", function () {
  return ballotInstance.vote(1, {from: accounts[1]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
		}).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
	});

  it("Should NOT vote unknown entity", function () {
    return ballotInstance.vote(4, {from: accounts[5]})
		.then(function (result) {
				throw("Condition not implemented in Smart Contract");
		}).catch(function (e) {
			if(e === "Condition not implemented in Smart Contract") {
				assert(false);
			} else {
				assert(true);
			}
		})
	});
});
