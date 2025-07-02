function scramble(arr) {
    arr = arr.slice(); // Create a copy of the array to avoid modifying the original
    console.log("scrambling");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function checkWin() {
    const buttons = document.querySelectorAll('button');
    let win = true;
    buttons.forEach(button => {
        if (button.textContent === '') {
            win = false;
        }
    });
    if (win) {
        alert("You win! The quote was: " + quote + " — " + author);
        //location.reload();
    }
}

let lastClickedButton = null;

document.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        lastClickedButton = e.target;
    }
});

document.addEventListener('keydown', function (e) {
    if (!lastClickedButton) return;
    const key = e.key;
    if (key === 'Delete' || key === 'Backspace') {
        console.log("deleting");
        lastClickedButton.innerHTML = "<p></p>";
        return;
    }
    const upperKey = key.toUpperCase();
    if (upperKey.length === 1 && upperKey >= 'A' && upperKey <= 'Z') {
        lastClickedButton.innerHTML = "<p>" + upperKey + "</p>";
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

    var ee = quote.length;

    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    var cipherText = scramble(alphabet);

    document.getElementById("quoteBox").innerHTML = "<div class = 'word'>";

    for (var i = 0; i < ee; i++) {
        if (quote[i] === " ") {
            document.getElementById("quoteBox").innerHTML += "</div><div class = 'word'>";
            continue;
        }
        switch (quote[i]) {
            case ".":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>.</span>";
                continue;
            case ",":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>,</span>";
                continue;
            case "?":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>?</span>";
                continue;
            case "!":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>!</span>";
                continue;
            case "'":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>'</span>";
                continue;
            case "-":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>-</span>";
                continue;
            case "—":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>—</span>";
                continue;
            case "“":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>“</span>";
                continue;
            case "”":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>”</span>";
                continue;
            case "‘":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>‘</span>";
                continue;
            case "’":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>’</span>";
                continue;
            case ":":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>:</span>";
                continue;
            case ";":
                document.getElementById("quoteBox").innerHTML += "<span class = 'symbol'>;</span>";
                continue;
            default:
                // For letters, create a span with the ciphered text
                break;
        }
        document.getElementById("quoteBox").innerHTML += "<span class = 'cipherText'><p>" + cipherText[alphabet.indexOf(quote[i])] + "</p><button class = 'letterBox'></button></span>";
    }
});