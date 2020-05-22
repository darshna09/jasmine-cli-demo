function calculate(inputValue) {
    const regularExpression = /\+|\-|\*|\//;
    
    const numbers = inputValue.split(regularExpression);
    const numberA = parseInt(numbers[0]);
    const numberB = parseInt(numbers[1]);

    const operation = inputValue.match(regularExpression);

    if (Number.isNaN(numberA) || Number.isNaN(numberB) || !operation) {
        return updateResult("Operation is not recognized");
    }

    const calculator = new Calculator();
    calculator.add(numberA);

    let result;

    switch(operation[0]) {
        case "+":
            result = calculator.add(numberB);
            break;
        case "-":
            result = calculator.subtract(numberB);
            break;
        case "*":
            result = calculator.multiply(numberB);
            break;
        case "/":
            result = calculator.divide(numberB);
            break;
    }

    updateResult(result);
}

function updateResult(result) {
    const resultEle = document.getElementById("result");
    if (resultEle) {
        resultEle.innerText = result;
    }
}

function updateVersion() {
    const calculator = new Calculator();
    const versionElement = document.getElementById("version");
    calculator.version.then(function(version) {
        versionElement.innerText = version;
    });
}