const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firtsCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;
    if(this === firtsCard) return;
    this.classList.add ('flip');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firtsCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

function checkForMatch(){
    if(firtsCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }
    unFlipCards();
}

function disableCards(){
    firtsCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards(){
    lockBoard = true;
    setTimeout(()=>{
        firtsCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        lockBoard = false;

        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firtsCard, secondCard] = [null, null];
}

(function sheffle(){
    cards.forEach((card)=>{
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})()

cards.forEach((card) =>{
    card.addEventListener('click', flipCard)
})