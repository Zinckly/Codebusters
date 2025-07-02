function scramble(arr) {
    arr = arr.slice(); // Create a copy of the array to avoid modifying the original
    console.log("scrambling");
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

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

    for (var i = 0; i < ee; i++) {
        if (quote[i] === " ") {
            document.getElementById("quoteBox").innerHTML += "<div class = 'cipherText'><p> </p><button>H</button></div>";
            continue;
        }
        document.getElementById("quoteBox").innerHTML += "<div class = 'cipherText'><p>" + cipherText[alphabet.indexOf(quote[i])] + "</p><button>H</button></div>";
    }
});