let display = document.querySelector(".display");
let button = document.querySelectorAll(".button");
let finalExpression = [];
let equalPressed = false;

function specialButtonsType() {
    let k = display.textContent.charAt(display.textContent.length - 1);
    if (k >= '0' && k <= '9' || k === '.') {
        display.innerHTML += key;
    } else {
        return false;
    }
    return true;
}

function gettingNumber() {
    let num = "";
    for (let i = display.textContent.length - 2; i >= 0; i--) {
        if (!/^[0-9.]$/.test(display.textContent.charAt(i))) break;
        else {
            num += display.textContent.charAt(i);
        }
    }
    num = num.split("").reverse().join("");
    return num;
}

function gettingNumberForRes() {
    let num = "";
    for (let i = display.textContent.length - 1; i >= 0; i--) {
        if (!/^[0-9.]$/.test(display.textContent.charAt(i))) break;
        else {
            num += display.textContent.charAt(i);
        }
    }
    num = num.split("").reverse().join("");
    return num;
}

function remove(i) {
    finalExpression.splice(i - 1, 3, finalExpression[i]);
}

function result() {
    for (let i = finalExpression.length - 1; i >= 0; i--) {
        if (!/^[0-9.]$/.test(finalExpression[i])) {
            let op2 = parseFloat(finalExpression[i + 1]);
            let op1 = parseFloat(finalExpression[i - 1]);
            switch (finalExpression[i]) {
                case '*':
                    finalExpression[i] = (op1 * op2).toString();
                    remove(i);
                    break;
                case '/':
                    finalExpression[i] = (op1 / op2).toString();
                    remove(i);
                    break;
                case '%':
                    finalExpression[i] = (op1 % op2).toString();
                    remove(i);
                    break;
                case '-':
                    finalExpression[i] = (op1 - op2).toString();
                    remove(i);
                    break;
            }
        }
    }
    for (let i = finalExpression.length - 1; i >= 0; i--) {
        if (!/^[0-9.]$/.test(finalExpression[i])) {
            let op2 = parseFloat(finalExpression[i + 1]);
            let op1 = parseFloat(finalExpression[i - 1]);
            switch (finalExpression[i]) {
                case '+':
                    finalExpression[i] = (op1 + op2).toString();
                    remove(i);
                    break;
                case '-':
                    finalExpression[i] = (op1 - op2).toString();
                    remove(i);
                    break;
            }
        }
    }
    return finalExpression[0];
}

for (let i = 0; i < 19; i++) {
    button[i].addEventListener("click", function type() {
        if (display.textContent.length < 17) {
            key = button[i].textContent;
            switch (key) {
                case "C":
                    finalExpression = [];
                    display.innerHTML = "0";
                    break;
                case "=":
                    let k = display.textContent.charAt(display.textContent.length - 1);
                    if (!/^[0-9]$/.test(k)) {
                        display.innerHTML = "Syntax Error";
                    } else {
                        finalExpression.push(gettingNumberForRes());
                        display.innerHTML = result();
                        finalExpression = [];
                    }
                    break;
                case "+":
                case "-":
                case "X":
                case "/":
                case "%":
                    if (specialButtonsType()) {
                        finalExpression.push(gettingNumber());
                        finalExpression.push(key === "X" ? "*" : key);
                    }
                    break;
                case "+/-":
                    break;
                case ".":
                    if (!display.textContent.includes('.')) {
                        display.innerHTML += key;
                    }
                    break;
                default:
                    if (display.textContent == "0") {
                        display.innerHTML = key;
                    } else {
                        display.innerHTML += key;
                    }
                    break;
            }
        }
    });
}
