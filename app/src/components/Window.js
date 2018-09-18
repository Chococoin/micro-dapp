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
      account: "0x0"
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
  }
 
  componentWillMount(){
    this.web3.eth.getCoinbase((err, account)=>{
      this.setState({account});
    })
    this.MyContract.deployed().then((instance)=>{
      this.contractInstance = instance;
      this.contractInstance.showMessage({from: this.state.account}).then((res)=>{
        console.log(res)
        this.setState({text: res});
      });
    })
  }
 
  componentDidMount(){
    this.interval = setInterval(() => {
      this.web3.eth.getCoinbase((err, account)=>{
        if (account != this.state.account){
          this.setState({account})}
        
      })
    } ,1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  showMessage(){
    this.contractInstance.showMessage().then((res)=>{
      if (res != null) {
        return this.setState({text: res});
      }
    });
  }

  changeMessage(event){
    //this.contractInstance.changeMessage(this.state.value);
    console.log(this.textInput.value);
    event.preventDefault();
    this.textInput.value = '';
    this.textInput.focus();
  }

/*  updateState(){
    this.web3.eth.getCoinbase((err, account) => {
      this.setState({ account });
      this.MyContract.deployed().then((instance)=>{
        this.contractInstance = instance;
      });
    })
  }*/

  render(){
      return(
          <div className="inData">
              <h4>Address:</h4>
              <p>{this.state.account}</p>
              <h4>Text:</h4>
              <p>{this.state.text}</p>
              <form onSubmit={this.changeMessage}>
                <input ref={input => this.textInput = input} type="text"/><br />
                <button type="Submit">Envia</button>
              </form>
          </div>
      );
  };
}

export default Window;