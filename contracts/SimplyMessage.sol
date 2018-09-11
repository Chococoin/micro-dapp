pragma solidity ^0.4.23;

contract SimplyMessage {
	address owner;
	struct myMessage{
		string info;
		bool active;
	}

	mapping (address => myMessage) messages;

	constructor(string _message) public {
		owner = msg.sender;
		messages[msg.sender].info = _message;
		messages[msg.sender].active = true; 
	}

	function changeMessage(string _message) external returns(bool){
		messages[msg.sender].info =_message;
		return true;
	}

	function showMessage() external view returns(string){
		return messages[msg.sender].info;
	}
}