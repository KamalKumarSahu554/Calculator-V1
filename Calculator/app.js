document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");
  const result = document.querySelector(".result");
  let currentInput = "";
  let operator = "";
  let previousInput = "";

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const value = this.textContent;

      if (value === "AC") {
        currentInput = "";
        operator = "";
        previousInput = "";
        result.textContent = "0";
      } else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        result.textContent = currentInput || "0";
      } else if (value === "%") {
        currentInput = (parseFloat(currentInput) / 100).toString();
        result.textContent = currentInput;
      } else if (value === "=") {
        if (operator && previousInput) {
          currentInput = calculate(previousInput, operator, currentInput);
          operator = "";
          previousInput = "";
          result.textContent = currentInput;
        }
      } else if (["+", "-", "X", "/"].includes(value)) {
        if (currentInput) {
          if (operator && previousInput) {
            currentInput = calculate(previousInput, operator, currentInput);
          }
          operator = value;
          previousInput = currentInput;
          currentInput = "";
        }
      } else {
        currentInput += value;
        result.textContent = currentInput;
      }
    });
  });

  function calculate(a, operator, b) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    switch (operator) {
      case "+":
        return (numA + numB).toString();
      case "-":
        return (numA - numB).toString();
      case "X":
        return (numA * numB).toString();
      case "/":
        return (numA / numB).toString();
      default:
        return "";
    }
  }
});
