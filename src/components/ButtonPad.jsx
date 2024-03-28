

// imports
import React from 'react';




// buttons data { id, name, }
const buttonList = [
  { id : "zero",      text : "0" },
  { id : "one",       text : "1" },
  { id : "two",       text : "2" },
  { id : "three",     text : "3" },
  { id : "four",      text : "4" },
  { id : "five",      text : "5" },
  { id : "six",       text : "6" },
  { id : "seven",     text : "7" },
  { id : "eight",     text : "8" },
  { id : "nine",      text : "9" },
  { id : "add",       text : "+" },
  { id : "subtract",  text : "-" },
  { id : "multiply",  text : "x" },
  { id : "divide",    text : "/" },
  { id : "decimal",   text : "." },
  { id : "clear",     text : "AC" },
  { id : "equals",    text : "=" },
];


/** CALCULATOR PAD COMPONENT (class)
 * @prop function : a callback to handling the user-event-input on the rendered buttons.
 * 
 * 1. Iterative rendering of the calculator-buttons.
 * 2. Attach an event-listener to the component, this is targeted on buttons.
 * 3. The user-event fired is passed - through the callback, to the parent component to process.
 * 
 * @return JSX : contain all the calculator-buttons.
 */
class ButtonPad extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console
    window.console.count('<ButtonPad/>');

    // iterate button rendering
    const buttons = buttonList.map(btn => {
      return (<li key={btn.id}><button id={btn.id}>{btn.text}</button></li>);
    });
    return (
      <ul>
        { buttons }
      </ul>
    );
  }
}


// export
export default ButtonPad;