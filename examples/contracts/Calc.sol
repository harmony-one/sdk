pragma solidity ^0.5.1;
 
contract Calc {

    uint count;

    function getCount() public returns (uint) {
        
        return count;

    }

    function add(uint a, uint b) public returns (uint) {
        count++;
        return a + b;
    }


}