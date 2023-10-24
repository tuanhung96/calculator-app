export class Calculator {
  constructor(previousExpressionElement, currentExpressionElement) {
    this.previousExpressionElement = previousExpressionElement;
    this.currentExpressionElement = currentExpressionElement;
    this.clear();
  }

  clear() {
    this.currentExpression = "";
    this.previousExpression = "";
    this.updateDisplay();
  }

  delete() {
    this.currentExpression = this.currentExpression.slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    // if (number === "." && this.currentExpression.includes(".")) return;
    this.currentExpression += number;
    this.updateDisplay();
  }

  appendOperation(operation) {
    if (this.currentExpression === "") return;
    this.currentExpression += operation;
    this.updateDisplay();
  }

  compute() {
    const postfix = this.convertToPostfix();
    console.log(postfix);
    const result = this.calculatePostfix(postfix);
    console.log(result);
    this.previousExpression = this.currentExpression;
    this.currentExpression = result.toString();
    this.updateDisplay();
  }

  convertToPostfix() {
    const stack = [];
    let output = [];
    let input = this.currentExpression;
    let n = input.length;

    let i = 0;
    while (i < n) {
      // Nếu là dấu ngoặc mở "("" thì đưa vào stack
      if (input[i] === "(") {
        stack.push(input[i]);
        i++;
      }
      // Nếu là ")" thì đưa các phần tử trong stack vào biểu thức hậu tố,
      // cho tới khi lấy ra tới phần tử ( thì dừng
      else if (input[i] === ")") {
        while (stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        stack.pop();
        i++;
      }
      // Nếu là toán hạng thì nối nó vào biểu thức hậu tố.
      else if (input[i] >= "0" && input[i] <= "9") {
        let number = "";
        while (
          i < n &&
          ((input[i] >= "0" && input[i] <= "9") || input[i] === ".")
        ) {
          number += input[i];
          i++;
        }
        output.push(number);
      }
      // Nếu là các toán tử lấy ra các phần tử trong ngăn xếp có độ ưu tiên lớn hơn hoặc bằng input[i],
      // nối vào biểu thức hậu tố tới khi phần tử ở đỉnh ngăn xếp có độ ưu tiên nhỏ hơn input[i] hoặc stack rỗng
      else {
        while (
          stack.length !== 0 &&
          this.getPriority(stack[stack.length - 1]) >=
            this.getPriority(input[i])
        ) {
          output.push(stack.pop());
        }

        stack.push(input[i]);
        i++;
      }
    }

    // đưa các phần tử còn lại tron stack vào biểu thức hậu tố
    while (stack.length !== 0) {
      output.push(stack.pop());
    }

    return output;
  }

  calculatePostfix(postfix) {
    const stack = [];
    for (const s of postfix) {
      // nếu toán tử là căn bậc 2
      if (s.charCodeAt(0) === 8730) {
        let x = stack.pop();
        stack.push(Math.sqrt(x));
      } else if (
        s === "+" ||
        s === "-" ||
        s === "*" ||
        s === "/" ||
        s === "^"
      ) {
        let x = stack.pop();
        let y = stack.pop();

        switch (s) {
          case "^":
            stack.push(Math.pow(y, x));
            break;
          case "+":
            stack.push(y + x);
            break;
          case "-":
            stack.push(y - x);
            break;
          case "*":
            stack.push(y * x);
            break;
          case "/":
            stack.push(y / x);
            break;
          default:
            break;
        }
      } else {
        stack.push(parseFloat(s));
      }
    }
    return stack.pop();
  }

  getPriority(x) {
    if (x.charCodeAt(0) === 8730 || x === "^") return 3;
    else if (x === "*" || x === "/") return 2;
    else if (x === "+" || x === "-") return 1;
    else if (x === "(") return 0;
  }

  updateDisplay() {
    this.currentExpressionElement.innerText = this.currentExpression;
    this.previousExpressionElement.innerText = this.previousExpression;
  }
}
