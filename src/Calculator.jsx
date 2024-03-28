

// imports
import React from "react";
import Display from './components/Display';
import ButtonPad from './components/ButtonPad';


/** JAVASCRIPT CALCULATOR APP
    * Uses the React.Component as parent class to create components.
    * This is the parent component - stateful component, of the app.
    * 
    * @state 
    * 
    * @return JSX : a single parent element that contains child components.
    */
class Calculator extends React.Component {

  // special method, initializes the objects within this class component
  constructor (props) {
    super(props);
  }

  render () {
    // console 
    window.console.count('<CALCULATOR/>');
    return (
      <main>
        <Display/>
        <ButtonPad/>
      </main>
    );
  }
}


// export
export default Calculator;