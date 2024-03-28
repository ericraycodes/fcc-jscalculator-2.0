

// imports
import React from 'react';


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
    return (
      <ul>
        buttons
      </ul>
    );
  }
}


// export
export default ButtonPad;