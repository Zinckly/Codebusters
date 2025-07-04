function checkWin() {
    const buttons = document.getElementsByClassName('letterBox');
    var answerText = "";
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        answerText += button.innerText;
    }
    cleanQuote = quote.replace(/ /g, "").replace(/\.|,|\?|!|'|-|—|“|”|‘|’|:|;|0|1|2|3|4|5|6|7|8|9/g, "");
    if (answerText === cleanQuote) {
        stopTimer();
        document.getElementById("time").style.color = "green";
        document.getElementById("time").style.fontWeight = "bold";
        if (autoReload()) {
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }
}

function reset() {
    const buttons = document.getElementsByClassName('letterBox');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].innerHTML = "<p></p>";
    }
    setTimeout(() => {
        document.getElementById(0).focus();
    }, 100);
}

function autoReload() {
    console.log("autoReload called");
    const toggle = document.getElementById("toggle");
    console.log(toggle.checked);
    if (toggle.checked) {
        localStorage.setItem("autoReload", "true");
    } else {
        localStorage.setItem("autoReload", "false");
    }
    return toggle.checked;
}

let minute = 0;
let second = 0;
function updateTime() {
    second++;
    if (second >= 60) {
        second = 0;
        minute++;
    }
    document.getElementById("minute").innerText = String(minute).padStart(2, '0');
    document.getElementById("second").innerText = String(second).padStart(2, '0');
}
function stopTimer() {
    if (window.timerInterval) {
        clearInterval(window.timerInterval);
    }
}

function toggleKey() {
    console.log("toggleKey called");
    const keyBox = document.getElementById("keyBox");
    const display = window.getComputedStyle(keyBox).display;
    if (display === "none") {
        keyBox.style.display = "block";
    } else {
        keyBox.style.display = "none";
    }
}

let lastClickedButton = null;

document.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        lastClickedButton = e.target;
        lastClickedButton.focus();
    }
});

document.addEventListener('keydown', function (e) {

    if (document.activeElement.classList.contains('letterBox') === false) {
        return;
    }

    var spaceCount = 0;
    for (let i = 0; i < quote.length; i++) {
        if (quote[i] === " " || quote[i] === "." || quote[i] === "," || quote[i] === "?" || quote[i] === "!" || quote[i] === "'" || quote[i] === "-" || quote[i] === "—" || quote[i] === "“" || quote[i] === "”" || quote[i] === "‘" || quote[i] === "’" || quote[i] === ":" || quote[i] === ";") {
            spaceCount++;
        }
    }

    const lastClickedButton = document.activeElement;
    if (!lastClickedButton) return;
    const key = e.key;
    if (key === 'Delete' || key === 'Backspace') {
        console.log("deleting");
        lastClickedButton.innerHTML = "<p></p>";
        document.getElementById((parseInt(lastClickedButton.id, 10) + 1) % (quote.length - spaceCount)).focus();
        return;
    }
    if (key === 'Right' || key === 'ArrowRight') {
        const id = lastClickedButton.id;
        document.getElementById((parseInt(id, 10) + 1) % (quote.length - spaceCount)).focus();
        return;
    }
    if (key === 'Left' || key === 'ArrowLeft') {
        const id = lastClickedButton.id;
        document.getElementById((parseInt(id, 10) - 1 + (quote.length - spaceCount)) % (quote.length - spaceCount)).focus();
        return;
    }
    const upperKey = key.toUpperCase();
    if (upperKey.length === 1 && upperKey >= 'A' && upperKey <= 'Z') {
        lastClickedButton.innerHTML = "<p>" + upperKey + "</p>";

        // Find the next empty button after the current one
        let nextId = (parseInt(lastClickedButton.id, 10) + 1) % (quote.length - spaceCount);
        let nextBtn = document.getElementById(nextId);
        let startId = nextId;
        while (nextBtn && nextBtn.innerText !== "" && nextId !== parseInt(lastClickedButton.id, 10)) {
            nextId = (nextId + 1) % (quote.length - spaceCount);
            nextBtn = document.getElementById(nextId);
            if (nextId === startId) break; // Prevent infinite loop
        }
        if (nextBtn && nextBtn.innerText === "") {
            nextBtn.focus();
        }
        checkWin();
    }
});

var quote;
var author;
async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        console.log(`"${data.content}" — ${data.author}`);
        quote = data.content.toUpperCase();
        author = data.author;
    } catch (error) {
        console.error('Error fetching quote:', error);
        alert("Error fetching quote. Try going to https://api.quotable.io/random directly in your browser and come back again.");
    }
}
fetchQuote().then(() => {

    if (localStorage.getItem("autoReload") === "true") {
        document.getElementById("toggle").checked = true;
    }

    quote = quote.replace(/ /g, "").replace(/\.|,|\?|!|'|-|—|“|”|‘|’|:|;|0|1|2|3|4|5|6|7|8|9/g, "");

    var ee = quote.length;
    var cipher = "";

    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var cipherText = ["AAAAA", "AAAAB", "AAABA", "AAABB", "AABAA", "AABAB", "AABBA", "AABBB", "ABAAA", "ABAAA", "ABAAB", "ABABA", "ABABB", "ABBAA", "ABBAB", "ABBBA", "ABBBB", "BAAAA", "BAAAB", "BAABA", "BAABB", "BAABB", "BABAA", "BABAB", "BABBA", "BABBB"];

    let quoteBoxHTML = "";

    var spaceCount = 0;

    let inWord = false;

    for (let i = 0; i < ee; i++) {
        const char = quote[i];

        if (char === " ") {
            if (inWord) {
                spaceCount++;
                quoteBoxHTML += "</div>";
                inWord = false;
            }
            continue;
        }

        if (!inWord) {
            quoteBoxHTML += "<div class='word'>";
            inWord = true;
        }

        // Handle punctuation
        if (".,?!'—“”‘’:;-0123456789".includes(char)) {
            quoteBoxHTML += `<span class='symbol'>${char}</span>`;
            spaceCount++;
        } else {
            cipher += cipherText[alphabet.indexOf(char)];
            quoteBoxHTML += `<span class='cipherText'><p>${cipherText[alphabet.indexOf(char)]}</p><button class='letterBox' id='${i - spaceCount}'></button></span>`;
        }
    }

    console.log("cipher: " + cipher);

    // Close any open word div at the end
    if (inWord) {
        quoteBoxHTML += "</div>";
    }

    document.getElementById("quoteBox").innerHTML = quoteBoxHTML;

    // Focus on the first button after all buttons are rendered
    setTimeout(() => {
        const firstButton = document.getElementById("0");
        if (firstButton) {
            firstButton.focus();
        }
    }, 0);

    window.timerInterval = setInterval(updateTime, 1000);

});