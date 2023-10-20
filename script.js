import { Calculator } from "./calculator.js";

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operation");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".delete");
const clearButton = document.querySelector(".clear");
const previousOperandElement = document.querySelector(".previous-operand");
const currentOperandElement = document.querySelector(".current-operand");

const calculator = new Calculator(
  previousOperandElement,
  currentOperandElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
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
