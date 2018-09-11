var SimplyMessage = artifacts.require("./SimplyMessage.sol");

module.exports = function(deployer) {
  deployer.deploy(SimplyMessage, "Hola Mundo");
};
