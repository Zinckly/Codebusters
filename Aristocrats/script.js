// Fetch a random quote from the Quotable API and log it to the console

fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        console.log(`"${data.content}" — ${data.author}`);
    })
    .catch(error => {
        console.error('Error fetching quote:', error);
    });