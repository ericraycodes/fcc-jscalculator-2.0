

// imports
import React from "react";
import Display from './components/Display';
import Buttons from './components/Buttons';


/** JAVASCRIPT CALCULATOR APP
    * Uses the React.Component as parent class to create components.
    * This is the parent component - stateful component, of the app.
    * 
    * @state Object : contains Array that stores the composition of the 
    *   validated math expression.
    * 
    * @return JSX : a single parent element that contains child components.
    */
class Calculator extends React.Component {

  // special method, initializes the objects within this class component
  constructor (props) {
    super(props);
    this.state = {
      // store the calculator expression
      "expression" : [],
    };
    this.setExpression = this.setExpression.bind(this);
  }

  // callback to receive data from buttons' event
  setExpression = (data) => {
    // access event-target text
    const inputText = data.target.innerText;
    window.console.log('\tsetExpression:', inputText, typeof inputText);
  }

  render () {
    // console 
    window.console.count('<CALCULATOR/>');
    return (
      <main className='calculator'>
        <Display expression={this.state.expression}/>
        <Buttons setExpression={this.setExpression}/>
      </main>
    );
  }
}


// export
export default Calculator;