pragma solidity ^0.4.4;

import "./Ownable.sol";
contract CryptoUser is Ownable{
    //event for frontend
    event NewUser(uint userId, string name, string nickname, uint identity);
    event ChangeNickName(string nickname);
    event IdentityChangeEvent(uint identity);
    
    uint changeNickNameFee = 0.1 ether;
    
    struct User{
        uint identity;
        string name;
        string nickname;
    }

    User[] public users;
    mapping (uint => address) userToOwner;
    mapping (address => uint) ownerUserCount;
    


    function createUser(uint _identity, string _name, string _nickname) public {
        require(ownerUserCount[msg.sender] < 1);       
        
        uint id = users.push(User(_identity, _name, _nickname))-1;
        userToOwner[id] = msg.sender ;
        ownerUserCount[msg.sender]++;
        
        NewUser(id, _name, _nickname, _identity);
    }




    function getUserData() external view returns (uint, uint, string, string){
    
        for (uint i = 0; i < users.length; i++) {
            if (userToOwner[i] == msg.sender) {
                return(i, users[i].identity, users[i].name, users[i].nickname);
            }
        }
        
    }

    
    function getUsers() view public returns(User[]){
        return users;
    }
    
    function getUsersCount() public constant returns(uint) {
        return users.length;
    }
    function getUsersNumberByOwner() view external returns (uint){
        return ownerUserCount[msg.sender];
    }
    
    function changeNickName(uint _id, string _nickname) external payable{
        require(msg.value == changeNickNameFee);
        require(msg.sender == userToOwner[_id]);
        users[_id].nickname = _nickname;
        ChangeNickName(_nickname);    
    }

    function withdraw() external onlyOwner {
        owner.transfer(this.balance);
    }

    function changeIdentity(uint _id, uint _identity) external {
        require(msg.sender == userToOwner[_id]);
        users[_id].identity = _identity;
        IdentityChangeEvent(_identity);
    }

    
}
