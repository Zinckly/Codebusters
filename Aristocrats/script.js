function scramble(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

var quote = "";
var author = "";
fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        console.log(`"${data.content}" — ${data.author}`);
        quote = data.content.toUpperCase();
        author = data.author;
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
        alert("Error fetching quote. Try going to https://api.quotable.io/random directly in your browser and come back again.");
    });

var length = quote.length;

var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var cipherText = scramble(alphabet);

for (var i = 0; i < length; i++) {
    document.getElementById("quoteBox").innerHTML += "<div class = 'cipherText'><p>" + cipherText[alphabet.indexOf(quote[i])] + "</p><button>H</button></div>";
}