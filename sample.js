let opArr = [];
let buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (isNum(button.id)) {
            opArr.push(button.id);
            updateScreen();
        } else if (isOperation(button.id)) {
            handleOperation(button.id);
        }
    });
});

function isNum(id) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return numbers.includes(id);
}

function isOperation(id) {
    const operations = ["clear", "plus", "minus", "mult", "divide", "equal", "deci", "delete"];
    return operations.includes(id);
}

function handleOperation(operation) {
    switch (operation) {
        case 'clear':
            opArr = [];
            updateScreen();
            break;
        case 'delete':
            opArr.pop();
            updateScreen();
            break;
        case 'equal':
            calculateResult();
            break;
        case 'deci':
            opArr.push('.');
            updateScreen();
            break;
        default:
            opArr.push(button.textContent);
            updateScreen();
            break;
    }
}

function calculateResult() {
    try {
        let expression = opArr.join('');
        let result = evaluateExpression(expression);
        display.textContent = result;
        opArr = [result.toString()];
    } catch (error) {
        display.textContent = 'Error';
        opArr = [];
    }
}

function evaluateExpression(expression) {
    let numbers = [];
    let operators = [];
    let currentNumber = '';

    for (let i = 0; i < expression.length; i++) {
        let char = expression[i];

        if (!isNaN(char) || char === '.') {
            currentNumber += char;
        } else if (char === '+' || char === '-' || char === '*' || char === '/') {
            numbers.push(parseFloat(currentNumber));
            operators.push(char);
            currentNumber = '';
        }
    }

    numbers.push(parseFloat(currentNumber));

    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/') {
            let num1 = numbers[i];
            let num2 = numbers[i + 1];
            let result = operators[i] === '*' ? num1 * num2 : num1 / num2;
            numbers.splice(i, 2, result);
            operators.splice(i, 1);
            i--;
        }
    }

    let finalResult = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        let num = numbers[i + 1];
        finalResult = operators[i] === '+' ? finalResult + num : finalResult - num;
    }

    return finalResult;
}

function updateScreen() {
    display.textContent = opArr.join(' ');
}