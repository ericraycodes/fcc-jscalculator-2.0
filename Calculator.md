

# CALCULATOR APP

### Logic of functionality
1. Capture mouse-input.
1. Identify the applicable task:
	- **Form**an expression: numbers & operators.
	- **Complete** / **simplify** the expression, **calculate** the result: equals operator.
	- **Clear** / **reset** the calculator data.

### Calculator tasks
- **Expression**:
	1. Store input into the *array*.
	1. *Inclusion / non-inclusion* of the previous calculation result to start the *expression*.
		1. access the *result* in the expression array, expect valuse like 'Infinity' and 'NaN'.
		1. restart the *expression* array for a new expression.
	1. *Validate* for the correct sequence of *expression*.
	1. By condition(s), *integrate a negative sign* to numbers.
- **Calculation**:
	1. Necessary *correction* to the expression before calculation.
	1. *Calculate result* using MDAS rule.
	1. Manage precision of result's decimal figures not less than four digits.
- **Clear**: resets the *expression* state to its initial state.