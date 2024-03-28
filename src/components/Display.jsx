

/** CALCULATOR SCREEN DISPLAY COMPONENT (function)
 * @prop Array : the math expression parsed from user-input.
 * 
 * 1. Creates a type-string-expression from the array to display.
 * 2. Holds the #display element to display current user-input or
 *    calculation result.
 * 
 * @return JSX : an element that contains the Calculator data.
 */
const Display = () => {
  // console
  window.console.count('<Display/>');
  return (
    <figure className='display-container'>
      <div id='expression'>
        Math Expression
      </div>
      <div id='display'>
        Input / Output
      </div>
    </figure>
  );
};


// export
export default Display;