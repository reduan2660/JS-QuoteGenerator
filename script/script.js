const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let errorCounter = parseInt(0);

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote from API
async function getQuote() {
  if (errorCounter >= 10) {
    authorText.innerText = "";
    quoteText.innerText = "There was an error, Please refresh the window";
  } else {
    showLoadingSpinner();
    const proxyUrl = "https://protected-eyrie-95956.herokuapp.com/";
    const apiUrl =
      "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

    try {
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();

      // If Author is blank, add "Unknown"
      if (data.quoteAuthor === "") {
        authorText.innerText = "Unknown";
      } else {
        authorText.innerText = data.quoteAuthor;
      }

      // Reduce font size for long quotes
      if (data.quoteText.length > 120) {
        quoteText.classList.add("long-quote");
      } else {
        quoteText.classList.remove("long-quote");
      }
      quoteText.innerText = data.quoteText;
      removeLoadingSpinner();
    } catch (error) {
      errorCounter += 1;
      getQuote();
    }
  }
}

// Twitter Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//Event Listener
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
// On load
getQuote();
