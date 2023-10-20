export class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.previousView = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number;
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.previousView = `${this.currentOperand} ${this.operation}`;
    this.currentOperand = "";
    this.updateDisplay();
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      default:
        return;
    }
    this.previousView = `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
    this.currentOperand = result.toString();
    this.previousOperand = "";
    this.operation = undefined;
    this.updateDisplay();
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
    this.previousOperandElement.innerText = this.previousView;
  }
}
