pragma solidyty ^0.0.23;

contract EasyThing {
	address owner;
	struct myMessage{
		string info;
		bool active;
	}

	mapping (address => myMessage) messages;

	contructor(string _message) public {
		owner = msg.sender;
		messages[msg.sender].info = _message;
		messages[msg.sender].active = true; 
	}

	function changeMessage(string _message) external returns(bool){
		messages[msg.sender].info =_message;
		return true;
	}

	function showMessage() external view return(string){
		return messages[msg.sender].info;
	}


}