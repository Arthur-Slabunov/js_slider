const container = document.querySelector('#carousel');
const slides = container.querySelectorAll('.slide');
const indicatorsItems = document.querySelectorAll('.indicator')
const indicatorsContainer = document.querySelector('#indicators-container')
let currentSlide = 0;
let slideInterval = setInterval(gotoNext, 2000);

const PLAY = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-play-256.png">'
const PAUSE = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png">'

function gotoNext() {
    gotoNth(currentSlide + 1);
    }
    
    function gotoPrev() {
    gotoNth(currentSlide - 1);
    }
    
    function gotoNth(n) {
    slides[currentSlide].classList.toggle ('active');
    indicatorsItems[currentSlide].classList.toggle ('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle ('active');
    indicatorsItems[currentSlide].classList.toggle ('active');
    }

var playing = true;
var pauseButton = document.querySelector('#pause');

function pauseHandler() {
    pauseButton.innerHTML = PLAY;
    playing = false;
    clearInterval(slideInterval);
}

function playHandler() {
    pauseButton.innerHTML = PAUSE;
    playing = true;
    slideInterval = setInterval(gotoNext, 2000);
}

pauseButton.onclick = function() {
    if (playing) {
  	    pauseHandler();
    } else {
  	    playHandler();
	  }
};


let next = document.querySelector('#next');
let previous = document.querySelector('#previous');

function nextHandler() {
pauseHandler();
gotoNext();
};

function prevHandler() {
pauseHandler();
gotoPrev();
};

function indicateHandler(e) {
const { target } = e
if (target && target.classList.contains('indicator')) {
    pauseHandler()
    gotoNth(+target.getAttribute('data-slide-to'))
}
}

previous.addEventListener('click', prevHandler)
next.addEventListener('click', nextHandler)
indicatorsContainer.addEventListener('click', indicateHandler)