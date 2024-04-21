const resultDiv = document.querySelector("#result");
const stacks = [];

//
//click functions for each button
//
function clickNumber(number) {
    // console.log('clicled: ', number);
    const current = getCurrentResult();

    (current === "0") ? 
    resultDiv.innerHTML = number: resultDiv.innerHTML += number

    proccessFontSize();
}

function clickAllClear() {
    setCurrentResult(0);

    clearStacks();

    resetFontSize();
}

function clickToggle() {
    const current = getCurrentResult();
    const toggleResult = eval(`${current}*-1`);

    setCurrentResult(toggleResult);
}

function clickPercentage() {
    const current = getCurrentResult();
    const result =eval(`${current}/100`);

    setCurrentResult(result);

    proccessFontSize();
}

function clickPeriod() {
    const current = getCurrentResult();

    if (current.includes('.')) return;

    setCurrentResult(`${current}.`)

    proccessFontSize();
}

function clickProcessOperator(operator) {
    const current = getCurrentResult();

    stacks.push(current, operator);
    // console.table('stacks', stacks)

    setCurrentResult(0);

    resetFontSize();
}


//
// calculate logic
//
function clickEqualSigh() {
    const current = getCurrentResult();

    stacks.push(current);

    const calculatedResults = calculate();
    setCurrentResult(calculatedResults);

    proccessFontSize();
}

function calculate() {
    const inputStr = stacks.join(" ");
    const result = eval(inputStr); 
    // console.log("inputstr", inputStr);

    clearStacks();

    return result;
}

// functions to get and set the number string of current result panel
function getCurrentResult() {
    return resultDiv.innerHTML;
}

function setCurrentResult(result) {
    resultDiv.innerHTML = result;
}

function clearStacks() {
    stacks.splice(0, stacks.length);
}

//
// overflow fix
//
function proccessFontSize() {
    let resultWidth = parseInt(getComputedStyle(resultDiv).width.slice(0, -2));

    // console.log('resultwidth', resultWidth);

    while(resultWidth > 200) {
        // decrease fontSize by 1px
        let fontSize = getComputedStyle(resultDiv).fontSize.slice(0, -2);
        resultDiv.style.fontSize = `${fontSize-1}px`;

        // recalculate the result for the next while loop
        resultWidth = parseInt(getComputedStyle(resultDiv).width.slice(0, -2));
    }
}

function resetFontSize() {
    resultDiv.style.fontSize = "48px";
}