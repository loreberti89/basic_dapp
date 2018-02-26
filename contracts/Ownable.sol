pragma solidity ^0.4.4;

contract Ownable{
    address owner;
    
    modifier isOwner()
    {
        require(msg.sender == owner);
        _;
    }
    function Ownable() public {
        owner = msg.sender;
    }
}
