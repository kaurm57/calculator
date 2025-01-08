const buttons = document.getElementsByClassName('button');
const output = document.getElementById('output');
const input = document.getElementById('input');
const negative = document.getElementById('negative');

const opList = ["+", "-", "÷", "x", "."];
let inputStr = '', lastChar = '', lastInput = '';
let isEqualPressed = false;

// Loop through each button
for (let button of buttons) {
  button.addEventListener('click', function() {
    if (isEqualPressed === false) {
      input.textContent = '';
      isEqualPressed = false;
    }

    if (button.id === "all-clear") {
      inputStr = '';
      output.textContent = '';
      isEqualPressed = false;
    }

    else if (button.id === "delete") {
        console.log("str before del: ",  splitStr(inputStr));
        console.log("str after del: ",  splitStr(inputStr).slice(0, -1));
        console.log("str after del: ",  splitStr(inputStr).slice(0, -1).join(''));
        inputStr = splitStr(inputStr).slice(0, -1).join('');
        input.textContent = '';
        isEqualPressed = false;
    } 
    
    else if (button.id === "equal") {
      try {
        lastInput = inputStr;
        inputStr = evaluate(inputStr).toString();
        input.textContent = lastInput;
        output.textContent = inputStr;
      } catch (error) {
        output.textContent = "Error";
        isEqualPressed = true;
      }
    } 
    else if (button.id === "negative") {
      if (inputStr.length > 0 && !opList.includes(lastChar)) {
        inputStr = inputStr.slice(0, -1) + '(-' + lastChar + ')';
      }
      isEqualPressed = false;
    }
    else if (!(button.classList.contains('operator') && opList.includes(lastChar))) {
      inputStr += button.dataset.value;
      isEqualPressed = false;
    }
    lastChar = inputStr.trim().slice(-1);
    output.textContent = inputStr;

    console.log("For", button.id, "splitStr: ", splitStr(inputStr));
    }
);
}

function splitStr(str) {
    const regex = /(\s[+\-x÷]\s)/;
    return str.split(regex).filter(Boolean); // filter removes empty strings
  }

function compute(op, expList) {
    // Create a map of operations
    const operations = {
        ' + ': (a, b) => a + b,
        ' - ': (a, b) => a - b,
        ' x ': (a, b) => a * b,
        ' ÷ ': (a, b) => a / b
    };
    console.log("expList: ", expList);
    console.log("Just checking whats wrong lol, is ", op, " and", "' - ' the same thing?", op === ' - ');
    console.log("Just checking whats wrong lol, is ", expList[1], " and", "' - '(expList one) the same thing?", op === expList[1]);
    console.log("Is", op, " in the list: ", expList.includes(op));

    // Process the operations in correct order
    while (expList.includes(op)) {
        console.log("In while loop for op: ", op);
        let index = expList.indexOf(op);  // Find the operator in the list
        let result = operations[op](Number(expList[index - 1]), Number(expList[index + 1]));  // Perform the operation
        expList.splice(index - 1, 3, result);  // Replace the operator and operands with the result
    }
}


function evaluate(str){
    console.log("In evaluate function for str: ", Array.from(str));
    let expList = splitStr(str);
    console.log("In evaluate function for expList: ", expList);

    // Perform multiplication and division first
    compute(' ÷ ', expList);
    compute(' x ', expList);

    // Perform addition and subtraction next
    compute(' + ', expList);
    compute(' - ', expList);

    return expList[0];
}
