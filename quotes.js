const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const getQuoteBtn = document.querySelector('.getQuote');

async function getQuote() {  
  const url = `https://favqs.com/api/qotd`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = `${data.quote.body}`;
}

document.addEventListener('DOMContentLoaded', getQuote);
getQuoteBtn.addEventListener('click', getQuote);
