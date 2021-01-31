'use strict';

const bookContainer = document.querySelector('.book__text');
const bookLinks = document.querySelectorAll('.book-link');
const mostUsedContainer = document.querySelector('.most-used');
const leastUsedContainer = document.querySelector('.least-used');
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');
const searchResultContainer = document.querySelector('.search__results');

let book;
let searchArray;

// LOADING BOOK
const loadBook = async function (link) {
  book = await (await fetch(link)).text();
  const text = book.replace(/(?:\r\n|\r|\n)/g, '<br>');
  bookContainer.innerHTML = '';
  mostUsedContainer.innerHTML = '';
  leastUsedContainer.innerHTML = '';
  bookContainer.insertAdjacentHTML('afterbegin', text);
  bookContainer.scrollTop = 0;

  // Calling the function to display the infos
  words();
};

bookLinks.forEach(book =>
  book.addEventListener('click', function () {
    const link = book.dataset.link;
    loadBook(link);
  })
);

// TOP and LEAST WORDS function
const words = function () {
  const wordsArray = book
    .toLowerCase()
    .replace(/(?:\r\n|\r|\n|(--)|\-|\(|\'|\"|\,|\.|\;|\:|\?|\!|\)|\[|\])/g, ' ')
    .split(' ');

  // Creating an Object with words as keys and number as values
  const wordsCount = {};
  for (let i = 0; i < wordsArray.length; i++) {
    if (wordsArray[i] in wordsCount) {
      wordsCount[wordsArray[i]]++;
    } else {
      wordsCount[wordsArray[i]] = 1;
    }
  }

  // Sorted array of the previous object
  const orderedWordCount = Object.entries(wordsCount).sort(
    (a, b) => b[1] - a[1]
  );

  // Copying the array for the search function (to include the common words in the search)
  searchArray = orderedWordCount;

  // Filtering out the common words
  const commonWords = [
    'a',
    'able',
    'about',
    'across',
    'after',
    'all',
    'almost',
    'also',
    'am',
    'among',
    'an',
    'and',
    'any',
    'are',
    'as',
    'at',
    'be',
    'because',
    'been',
    'but',
    'by',
    'can',
    'cannot',
    'could',
    'dear',
    'did',
    'do',
    'does',
    'either',
    'else',
    'ever',
    'every',
    'for',
    'from',
    'get',
    'got',
    'had',
    'has',
    'have',
    'he',
    'her',
    'hers',
    'him',
    'his',
    'how',
    'however',
    'i',
    'if',
    'in',
    'into',
    'is',
    'it',
    'its',
    'just',
    'least',
    'let',
    'like',
    'likely',
    'may',
    'me',
    'might',
    'most',
    'must',
    'my',
    'neither',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'often',
    'on',
    'one',
    'only',
    'or',
    'other',
    'our',
    'out',
    'own',
    'rather',
    'said',
    'say',
    'says',
    'she',
    'should',
    'since',
    'so',
    'some',
    'than',
    'that',
    'the',
    'their',
    'them',
    'then',
    'there',
    'these',
    'they',
    'this',
    'tis',
    'to',
    'too',
    'twas',
    'up',
    'us',
    'wants',
    'was',
    'we',
    'were',
    'what',
    'when',
    'where',
    'which',
    'while',
    'who',
    'whom',
    'why',
    'will',
    'with',
    'would',
    'yet',
    'you',
    'your',
    "ain't",
    "aren't",
    "can't",
    "could've",
    "couldn't",
    "didn't",
    "doesn't",
    "don't",
    "hasn't",
    "he'd",
    "he'll",
    "he's",
    "how'd",
    "how'll",
    "how's",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "isn't",
    "it's",
    "might've",
    "mightn't",
    "must've",
    "mustn't",
    "shan't",
    "she'd",
    "she'll",
    "she's",
    "should've",
    "shouldn't",
    "that'll",
    "that's",
    "there's",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "wasn't",
    "we'd",
    "we'll",
    "we're",
    "weren't",
    "what'd",
    "what's",
    "when'd",
    "when'll",
    "when's",
    "where'd",
    "where'll",
    "where's",
    "who'd",
    "who'll",
    "who's",
    "why'd",
    "why'll",
    "why's",
    "won't",
    "would've",
    "wouldn't",
    "you'd",
    "you'll",
    "you're",
    "you've",
    '�',
    '',
    's',
    't',
  ];
  const filteredArray = orderedWordCount.filter(
    word => !commonWords.includes(word[0])
  );

  // Display top 5
  const top5 = filteredArray.slice(0, 5);
  top5.forEach(word => {
    mostUsedContainer.insertAdjacentHTML(
      'beforeend',
      `<li>${word[0].toUpperCase()}: found ${word[1]} times</li>`
    );
  });

  // Display least  5
  const least5 = filteredArray.slice(-5, filteredArray.length);
  least5.forEach(word => {
    leastUsedContainer.insertAdjacentHTML(
      'beforeend',
      `<li>${word[0].toUpperCase()}: found ${word[1]} time</li>`
    );
  });
};

// SEARCH FUNCTION
const search = function () {
  const word = searchInput.value.toLowerCase().trim();
  searchResultContainer.innerHTML = '';
  if (searchArray.flat().includes(word)) {
    const result = searchArray.find(w => w[0] === word);
    searchResultContainer.insertAdjacentHTML(
      'afterbegin',
      `${result[0].toUpperCase()}: found ${result[1]} time(s)`
    );
  } else {
    searchResultContainer.insertAdjacentHTML('afterbegin', `Word not found`);
  }
};
searchBtn.addEventListener('click', search);
