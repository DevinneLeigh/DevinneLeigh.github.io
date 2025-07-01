document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'ankha', img: 'images/memorygame/ankha.png' },
        { name: 'bob', img: 'images/memorygame/bob.png' },
        { name: 'lolly', img: 'images/memorygame/lolly.png' },
        { name: 'raymond', img: 'images/memorygame/raymond.png' },
        { name: 'rosie', img: 'images/memorygame/rosie.png' },
        { name: 'tom', img: 'images/memorygame/tom.png' },
        { name: 'ankha', img: 'images/memorygame/ankha.png' },
        { name: 'bob', img: 'images/memorygame/bob.png' },
        { name: 'lolly', img: 'images/memorygame/lolly.png' },
        { name: 'raymond', img: 'images/memorygame/raymond.png' },
        { name: 'rosie', img: 'images/memorygame/rosie.png' },
        { name: 'tom', img: 'images/memorygame/tom.png' }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const gridDisplay = document.querySelector('#grid')
    const winnerMessage = document.getElementById('winner-message')
    const tryAgainButton = document.getElementById('try-again')

    let cardsChosen = []
    let cardsChosenIDs = []
    const cardsWon = []

    function createBoard () {
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img')
            card.setAttribute('src', 'images/memorygame/blank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            gridDisplay.appendChild(card)
        }
    }

    function checkMatch() {
        const cards = document.querySelectorAll('#grid img')
        const optionOneID = cardsChosenIDs[0]
        const optionTwoID = cardsChosenIDs[1]

        if (optionOneID == optionTwoID) {
            cards[optionOneID].setAttribute('src', 'images/memorygame/blank.png')
            cards[optionTwoID].setAttribute('src', 'images/memorygame/blank.png')
        }
        else if (cardsChosen[0] == cardsChosen[1]) {
            cards[optionOneID].setAttribute('src', 'images/memorygame/white.png')
            cards[optionTwoID].setAttribute('src', 'images/memorygame/white.png')
            cards[optionOneID].removeEventListener('click', flipCard)
            cards[optionTwoID].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneID].setAttribute('src', 'images/memorygame/blank.png')
            cards[optionTwoID].setAttribute('src', 'images/memorygame/blank.png')
        }

        cardsChosen = []
        cardsChosenIDs = []

        if (cardsWon.length === cardArray.length / 2) {
            setTimeout(() => {
                gridDisplay.style.display = 'none'
                winnerMessage.style.display = 'block'
                tryAgainButton.style.display = 'block'
            }, 300)
        }
    }

    function flipCard() {
        const cardID = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardID].name)
        cardsChosenIDs.push(cardID)
        this.setAttribute('src', cardArray[cardID].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkMatch, 500)
        }
    }

    tryAgainButton.addEventListener('click', () => {
        // Reset the game
        gridDisplay.style.display = 'flex'
        gridDisplay.innerHTML = ''
        cardArray.sort(() => 0.5 - Math.random())
        cardsWon.length = 0
        cardsChosen = []
        cardsChosenIDs = []
        winnerMessage.style.display = 'none'
        tryAgainButton.style.display = 'none'
        createBoard()
    })

    createBoard()
})




var islandSlideIndex = 1;
if (document.getElementsByClassName("island_slides").length) {
    showIslandSlides(islandSlideIndex);
}
function plusIslandSlides(n) {
    showIslandSlides(islandSlideIndex += n);
}
function currentSlide(n) {
    showIslandSlides(islandSlideIndex = n);
}
function showIslandSlides(n) {
    var i;
    var slides = document.getElementsByClassName("island_slides");
    if (n > slides.length) {
        islandSlideIndex = 1;
    }
    if (n < 1) {
        islandSlideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        var slide_1 = slides[i];
        slide_1.style.display = "none";
    }
    var slide = slides[islandSlideIndex - 1];
    slide.style.display = "block";
}


var outfitSlideIndex = 1;
if (document.getElementsByClassName("outfit_slides").length) {
    showOutfitSlides(outfitSlideIndex);
}
function plusOutfitSlides(n) {
    showOutfitSlides(outfitSlideIndex += n);
}
function currentSlide(n) {
    showOutfitSlides(outfitSlideIndex = n);
}
function showOutfitSlides(n) {
    var i;
    var slides = document.getElementsByClassName("outfit_slides");
    if (n > slides.length) {
        outfitSlideIndex = 1;
    }
    if (n < 1) {
        outfitSlideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        var slide_1 = slides[i];
        slide_1.style.display = "none";
    }
    var slide = slides[outfitSlideIndex - 1];
    slide.style.display = "block";
}



var decorateSlideIndex = 1;
if (document.getElementsByClassName("decorate_slides").length) {
    showDecorateSlides(decorateSlideIndex);
}
function plusDecorateSlides(n) {
    showDecorateSlides(decorateSlideIndex += n);
}
function currentSlide(n) {
    showDecorateSlides(decorateSlideIndex = n);
}
function showDecorateSlides(n) {
    var i;
    var slides = document.getElementsByClassName("decorate_slides");
    if (n > slides.length) {
        decorateSlideIndex = 1;
    }
    if (n < 1) {
        decorateSlideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        var slide_1 = slides[i];
        slide_1.style.display = "none";
    }
    var slide = slides[decorateSlideIndex - 1];
    slide.style.display = "block";
}


var museumSlideIndex = 1;
if (document.getElementsByClassName("museum_slides").length) {
    showMuseumSlides(museumSlideIndex);
}
function plusMuseumSlides(n) {
    showMuseumSlides(museumSlideIndex += n);
}
function currentSlide(n) {
    showMuseumSlides(museumSlideIndex = n);
}
function showMuseumSlides(n) {
    var i;
    var slides = document.getElementsByClassName("museum_slides");
    if (n > slides.length) {
        museumSlideIndex = 1;
    }
    if (n < 1) {
        museumSlideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        var slide_1 = slides[i];
        slide_1.style.display = "none";
    }
    var slide = slides[museumSlideIndex - 1];
    slide.style.display = "block";
}

