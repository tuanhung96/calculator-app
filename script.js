import { Calculator } from "./calculator.js";

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const previousExpressionElement = document.querySelector(
  ".previous-expression"
);
const currentExpressionElement = document.querySelector(".current-expression");

const calculator = new Calculator(
  previousExpressionElement,
  currentExpressionElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendOperation(button.innerText);
  });
});

clearButton.addEventListener("click", () => {
  calculator.clear();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
});
