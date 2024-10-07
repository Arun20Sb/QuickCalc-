let screen = document.querySelector(".screen");
let btnContainer = document.querySelectorAll(".calc-row");

let runningTotal = 0;
let buffer = "0";
let prevOperator = null;

btnContainer.forEach((container) => {
  container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const btnVal = e.target.textContent;

      if (isNaN(btnVal) && btnVal !== ".") {
        handleSymbol(btnVal);
      } else {
        handleNumber(btnVal);
      }
    }
  });
});

// Handles symbols like C, ←, =, ÷, *, +, and -

function handleSymbol(btnVal) {
  switch (btnVal) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      prevOperator = null;
      screen.textContent = buffer;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.slice(0, -1);
      }
      screen.textContent = buffer;
      break;

    case "=":
      if (!prevOperator) return;
      evaluate(Number(buffer));
      buffer = runningTotal.toString();
      if (buffer === "0") screen.textContent = "Error";
      else screen.textContent = buffer;
      runningTotal = 0;
      prevOperator = null;
      break;

    case "÷":
    case "*":
    case "+":
    case "-":
      handleOperator(btnVal);
      break;

    default:
      break;
  }
}

// Handles the operators and prepares the running total

function handleOperator(operator) {
  if (buffer === "0") return;

  const bufferInt = Number(buffer);

  if (runningTotal === 0 && prevOperator === null) {
    runningTotal = bufferInt;
  } else {
    evaluate(bufferInt);
  }
  screen.textContent = operator;
  prevOperator = operator;
  buffer = "0";
}

// Performs the arithmetic operations based on the previous operator

function evaluate(bufferInt) {
  if (prevOperator === "+") {
    runningTotal += bufferInt;
  } else if (prevOperator === "-") {
    runningTotal -= bufferInt;
  } else if (prevOperator === "*") {
    runningTotal *= bufferInt;
  } else if (prevOperator === "÷") {
    if (bufferInt === 0) {
      screen.textContent = "Error";
      runningTotal = 0;
      return;
    }
    runningTotal /= bufferInt;
  }
}

// Handles numeric and decimal inputs and updates the display buffer

function handleNumber(btnVal) {
  if (btnVal === "." && buffer.includes(".")) return;
  if (buffer === "0") {
    buffer = btnVal;
  } else {
    buffer += btnVal;
  }
  screen.textContent = buffer;
}
