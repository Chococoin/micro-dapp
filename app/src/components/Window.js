import React, { Component } from 'react';
import Web3 from 'web3';
import SimplyMessage from '../../../build/contracts/SimplyMessage.json';
import TruffleContract from 'truffle-contract';
import '../styles/Window.css';

class Window extends Component {
  constructor(){
    super();
    this.state = {
      text: "Nada de nada!",
      account: "0x0",
      value: '',
    };

    if (typeof web3 != 'undefined') {
      console.log("Using web3 detected from external source like Metamask");
      this.web3Provider = web3.currentProvider
    } else {
      console.log("No web3 detected. Falling back to http://127.0.0.1:7545");
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    this.web3 = new Web3(this.web3Provider);

    this.MyContract = TruffleContract(SimplyMessage);
    this.MyContract.setProvider(this.web3Provider);

    this.showMessage = this.showMessage.bind(this);
    this.changeMessage = this.changeMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
 
  componentWillMount(){
    this.updateState();
  }

  showMessage(){
    this.contractInstance.showMessage().then((res)=>{
      if (res != null) {
        this.setState({text: res});
      }
    });
  }

  changeMessage(event){
    this.contractInstance.changeMessage(this.state.value);
    event.preventDefault();
    this.setState({value: ''})
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  updateState(){
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account });
      this.MyContract.deployed().then((instance)=>{
        this.contractInstance = instance;
        this.showMessage();
      });
    })
  }

  render(){
      return(
          <div className="inData">
              <h4>Address:</h4>
              <p>{this.state.account}</p>
              <h4>Text:</h4>
              <p>{this.state.text}</p>
              <form onSubmit={this.changeMessage}>
                <input type="text" value={this.state.value} onChange={this.handleChange}/><br />
                <button type="Submit">Envia</button>
              </form>
          </div>
      );
  };
}

export default Window;