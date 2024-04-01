

// imports
import React from "react";
import Display from './components/Display';
import Buttons from './components/Buttons';
import runCalculator from './assets/calculator.jsx';


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

  /* CONSTRUCTOR
    *
    *   A Special method, it initializes class component properly.
    * 
    *   It is standard practice to call constructor() and super() - passing
    * 'props' as parameter to both.
    * 
    *   It will initialize all component's local state and methods.
    */
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

    // process user-activity
    const expression = [...this.state.expression];
    const updatedExpression = runCalculator(expression, inputText);

    // update state
    this.setState({ "expression" : updatedExpression });
  }

  /* RENDER METHOD OF REACT'S COMPONENT CLASS
    * This returns HTML code from a JSX syntax (or null - when no JSX is coded).
    */
  render () {
    // console 
    // window.console.count('<CALCULATOR/>');

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