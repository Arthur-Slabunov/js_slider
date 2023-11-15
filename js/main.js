(function slider() {

    const container = document.querySelector('#carousel');
    const slides = container.querySelectorAll('.slide');
    const pauseBtn = document.querySelector('#pause');
    const indicatorsItems = document.querySelectorAll('.indicator')
    const indicatorsContainer = document.querySelector('#indicators-container')
    let currentSlide = 0;
    let slideInterval = setInterval(gotoNext, 2000);
    let startPosX = null
    let endPosX = null
    
    const CODE_ARROW_LEFT = 'ArrowLeft'
    const CODE_ARROW_RIGHT = 'ArrowRight'
    const CODE_ARROW_SPACE = 'Space'
    const SLIDES_COUNT = slides.length
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
        currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;
        slides[currentSlide].classList.toggle ('active');
        indicatorsItems[currentSlide].classList.toggle ('active');
        }
    
    var playing = true;
    
    function pauseHandler() {
        pauseBtn.innerHTML = PLAY;
        playing = false;
        clearInterval(slideInterval);
    }
    
    function playHandler() {
        pauseBtn.innerHTML = PAUSE;
        playing = true;
        slideInterval = setInterval(gotoNext, 2000);
    }
    
    function pauseButton() {
        if (playing) {
              pauseHandler();
        } else {
              playHandler();
          }
    };
    
    
    let next = document.querySelector('#next');
    let previous = document.querySelector('#previous');
    let pause = document.querySelector('#pause')
    
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
        gotoNth(+target.dataset.slideTo)
    }
    }
    
    function pressKey(e) {
        const { code } = e
        e.preventDefault()
    
        if (code === CODE_ARROW_LEFT) prevHandler()
        if (code === CODE_ARROW_RIGHT) nextHandler()
        if (code === CODE_ARROW_SPACE) pauseButton()
    }

    function swipeStart(e) {
        startPosX = e instanceof MouseEvent
        ? e.pageX
        : e.changedTouches[0].pageX

    }

    function swipeEnd(e) {
        endPosX = e instanceof MouseEvent 
        ? e.pageX
        : e.changedTouches[0].pageX

        if (endPosX - startPosX > 100) prevHandler()
        if (endPosX - startPosX < -100) nextHandler()
    }

    function initListeners() {
    pause.addEventListener('click', pauseButton)
    previous.addEventListener('click', prevHandler)
    next.addEventListener('click', nextHandler)
    indicatorsContainer.addEventListener('click', indicateHandler)
    container.addEventListener('touchstart', swipeStart)
    container.addEventListener('mousedown', swipeStart)
    container.addEventListener('touchend', swipeEnd)
    container.addEventListener('mouseup', swipeEnd)
    document.addEventListener('keydown', pressKey)
    }
    
function init() {
    initListeners()
}

init()
}())
