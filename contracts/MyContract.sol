pragma solidity ^0.5.0;

contract MyContract {

	struct User {
		uint id;
		string name;
		uint balance;		// How much cash they got in their account
	}

	// State variable - we will be storing user data here 
	User[] public users;
	uint public nextId;

	function createUser(string memory _name) public {
		users.push(User(nextId, _name, 0));
		nextId++; 
	}

	// Update user funds
	function updateUser(uint _id, string memory _name) public {
		uint i = findUser(_id);	
		users[i].name = _name;
	}

	function readUser(uint _id) public view returns (uint, string memory) {
		uint i = findUser(_id);
		return (users[i].id, users[i].name); 
	}

	function deleteUser(uint _id) public {
		uint i = _id;
		delete users[i];
	}

	// Code that can search inside the user array
	function findUser(uint _id) internal view returns (uint) {
		for(uint i = 0; i < users.length; i++) {
			if(users[i].id == _id) {
				return i;	
			}
		}
	}
}
