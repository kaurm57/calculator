import * as acorn from 'acorn';

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
        // Parse the input string into an AST
        const ast = acorn.parse(parsedInput, { ecmaVersion: 2020 });
        console.log("AST:", ast);

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
      inputStr = inputStr.slice(0, -1);
      input.textContent = '';
      isEqualPressed = false;
    } 
    
    else if (button.id === "equal") {
      try {
        lastInput = inputStr;
        inputStr = eval(inputStr.replace(/ ÷ /g, '/').replace(/ x /g, '*').replace(/ + /g, '+').replace(/ - /g, '-')).toString();
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
    console.log("lastChar: " + lastChar);
    output.textContent = inputStr;
    console.log("inputStr: " + inputStr);
  });
}

const add = function(a, b) {
    return a + b;
  };
  
  const subtract = function(a, b) {
      return a - b;
  };
  
  const sum = function(arr) {
      return arr.reduce((sum, num) => sum + num, 0);
  };
  
  const multiply = function(arr) {
    return arr.reduce((prod, num)=> prod*num, 1)
  };
