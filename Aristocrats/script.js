// Fetch a random quote from the Quotable API and log it to the console
var quote = "";
var author = "";
fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        console.log(`"${data.content}" — ${data.author}`);
        quote = data.content;
        author = data.author;
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    });

var length = quote.length;
for (var i = 0; i < length; i++) {
    document.getElementById("quoteBox").innerHTML += "<span class = 'letter'><button id = 'letterBox'>H</button></span>";
}