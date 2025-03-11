let opArr = [];
let buttons = document.querySelectorAll('button');
let display = document.querySelector('.display');

buttons.forEach(button => {
    button.addEventListener('click', ()=>{
        if(isNum(button.id)){
            opArr.push(button.id);
            updateScreen();
        }
        if(isOperation(button.id)){
            opArr.push(button.textContent);
            updateScreen();
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
            handleDeicmal();
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