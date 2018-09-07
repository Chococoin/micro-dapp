import React, { Component } from 'react';
import '../styles/Window.css';

class Window extends Component {
    constructor(){
      super()
      this.state = {
        text: "Hola mundo",
      };
    }

    componentWillMount(){
      this.setState({text: "Ciao mundo!"});
    }


    render(){
        return(
            <div className="inData">
                "{this.state.text}"
            </div>
        );
    };
}

export default Window;