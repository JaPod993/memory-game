// list that holds all cards classes
let cards = ['tiger', 'elephant', 'pig', 'sheep', 'cow', 'cat', 'dog', 'zebra', 'tiger', 'elephant', 'pig', 'sheep', 'cow', 'cat', 'dog', 'zebra'];
let openCards = [];
const deck = document.querySelector(".deck"); //selecting deck list
const fragment = document.createDocumentFragment(); // DocumentFragment wrapper
const moveCounter = document.querySelector(".moves"); //select moves counter
const firstStar = document.querySelector(".first-star"); //firstStar
const secondStar = document.querySelector(".second-star"); //secondStar
const thirdStar = document.querySelector(".third-star"); //thirdStar
let moves = 0; //moves counter
let pairs = 0; //matched pairs counter

let time = '00:00'
let seconds = 0;
let minutes = 0;
let timeTiger = 0;
let t;
const timer = document.querySelector('.timer');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Creating card list
function makeList() {
    deck.innerHTML = '';//cleaning card list
    for (let card of shuffle(cards)) {

        let cardWrap = document.createElement('li');
        cardWrap.classList.add("card-wrap");

        let front = document.createElement('span');
        front.classList.add("front", "card");
        cardWrap.appendChild(front);

        let back = document.createElement('span');
        back.classList.add("back", "card");

        let content = document.createElement('i');
        content.classList.add("svg", `${card}`);
        back.appendChild(content);

        cardWrap.appendChild(back);

        fragment.appendChild(cardWrap);
    }
    //Adding cards
    deck.appendChild(fragment);
}

/*
 * set up the event listener for a card. If a card is clicked:
 * ------ - display the card's symbol (put this functionality in another function that you call from this one)
 * ------ - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 * ------ - if the list already has another card, check to see if the two cards match
 * ------ - if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 * ------ - if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 * ------ - increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//Reset after button click
const restart = document.querySelector(".restart");
restart.addEventListener('click', function (e) {
    e.preventDefault();
    makeList();
    resetMoves();
    resetStars();
    resetTimer();
});

//reset moves
function resetMoves() {
    moves = 0;
    moveCounter.textContent = moves;
}

//reset stars
function resetStars() {
    firstStar.className = 'first-star fa fa-star';
    secondStar.className = 'second-star fa fa-star';
    thirdStar.className = 'third-star fa fa-star';
}

//reset timer
function resetTimer() {
    clearInterval(t);
    seconds = 0;
    minutes = 0;
    timer.textContent = time;
}

//listen for click and flip card
function turn() {
    deck.addEventListener('click', function (e) {
        e.preventDefault();
        timeTiger++
        if (timeTiger === 1) {
            startTimer();
        }
        if (e.target.nodeName === 'SPAN') {
            cardList(e.target);
            match(e.target);
        }
    });
}

//adding open cards to list
function cardList(target) {
    openCards.push(target);
}

//flipping cards function
function flip(target) {
    target.classList.add('open-front');
    target.nextElementSibling.classList.add('open-back', 'animated');
}

//Star rating function for removing stars when moves counter is increasing
function starRating(m) {
    if (m >= 10 && m < 12) {
        firstStar.classList.remove('fa-star');
        firstStar.classList.add('fa-star-half-o');
    } else if (m >= 12 && m < 14) {
        firstStar.classList.remove('fa-star-half-o');
        firstStar.classList.add('fa-star-o');
    } else if (m >= 14 && m < 16) {
        secondStar.classList.remove('fa-star');
        secondStar.classList.add('fa-star-half-o');
    } else if (m >= 16 && m < 18) {
        secondStar.classList.remove('fa-star-half-o');
        secondStar.classList.add('fa-star-o');
    } else if (m >= 18 && m < 20) {
        thirdStar.classList.remove('fa-star');
        thirdStar.classList.add('fa-star-half-o');
    } else if (m >= 20) {
        thirdStar.classList.remove('fa-star-half-o');
        thirdStar.classList.add('fa-star-o');
    }
}

//timer function
function startTimer() {
    clearInterval(t);
    t = setInterval(buildTimer, 1000);
}

timer.textContent = time;

function buildTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            seconds = 0;
        }
    }
    timer.textContent = (minutes < 10 ? "0" + minutes.toString() : minutes) + ":" + (seconds < 10 ? "0" + seconds.toString() : seconds);
}

function stopGame() {
    if (pairs === 8) {
        console.log("YOU WON")
        clearInterval(t);

    }
}

//checking if cards match
function match(target) {
    flip(target);
    if (openCards.length === 2) {
        moves += 1; //adding move
        moveCounter.textContent = moves;
        starRating(moves);
        let firstCard = openCards[0].nextElementSibling.childNodes[0];
        let secondCard = openCards[1].nextElementSibling.childNodes[0];
        //adding match class to cards that are the same
        if (firstCard.classList[1] === secondCard.classList[1]) {
            pairs += 1; //adding matched pairs
            setTimeout(function () {
                firstCard.parentNode.classList.add('match', 'pulse');
                secondCard.parentNode.classList.add('match', 'pulse');
            }, 400);
            //turning cards back
        } else if (firstCard.classList[1] !== secondCard.classList[1]) {
            setTimeout(function () {
                firstCard.parentNode.classList.remove('open-back');
                firstCard.parentNode.previousSibling.classList.remove('open-front');
                secondCard.parentNode.classList.remove('open-back');
                secondCard.parentNode.previousSibling.classList.remove('open-front');
            }, 1000);
        }
        openCards = [];
        stopGame();
    }
}

makeList();
turn();

