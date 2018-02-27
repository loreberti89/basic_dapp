var UserContract = artifacts.require("CryptoUser");
module.exports = function(deployer) {
   deployer.deploy(UserContract);
  // Use deployer to state migration tasks.
};
