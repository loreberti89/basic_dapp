pragma solidity ^0.4.4;

import "./Ownable.sol";
contract CryptoUser is Ownable{
    //event for frontend
    event NewUser(uint userId, string name, string nickname, uint identity);
    event ChangeNickName(string nickname);
    event IdentityChangeEvent(uint identity);
    
    uint changeNickNameFee = 0.001 ether;
    
    struct User{
        uint identity;
        string name;
        string nickname;
    }

    User[] public users;
    mapping (uint => address) public userToOwner;
    mapping (address => uint) ownerUserCount;
    


    function createUser(uint _identity, string _name, string _nickname) public {
        require(ownerUserCount[msg.sender] < 1);       
        
        uint id = users.push(User(_identity, _name, _nickname));
        userToOwner[id] = msg.sender ;
        ownerUserCount[msg.sender]++;
        
        NewUser(id, _name, _nickname, _identity);
    }




    function getUserData(address _owner) external isOwner view returns (uint, string, string){
    
        for (uint i = 0; i < users.length; i++) {
            if (userToOwner[i] == _owner) {
                return(users[i].identity, users[i].name, users[i].nickname);
            }
        }
        
    }

    
    function getUsers() view public returns(User[]){
        return users;
    }
    
    function getUsersCount() public constant returns(uint) {
        return users.length;
    }
    function getUsersNumberByOwner(address _owner) view isOwner external returns (uint){
        return ownerUserCount[_owner];
    }
    
    
    
    
    function changeNickName(uint _id, string _nickname) public isOwner payable{
        require(msg.value == changeNickNameFee);
        users[_id].nickname = _nickname;
        ChangeNickName(_nickname);    
    }

    function changeIdentity(uint _id, uint _identity) isOwner external {
        users[_id].identity = _identity;
        IdentityChangeEvent(_identity);
    }
    
}
