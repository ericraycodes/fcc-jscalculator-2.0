

/** CALCULATOR SCREEN DISPLAY COMPONENT (function)
 * @prop Array : the math expression parsed from user-input.
 * 
 * 1. Creates a type-string-expression from the array to display.
 * 2. Holds the #display element to display current user-input or
 *    calculation result.
 * 
 * @return JSX : an element that contains the Calculator data.
 */
const Display = (props) => {
  // console
  // window.console.count('<Display/>');

  // calculator-display content
  // window.console.log('\tdisplay:', props);
  const array = [...props.expression];
  const expression = array.join(' ');
  const display = array.length > 0 ? array[array.length-1] : 0;

  return (
    <figure className='display-container'>
      <div id='expression'>
        { expression }
      </div>
      <div id='display'>
        { display }
      </div>
    </figure>
  );
};


// export
export default Display;