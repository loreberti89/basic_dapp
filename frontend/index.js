web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"users","outputs":[{"name":"identity","type":"uint256"},{"name":"name","type":"string"},{"name":"nickname","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"userId","type":"uint256"},{"indexed":false,"name":"name","type":"string"},{"indexed":false,"name":"nickname","type":"string"},{"indexed":false,"name":"identity","type":"uint256"}],"name":"NewUser","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"nickname","type":"string"}],"name":"ChangeNickName","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"identity","type":"uint256"}],"name":"IdentityChangeEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"constant":false,"inputs":[{"name":"_identity","type":"uint256"},{"name":"_name","type":"string"},{"name":"_nickname","type":"string"}],"name":"createUser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getUserData","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"string"},{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsers","outputs":[{"components":[{"name":"identity","type":"uint256"},{"name":"name","type":"string"},{"name":"nickname","type":"string"}],"name":"","type":"tuple[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsersCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getUsersNumberByOwner","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_nickname","type":"string"}],"name":"changeNickName","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_id","type":"uint256"},{"name":"_identity","type":"uint256"}],"name":"changeIdentity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]');
UserCrypto = web3.eth.contract(abi);
contractInstance = UserCrypto.at('0x345ca3e014aaf5dca488057592ee47305d9b3e10');
address = web3.eth.accounts[0];

function createNewUser() {
  /*candidateName = $("#candidate").val();
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[1]}, function() {
    let div_id = candidates[candidateName];
    $("#" + div_id).html(contractInstance.totalVotesFor.call(candidateName).toString());
  });*/
  let name = $("#name").val();
  let nickname = $("#nickname").val();
  let identity = 5;
  contractInstance.createUser(identity, name, nickname, {from: address, gas:3000000});
}

function withdraw(){
  contractInstance.withdraw({from:address});
}


$(document).ready(function() {


  var event = contractInstance.NewUser(function(error, result) {
    if (error) return
    getDataAndCompile();    
  });

var eventChangeNick = contractInstance.ChangeNickName(function(error, result) {
    if (error) return
    $("#user_data_nickname").html(result.args.nickname.toString());
  });
  var eventChangeIdentity = contractInstance.IdentityChangeEvent(function(error, result) {
    if (error) return
    $("#user_data_identity").html(result.args.identity.toString());
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
  let [_index, _identity, _name, _nickname] = contractInstance.getUserData({from:address});
  contractInstance.changeNickName(_index, nickname, {from:address, gas:3000000, value: web3.toWei(0.1, "ether")},
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
  let [_index, _identity, _name, _nickname] = contractInstance.getUserData({from:address});
  let identity = $("#change_identity").val();
  contractInstance.changeIdentity(_index, identity, {from:address, gas: 300000});

}

function getDataAndCompile(){
  
  let [index, identity, name, nickname] = contractInstance.getUserData({from:address});
  $("#user_data_identity").html(identity.toString());
  $("#user_data_name").html(name.toString());
  $("#user_data_nickname").html(nickname.toString());
  //console.log(test);
}