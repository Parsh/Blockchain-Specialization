let Coin = artifacts.require("./Coin.sol");

let coinInstance;

let coins = [100, 200, 300, 400];
let coin_to_send = [10, 20, 30, 40];
contract('CoinContract', function (accounts) {
  //accounts[0] is the default account
  //Test case 1
  it("contract deployment", function() {
    return Coin.deployed().then(function (instance) {
      coinInstance = instance;
      assert(coinInstance !== undefined, 'Coin contract should be defined');
    });
  });

	it("should create money", function() {
    return coinInstance.mint(accounts[1], coins[0]).then(function (result) {
      assert.equal('0x01', result.receipt.status, 'valid coin creation');
			return coinInstance.mint(accounts[2], coins[1])
    }).then(function(result) {
			assert.equal('0x01', result.receipt.status, 'valid coin creation');
			return coinInstance.mint(accounts[3], coins[2])
		}).then(function(result) {
			assert.equal('0x01', result.receipt.status, 'valid coin creation');
		});
  });

	it("should transfer money", function() {
		return coinInstance.transfer(accounts[3], coin_to_send[0], {from: accounts[1]}).then(function (result) {
			assert.equal('0x01', result.receipt.status, 'transfer is done');
			return coinInstance.balances(accounts[1]);
		}).then(function(result) {
			assert.equal(coins[0] - coin_to_send[0], result.toNumber(), 'money tally is correct');
			return coinInstance.balances(accounts[3]);
		}).then(function(result) {
			assert.equal(coins[2] + coin_to_send[0], result.toNumber(), 'money tally is correct');
		});
	});

	it("should NOT create money", function() {
    return coinInstance.mint(accounts[1], coin_to_send[0], {from: accounts[1]}).then(function (result) {
      throw("modifer not working");
    }).catch(function (e) {
      if(e === "modifer not working") {
        assert(false);
      } else {
        assert(true);
      }
    })
  });

	it("should NOT transfer money", function() {
		return coinInstance.transfer(accounts[3], coins[0], {from: accounts[1]}).then(function (result) {
      throw("modifer not working");
    }).catch(function (e) {
      if(e === "modifer not working") {
        assert(false);
      } else {
        assert(true);
      }
    })
  });
});
