const display = document.querySelector(".display");
const clearBtn = document.querySelector(".clear");
const equalBtn = document.querySelector(".equal");
const decimalBtn = document.querySelector(".decimal");
const operatorBtns = document.querySelectorAll(".operator");
const numberBtns = document.querySelectorAll(".number");

let firstOperand = "";
let secondOperand = "";
let currentOperator = null;
let shouldResetDisplay = false;
function clear() {
  display.textContent = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = null;
}

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

function chooseOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstOperand = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null) return;
  if (currentOperator === "÷" && display.textContent === "0") {
    alert("You cannot divide by 0!");
    clear();
    return;
  }
  secondOperand = display.textContent;
  display.textContent = operate(currentOperator, firstOperand, secondOperand);
  currentOperator = null;
}

function add(a, b) {
  return Number(a) + Number(b);
}

function subtract(a, b) {
  return Number(a) - Number(b);
}

function multiply(a, b) {
  return Number(a) * Number(b);
}

function divide(a, b) {
  if (Number(b) === 0) return null;
  return Number(a) / Number(b);
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    default:
      return null;
  }
}

numberBtns.forEach((button) => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", () => chooseOperator(button.textContent));
});

equalBtn.addEventListener("click", evaluate);

clearBtn.addEventListener("click", clear);

decimalBtn.addEventListener("click", () => {
  if (shouldResetDisplay) {
    display.textContent = "0.";
    shouldResetDisplay = false;
    return;
  }
  if (display.textContent.includes(".")) return;
  display.textContent += ".";
});
