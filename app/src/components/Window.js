import React, { Component } from 'react';
import Web3 from 'web3';
import '../styles/Window.css';

class Window extends Component {
  constructor(){
    super();
    this.state = {
      text: "Hola mundo",
    };

    if(typeof web3 != 'undefined'){
      console.log("Using web3 detected from external source like Metamask");
      this.web3 = new Web3(web3.currentProvider);
    }else{
      console.log("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    const MyContract = web3.eth.contract();
  }
 
  componentWillMount(){
    this.setState({text: "Ciao mundo!"});
  }

  render(){
      return(
          <div className="inData">
              <p>{this.state.text}</p>
          </div>
      );
  };
}

export default Window;