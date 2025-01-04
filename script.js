const buttons = document.getElementsByClassName('button');
const output = document.getElementById('output');
const input = document.getElementById('input');
const negative = document.getElementById('negative');

const opList = ["+", "-", "÷", "x"];
let inputStr = '';
let lastChar = '';
let lastInput = '';

// Loop through each button
for (let button of buttons) {
  button.addEventListener('click', function() {
    if (button.id === "all-clear") {
      inputStr = '';
      input.textContent = '';
      output.textContent = '';
    } 
    else if (button.id === "delete") {
      inputStr = inputStr.slice(0, -1);
      input.textContent = '';
    } 
    else if (button.id === "equal") {
      try {
        lastInput = inputStr;
        inputStr = eval(inputStr.replace(/ ÷ /g, '/').replace(/ x /g, '*').replace(/ + /g, '+').replace(/ - /g, '-')).toString();
        input.textContent = lastInput;
        output.textContent = inputStr;
      } catch (error) {
        output.textContent = "Error";
      }
    } 
    else if (button.id === "negative") {
      if (inputStr.length > 0 && !opList.includes(lastChar)) {
        inputStr = inputStr.slice(0, -1) + '(-' + lastChar + ')';
      }
    }
    else if (!(button.classList.contains('operator') && opList.includes(lastChar))) {
      inputStr += button.dataset.value;
    }
    lastChar = inputStr.trim().slice(-1);
    console.log("lastChar: " + lastChar);
    output.textContent = inputStr;
    console.log("inputStr: " + inputStr);
  });
}
