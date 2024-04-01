



// check if data is a numeric
const isTypeNumber = (data) => /^\-?[0-9]+\.?[0-9]*$/.test(data) || data==='.' || (typeof data === 'number');
// check if data is operator
const isTypeOperator = (data) => /^[x/+-]$/.test(data);


/** Inclusion / non-inclusion of previous result.
 	* @parameter Array : math expression
 	* 
 	* Conditions
 	* 1. Access result from previous calculation.
 	* 2. Anticipate these result-values : numeric, Infinity, and NaN.
 	* 3. Inclusion, when follow-up input after calculation is an OPERATOR;
 	* 	 otherwise, non-inclusion.
 	* 4. Either way, the expression array is restarted.
 	* 
 	* @return Array : updated math expression
 	*/
function includeResult(array) {
	// expression
	const arr = [...array];

	// check for calculation - presence of '='
	const isResultExist = arr.some(str => str === '=');
	if (isResultExist) {
		// access array's latest index
		const li = arr.length - 1;

		// check if follow-up input is OPERATOR
		const isOperator = /[x/+-]/.test(arr[li]);
	
		// include result? the deciding is upon the value of includeIndex
		const includeIndex = isOperator ? li - 1 : li;

		// start another expression
		arr.splice(0, includeIndex);
	}

	// console
	window.console.log('\ton result:', isResultExist, arr);
	// return
	return arr;
};


/** Collate input sequence for numeric terms and operators.
 	* @parameter Array : math expression
 	* 
 	* 1. Compose numeric terms.
 	* 2. Filter operator inputs.
 	* 3. Integrate negative sign to numbers.
 	* 
 	* @return Array : updated math expression
 	*/
function collateInputs(array) {
	// reference
	const arr = [...array];
	// access latest index
	const li = arr.length - 1;


	// check if input is either: number or operator
	const isNumber = isTypeNumber(arr[li]);
	const isOperator = isTypeOperator(arr[li]);
	/* Numeric term
		* 1. Can only start with one zero.
		* 2. Whole numbers replace the starting zero.
		* 3. By condition, integrate with subtraction operator
		*	 to be a negative number.
		*/
	if (isNumber) {
		// check if previous input is numeric
		const isPrevNumeric = arr.length > 1 ? isTypeNumber(arr[li-1]) ? true : false : false;
		// join adjacent numeric inputs
		const numeric = isPrevNumeric ? arr[li-1] + arr[li] : arr[li];

		// when a numeric term starts with zero
		if (numeric==='.') {
			arr[li] = '0.';
		}
		// when composing adjacent numeric inputs
		else if (isPrevNumeric) {
			// check if adjacent inputs compose a valid numeric term
			const isNumericValid = isTypeNumber(numeric);
			// compose when valid
			if (isNumericValid) {
				// parseFloat validate numeric when there is no decimal figures
				arr[li-1] = /\./.test(numeric) ? numeric : parseFloat(numeric);
			}
			// keep only the valid composition
			arr.pop();
		}

		// console
		window.console.log('\tisNumber:', arr);
	}
	/* Operators
		* 1. Only one operator between numeric terms.
		* 2. The subtraction operator is used to indicate a negative number.
		* 	 A) input " + " , 	 validated " + "
		*	 B) input " / x " ,  validated " x " (except, when latter is subtraction operator)
		*	 C) input " + - " ,  validated " + - " (the latter is the negative indicator)
		*	 D) input " + - x ". validated " x " (negative indicator is nullified and replaced by the latest input)
		* 3. Validate after the first operator input.
		*/
	else if (isOperator && arr.length>1) {
		// condition for rule 2B
		const isRule2B = isTypeOperator(arr[li-1]) && arr[li]!=='-';

		// implement rule 2D first
		if (arr.length>2) {
			// check
			const isRule2D = isTypeOperator(arr[li-2]) && arr[li-1]==='-' && isTypeOperator(arr[li]);
			if (isRule2D) arr.splice(li-2, 2); 
		}
		// implement 2B only, 2A and 2C will naturally implement
		if (isRule2B) {
			arr[li-1] = arr[li];
			arr.pop();
		}
		// console
		window.console.log('\tisOperator:', arr);
	}


	/* Compose negative numeric terms
	 * 1. When the subtraction operator is set up as a negative sign.
	 */
	if (arr.length > 1) {
		// access latest index
		const li = arr.length - 1;
		
		// conditions at the middle and start of expression
		const isNegativeCondition = arr.length > 2  ? (isTypeOperator(arr[li-2]) && arr[li-1]==='-' ? true : false)
			: arr.length > 1 ? (arr[li-1]==='-' ? true : false ) : false;
					
		// implement
		if (isNegativeCondition) {
			arr[li-1] += arr[li];
			arr.pop();
		}

		// console
		window.console.log('\tonfloat:', arr);
	} 

	// console
	window.console.log('\tcollate:', arr);
	// return
	return arr;
}

