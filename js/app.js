

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
// list that holds all cards classes
let cards = ['tiger','elephant','pig','sheep','cow','cat','dog','zebra','tiger','elephant','pig','sheep','cow','cat','dog','zebra'];


const deck = document.querySelector(".deck"); //selecting deck list
const fragment = document.createDocumentFragment(); // DocumentFragment wrapper

//Creating card list
function makeList() {
    deck.innerHTML ='';//cleaning card list
    for(let card of shuffle(cards)) {

        let cardWrap = document.createElement('li');
        cardWrap.classList.add("card-wrap");

        let front = document.createElement('div');
        front.classList.add("front","card");
        cardWrap.appendChild(front);

        let back = document.createElement('div');
        back.classList.add("back","card");

        let content = document.createElement('i');
        content.classList.add("svg",`${card}`);
        back.appendChild(content);

        cardWrap.appendChild(back);

        fragment.appendChild(cardWrap);
    }
    //Adding cards
    deck.appendChild(fragment);
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

//Reset after button click
const restart = document.querySelector(".restart");
restart.addEventListener('click',function(e){
    e.preventDefault();
    makeList();
});

const card = document

function turn() {
    deck.addEventListener('click', function(e){
        e.preventDefault();
        if(e.target.nodeName === 'li'){
          let fronty =  e.target.querySelector(".front");
          fronty.style.transform = 'perspective(600px) rotateY(-180deg)';
            e.target.querySelector(".back").style.transform = 'perspective(600px) rotateY(0deg)';
        }
    });
}

makeList();
turn();