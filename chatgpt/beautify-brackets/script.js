function parseText() {
    var inputText = document.getElementById("inputTextarea").value;
    const formattedText = formatInputText(inputText);
    document.getElementById("outputDiv").innerText = formattedText;
}

function formatInputText(input) {
    let formattedText = "";
    let indentLevel = 0;
    var inQuote = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === "\""){
            inQuote = !inQuote;
        }

        var openBracketRegExp = /[{[\(]/;
        if (openBracketRegExp.test(char)) {
            indentLevel++;
            formattedText += char + "\n" + " ".repeat(indentLevel * 4);
        } else if (shouldEndLine(char,inQuote)){
            formattedText += char + "\n" + " ".repeat(indentLevel * 4);
        }
        else if (char === '}' || char === ']') {
            indentLevel = Math.max(0, indentLevel - 1);
            formattedText += "\n" + " ".repeat(indentLevel * 4) + char;
        } else {
            formattedText += char;
        }
    }

    return formattedText;
}

function shouldEndLine(char, inQuote){
    if (char === ',' &&  inQuote == false){
        return true;
    }
    return false;
}

