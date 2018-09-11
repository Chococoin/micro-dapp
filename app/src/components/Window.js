import React, { Component } from 'react';
import Web3 from 'web3';
import '../styles/Window.css';

class Window extends Component {
  constructor(){
    super();
    this.state = {
      text: "Nada aun!",
    };

    if(typeof web3 != 'undefined'){
      console.log("Using web3 detected from external source like Metamask");
      console.log(web3.currentProvider);
      this.web3 = new Web3(web3.currentProvider);
    }else{
      console.log("No web3 detected. Falling back to http://127.0.0.1:7545");
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
    }

    const MyContract = web3.eth.contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "_message",
            "type": "string"
          }
        ],
        "name": "changeMessage",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "name": "_message",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "showMessage",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]);

    this.state.ContractInstance = MyContract.at("0xae333b05dce91984ed821ba0d638af4ae2d0a340");
  }
 
  componentWillMount(){
    this.updateState();
  }

  updateState(){
    this.state.ContractInstance.showMessage((err, result) => {
      if(result != null){
        this.setState({
          text: result
        })
      }
    })
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