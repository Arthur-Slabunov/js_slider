var slides = document.querySelectorAll('.slide');
var currentSlide = 0;
var slideInterval = setInterval(gotoNext, 2000);

const PLAY = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-play-256.png">'
const PAUSE = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png">'

function gotoNext() {
    gotoNth(currentSlide + 1);
    }
    
    function gotoPrev() {
    gotoNth(currentSlide - 1);
    }
    
    function gotoNth(n) {
    slides[currentSlide].className = 'slide';
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].className = 'slide active';
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

previous.addEventListener('click', prevHandler)
next.addEventListener('click', nextHandler)