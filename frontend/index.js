web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"userToOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"users","outputs":[{"name":"identity","type":"uint256"},{"name":"name","type":"string"},{"name":"nickname","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"nickname","type":"string"},{"indexed":false,"name":"identity","type":"uint256"}],"name":"NewUser","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"nickname","type":"string"}],"name":"ChangeNickName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identity","type":"uint256"}],"name":"IdentityChangeEvent","type":"event"},{"constant":false,"inputs":[{"name":"_identity","type":"uint256"},{"name":"_name","type":"string"},{"name":"_nickname","type":"string"}],"name":"createUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getUserData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsers","outputs":[{"components":[{"name":"identity","type":"uint256"},{"name":"name","type":"string"},{"name":"nickname","type":"string"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsersCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"getUsersNumberByOwner","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_nickname","type":"string"}],"name":"changeNickName","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_identity","type":"uint256"}],"name":"changeIdentity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
UserCrypto = web3.eth.contract(abi);
contractInstance = UserCrypto.at('0x4e72770760c011647d4873f60a3cf6cdea896cd8');
address = web3.eth.accounts[1];

function createNewUser() {
  /*candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[1]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });*/
  let name = $("#name").val();
  let nickname = $("#nickname").val();
  let identity = 1;
  contractInstance.createUser(identity, name, nickname, {from: address, gas:3000000});
}




$(document).ready(function() {


  var event = contractInstance.NewUser(function(error, result) {
    if (error) return
    getDataAndCompile();    
  });

var eventChangeNick = contractInstance.ChangeNickName(function(error, result) {
    if (error) return
    $("#user_data_nickname").html(result.nickname.toString());
  });
  var eventChangeIdentity = contractInstance.IdentityChangeEvent(function(error, result) {
    if (error) return
    $("#user_data_identity").html(result.identity.toString());
  });

  let count = contractInstance.getUsersNumberByOwner.call(address);
  
  
  getDataAndCompile();

  //for know how many users there are
  let length = contractInstance.getUsersCount();
  console.log(length.toNumber());  
  
});
function changeNickName(){

  
  let nickname = $("#change_nickname").val();
  //, value: web3.toWei(0.001, "ether"), gas: 9000000  
  contractInstance.changeNickName(address, nickname, {from:address, gas:3000000, value: web3.toWei(0.001, "ether")},
    function(err, result){
      if(err){
        console.log(err);
        return;
      } 
      console.log(result);

    });


}
function changeIdentity(){
  //let id = contractInstance.getUserIdByOwner.call(address);
  let identity = $("#change_identity").val();
  contractInstance.changeIdentity(address, identity, {from:address, gas: 300000});

}

function getDataAndCompile(){
  console.log("I enter");
  let [identity, name, nickname] = contractInstance.getUserData.call(address, {from:address, gas: 3000000});
  $("#user_data_identity").html(identity.toString());
  $("#user_data_name").html(name.toString());
  $("#user_data_nickname").html(nickname.toString());
  //console.log(test);
}