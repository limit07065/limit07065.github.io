const key = "inputText";

function loadText() {
    var text = getSessionCookie(key);
    if (text != null) {
        document.getElementById("inputTextarea").value = text;
    }
}

function parseText() {
    var inputText = document.getElementById("inputTextarea").value;
    setSessionCookie(key, inputText);
    const formattedText = formatInputText(inputText);

    document.getElementById("outputDiv").innerText = formattedText;
}

function formatInputText(input) {
    let formattedText = " ";
    let indentLevel = 0;
    var inQuote = false;
    var justEndLine = false;

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char === "\"") {
            inQuote = !inQuote;
        }

        var openBracketRegExp = /[{\[\(]/;
        var closeBracketRegExp = /[}\]\)]/;
        if (openBracketRegExp.test(char)) {
            indentLevel++;
            formattedText += char + "\n" + " ".repeat(indentLevel * 4);

        } else if (closeBracketRegExp.test(char)) {
            indentLevel = Math.max(0, indentLevel - 1);
            formattedText += "\n" + " ".repeat(indentLevel * 4) + char;
            justEndLine = true;

        } else if (shouldEndLine(char, inQuote)) {
            formattedText += char + "\n" + " ".repeat(indentLevel * 4);
            justEndLine = false;

        } else {
            if (justEndLine) {
                formattedText += "\n" + " ".repeat(indentLevel * 4);
                justEndLine = false;
            }
            formattedText += char;
        }
    }

    return formattedText;
}

function shouldEndLine(char, inQuote) {
    if (char === ',' && inQuote == false) {
        return true;
    }
    return false;
}

// Function to set a session cookie
function setSessionCookie(name, value) {
    const cookieValue = encodeURIComponent(value);
    document.cookie = `${name}=${cookieValue}; path=/`;
}

// Function to get the value of a cookie by its name
function getSessionCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return decodeURIComponent(cookieValue);
        }
    }
    return null; // Cookie not found
}

loadText();
