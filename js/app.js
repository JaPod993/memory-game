// list that holds all cards classes
let cards = ['tiger', 'elephant', 'pig', 'sheep', 'cow', 'cat', 'dog', 'zebra', 'tiger', 'elephant', 'pig', 'sheep', 'cow', 'cat', 'dog', 'zebra'];
let openCards = [];
const deck = document.querySelector(".deck"); //selecting deck list
const fragment = document.createDocumentFragment(); // DocumentFragment wrapper
const fragmentSecond = document.createDocumentFragment(); // DocumentFragment wrapper
const moveCounter = document.querySelector(".moves"); //select moves counter
const firstStar = document.querySelector(".first-star"); //firstStar
const secondStar = document.querySelector(".second-star"); //secondStar
const thirdStar = document.querySelector(".third-star"); //thirdStar
const modal = document.getElementById("myModal"); //modal
const newGame = document.querySelector(".new-game"); //new game button
const yourScore = document.querySelector(".your-score");
const timer = document.querySelector('.timer');
let moves = 0; //moves counter
let pairs = 0; //matched pairs counter
let time = '00:00';
let seconds = 0;
let minutes = 0;
let timeTiger = 0;
let t;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

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

//Reset after button click
const restart = document.querySelector(".restart");
restart.addEventListener('click', function (e) {
    e.preventDefault();
    resetAll();
});

//new game
function nextGame() {
    newGame.addEventListener('click', function (e) {
        e.preventDefault();
        resetAll();
        modal.style.display = "none";
    });
}

//restart function
function resetAll() {
    makeList();
    resetMoves();
    resetStars();
    resetTimer();
    yourScore.innerHTML = "";
}

//reset moves
function resetMoves() {
    moves = 0;
    moveCounter.textContent = moves;
    pairs = 0;
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
    timeTiger = 0;
    timer.textContent = time;
}

//listen for click and flip card
function turn() {
    deck.addEventListener('click', click);
}

let click = function click(e) {
    e.preventDefault();

    if (e.target.nodeName === 'SPAN') {
        timeTiger++;
        if (timeTiger === 1) {
            startTimer();
        }
        cardList(e.target);
        match(e.target);
    }
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
    if (m >= 12 && m < 15) {
        firstStar.classList.remove('fa-star');
        firstStar.classList.add('fa-star-half-o');
    } else if (m >= 15 && m < 16) {
        firstStar.classList.remove('fa-star-half-o');
        firstStar.classList.add('fa-star-o');
    } else if (m >= 16 && m < 18) {
        secondStar.classList.remove('fa-star');
        secondStar.classList.add('fa-star-half-o');
    } else if (m >= 18 && m < 20) {
        secondStar.classList.remove('fa-star-half-o');
        secondStar.classList.add('fa-star-o');
    } else if (m >= 20 && m < 22) {
        thirdStar.classList.remove('fa-star');
        thirdStar.classList.add('fa-star-half-o');
    } else if (m >= 22) {
        thirdStar.classList.remove('fa-star-half-o');
        thirdStar.classList.add('fa-star-o');
    }
}

//timer function
function startTimer() {
    clearInterval(t);
    t = setInterval(buildTimer, 1000);
    timer.textContent = time;
}

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
        clearInterval(t);
        // When the user clicks on the button, open the modal
        modal.style.display = "block";
        ScoreCreate();
        nextGame();
    }
}

// creating score
function ScoreCreate() {
    let starList = document.createElement('ul');
    starList.classList.add("stars-score");

    let firstLi = document.createElement('li');
    let firstScore = document.createElement('i');
    firstScore.classList.add("fa", thirdStar.classList[2]);
    firstLi.appendChild(firstScore);

    let secondLi = document.createElement('li');
    let secondScore = document.createElement('i');
    secondScore.classList.add("fa", secondStar.classList[2]);
    secondLi.appendChild(secondScore);

    let thirdLi = document.createElement('li');
    let thirdScore = document.createElement('i');
    thirdScore.classList.add("fa", firstStar.classList[2]);
    thirdLi.appendChild(thirdScore);

    starList.appendChild(firstLi);
    starList.appendChild(secondLi);
    starList.appendChild(thirdLi);

    let timerTitle = document.createElement('span');
    timerTitle.classList.add("timer-score-title");
    timerTitle.textContent = "Time: ";

    let timerScore = document.createElement('span');
    timerScore.classList.add("timer-score");
    timerScore.textContent = timer.textContent;

    let movesTitle = document.createElement('span');
    movesTitle.classList.add("moves-score-title");
    movesTitle.textContent = "Moves: ";

    let movesScore = document.createElement('span');
    movesScore.classList.add("moves-score");
    movesScore.textContent = moveCounter.textContent;

    fragmentSecond.appendChild(starList);
    fragmentSecond.appendChild(timerTitle);
    fragmentSecond.appendChild(timerScore);
    fragmentSecond.appendChild(movesTitle);
    fragmentSecond.appendChild(movesScore);
    yourScore.appendChild(fragmentSecond);
}

// Get the <span> element that closes the modal
const span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

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
        deck.removeEventListener('click', click);
        setTimeout(function () {
            turn();
        }, 800);
    }
}

makeList();
turn();