/** Validate expression sequence
	* @parameter Array : math expression
	* 
	* 1. Expression starts and ends with a numeric term (operand).
	* 2. Completed numeric terms (when followed up by an operator input)
	* 	 are parseFloated (validated).
	* 
	* @return Array : updated math expression.
	*/
function validateExpression(array) {
	// expression 
	const arr = [...array];
	

	// validate at the start of expression
	if (arr.length === 2) {
		// remove operators at the start
		if (isTypeOperator(arr[0])) arr.shift();
	}
	// validate before calculation begins
	else if (arr[arr.length-1] === '=') {
		// array's latest index
		const li = arr.length - 1;
		// count the number of preceeding operators before the equals operator
		const preceedingOperatorCount = isTypeOperator(arr[li-2]) && isTypeOperator(arr[li-1]) ? 2
			: isTypeOperator(arr[li-1]) ? 1 : 0;
		// remove preceeding operators
		arr.splice(li-preceedingOperatorCount, preceedingOperatorCount);
	}


	// parseFloat validate numeric terms when completed
	(() => {
		// latest index
		const li = arr.length - 1;
		// condition: the numeric term is followed by an operator / non-number
		const isNumericTermCompleted = arr.length < 2 ? false
			: isTypeNumber(arr[li-1]) && !isTypeNumber(arr[li]) ? true : false;
		// implement
		if (isNumericTermCompleted) arr[li-1] = parseFloat(arr[li-1]);
	}) ();


	// console
	window.console.log('\tvalidated:', arr);
	// return
	return arr;
}

/** Evaluate the math expression
	* @parameter Array : math expression
	* 
	* 1. Use the MDAS rule.
	* 2. Manage precision of result's decimal figures to at least four digits.
	* 
	* @return Array : the math expression with result
	*/
function evaluateExpression(array) {
	// math expression
	const arr = array.filter(_ => _ !== '=');

	// MDAS priority
	['x', '/', '+', '-'].forEach(prio => {

		// search through the expression prioritized operators
		let i = null;
		for (i=0; i<arr.length; i++) {

			// expression operator
			const operator = arr[i];
			// run operation when prio match
			if (prio === operator) {

				// prio operation	
				let result = null;				
				switch (operator) {
					case 'x' : result = arr[i-1] * arr[i+1]; break;
					case '/' : result = arr[i-1] / arr[i+1]; break;
					case '+' : result = arr[i-1] + arr[i+1]; break;
					case '-' : result = arr[i-1] - arr[i+1]; break;
				}
				// update array expression
				arr.splice(i-1, 3, result);
				// console
				window.console.log('\toperation:', operator, 'index:', i, 'result:', result, arr);
				// search prios through the expression from the start
				i = 0;
			}
		}
	});

	// manage decimal precisio
	arr[0] = Math.round(arr[0] * 10000) / 10000;

	// console
	window.console.log('\tresult:', arr);
	// return
	return array.concat(arr);
}




/** MAIN FUNCTION
 	* @parameter Array, String : the component state, button character
 	* 
 	* Perform task based on input:
 	* 1. Form a math expression.
 	* 2. Compute the result of the expression when evaluated.
 	* 3. Reset the calculator-input-data.
 	* 
 	* @return Array : updated expression based on user input.
 	*/
export default function runCalculator(array, string) {
	// references
	let expression = [...array];
	const input = string;

	/* Perform tasks by input
		* 1. form an expression
		* 2. calculate result
		* 3. clear calculator data
		*/
	// input conditions
	const isForExpression = /[0-9.x/+-]/.test(input);
	const isForCalculation = input === '=';
	const isForReset = input === 'AC';
	// implement formulation
	if (isForExpression) {
		// console
		window.console.log('forming...');

		// step 1: collect input
		expression.push(input);
		// step 2: result inclusion?
		expression = includeResult(expression);
		// step 3: collate for numbers and operators
		expression = collateInputs(expression);
		// step 4: validate the expression
		expression = validateExpression(expression);
	}
	// implement computation
	else if (isForCalculation) {
		// there must be an expression, and anti-equals-spam condition
		const isExpressionHasEquals = expression.some(_ => _ === '=');
		if (expression.length>0 && !isExpressionHasEquals) {

			// step 1: append '=' to expression
			expression.push(input);
			// step 2: validate expression before calculation
			expression = validateExpression(expression);
			// step 3: evaluate / calculate expression
			expression = evaluateExpression(expression);
		}
	}
	// implement reset
	else if (isForReset) {
		// clear console
		window.console.clear();
		// empty expression array
		expression = [];
	}

	// console
	window.console.log('UPDATE:', expression);
	// return
	return expression;
}