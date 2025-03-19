let opArr = [];
let buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        if(isNum(button.id)){
            opArr.push(button.id);
            updateScreen();
        }
        else if(isOperation(button.id)){
            handleOperation(button.id);
        }
    });
});

function isNum(id){
    const numbers = ["0","1","2","3","4","5","6","7","8","9"];
    console.log(numbers.includes(id));
    return numbers.includes(id);
}

function isOperation(id){
    const operations = ["clear", "plus", "minus", "mult", "divide", "equal", "deci", "delete"];
    return operations.includes(id);
}

function updateScreen(){
    display.textContent = opArr.join(' ');
}

function handleOperation(operation){
    switch (operation){
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
            const operatorMap = {
                plus: '+',
                minus: '-',
                mult: '*',
                divide: '/'
            };
            opArr.push(operatorMap[operation]);
            updateScreen();
            break;
    }
}

function calculateResult(){
    let str = '';
    let numbers = [];
    for (let i = 0; i < opArr.length; i++){
        if (['+', '-', '*', '/'].includes(opArr[i])){
            let num = parseFloat(str);
            str = '';
            numbers.push(num);
            numbers.push(opArr[i]);
        }else{
            str += opArr[i];
        }
    }
    numbers.push(parseFloat(str));

    opArr = numbers.reduce((pre, cur, i, numbers) => {
        if(cur === '+'){
            pre += numbers[i + 1];
            numbers.splice(0, 1, pre);
        }
        else if(cur === '-'){
            pre -= numbers[i + 1];
            numbers.splice(0, 1, pre);
        }
        else if(cur === '/'){
            pre /= numbers[i + 1];
            numbers.splice(0, 1, pre);
        }
        else if(cur === '*'){
            pre *= numbers[i + 1];
            numbers.splice(0, 1, pre);
        }
        else{
            return numbers[0];
        }
    });
    opArr = []
    opArr.push(numbers[0]);
    updateScreen();
}