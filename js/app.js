/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
let counter = 0;
let sec = 0;
function shuffle(array) {
    let currentIndex = array.length; let temporaryValue; let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
/**
 * Helper to gameOwn.
 */
function gameOwn() {
    // total-moves total-stars
    clearInterval(timeticker);
    document.getElementsByClassName('total-moves')[0].textContent = counter;
    document.getElementsByClassName('total-stars')[0].textContent = calculateStars();
    document.getElementsByClassName('gameown-wrapper')[0].style.display = 'block';
}

function playAgain() {
    location.reload();
}
/**
 * Helper function to calculate stars.
 */
function calculateStars() {
    let starts = 3;
    if (counter <= 20) {
        starts = 1;
    } else if (counter > 20 && counter <= 30) {
        starts = 2;
    }
    return starts;
}

let timeticker = setInterval(timer, 1000);
/**
 * Timer function.
 */
function timer() {
    sec++;
    document.getElementsByClassName('timer')[0].textContent = sec;
}


function clickEventListener(e) {
    // Total number of open card should be less than are equal to one.
    // Selected cards should not the open card/ already match card.
    if (document.querySelectorAll('.card.open').length <= 1 && this.classList.contains('open') === false && this.classList.contains('match') === false) {
        counter++;
        document.querySelector('.moves').textContent = counter;
        this.classList.add('open');
        this.classList.add('show');
        findCardIsMatch(e);
    }
}

/**
 *  If card is match - Add match class.
 *  If card is not match - Remove the open class from two cards.
 * @param {event} e
 */
function findCardIsMatch(e) {
    if (document.querySelectorAll('.card.open').length === 2) {
        const openCard = document.querySelectorAll('.card.open i');
        if (openCard[0].classList[1] === openCard[1].classList[1]) {
            openCard[0].parentElement.classList.add('match');
            openCard[1].parentElement.classList.add('match');
            openCard[0].parentElement.classList.remove('open');
            openCard[1].parentElement.classList.remove('open');
            if (document.querySelectorAll('.card.match').length === 16) {
                gameOwn();
            }
        } else {
            openCard[0].parentElement.classList.add('error');
            openCard[1].parentElement.classList.add('error');
            setTimeout(() => {
                openCard[0].parentElement.classList.remove('show', 'open');
                openCard[1].parentElement.classList.remove('show', 'open');
                openCard[0].parentElement.classList.remove('error');
                openCard[1].parentElement.classList.remove('error');
            }, 500);
        }
    }
}

const signs = ['fa-diamond', 'fa-paper-plane-o', 'fa-diamond', 'fa-anchor', 'fa-leaf', 'fa-bomb', 'fa-paper-plane-o', 'fa-bolt', 'fa-anchor', 'fa-bicycle', 'fa-cube', 'fa-leaf', 'fa-cube', 'fa-bicycle', 'fa-bomb', 'fa-bolt'];
function cardShuffler(e) {
    counter = 0;
    sec = 0;
    document.querySelector('.moves').textContent = counter;
    const shuffledArray = shuffle(signs);
    const allCards = document.querySelectorAll('.deck li i');
    for (const i in shuffledArray) {
        allCards[i].parentElement.classList.remove('show', 'open', 'match');
        allCards[i].classList = '';
        allCards[i].classList.add('fa', shuffledArray[i]);
    }
}

// Adding Event listeners for card boxs.
const cards = document.getElementsByClassName('card');
if (cards) {
    for (const card of cards) {
        card.addEventListener('click', clickEventListener);
    }
}


cardShuffler();

const restart = document.querySelector('.restart');
restart.addEventListener('click', cardShuffler);

const playagain = document.querySelector('.play-again');
playagain.addEventListener('click', playAgain);



