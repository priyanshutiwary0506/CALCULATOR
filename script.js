const currentOperandTextElement = document.getElementById('current-operand');
const previousOperandTextElement = document.getElementById('previous-operand');
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
function clearCalculator() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}
function deleteDigit() {
    if (currentOperand === '0') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
    updateDisplay();
}
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
    updateDisplay();
}
function appendOperator(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '0';
    updateDisplay();
}
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = prev % current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}
function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = '';
    } else {
        integerDisplay = integerDigits.toLocaleString('en', {
            maximumFractionDigits: 0
        });
    }
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
    } else {
        return integerDisplay;
    }
}
function updateDisplay() {
    currentOperandTextElement.innerText = getDisplayNumber(currentOperand);
    if (operation != null) {
        previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
}
clearCalculator();