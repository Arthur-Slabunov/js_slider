function Carousel() {
}

Carousel.prototype = {
        _initProps() {
            this.container = document.querySelector('#carousel');
            this.slides = this.container.querySelectorAll('.slide');   
            this.pauseHandler = this.container.querySelector('#pause')    
            this.currentSlide = 0;
            this.playing = true;
            this.timerID = null
            this.startPosX = null
            this.endPosX = null
        
            this.INTERVAL = 2000 
            this.CODE_ARROW_LEFT = 'ArrowLeft'
            this.CODE_ARROW_RIGHT = 'ArrowRight'
            this.CODE_ARROW_SPACE = 'Space'
            this.SLIDES_COUNT = this.slides.length
            this.PAUSE_PIC = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-pause-512.png">'        
            this.PLAY_PIC = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-play-256.png">'
            this.PREV_PIC = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-left-a-256.png">'
            this.NEXT_PIC = '<img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-arrow-right-a-256.png">'
        },

        
    _initControls() {
        const controls = document.createElement('div')
        const PAUSE = `<span class="control control-pause" id="pause">${this.PAUSE_PIC}</span>`
        const PREV = `<span class="control control-previous" id="previous">${this.PREV_PIC}</span>`
        const NEXT = `<span class="control control-next" id="next">${this.NEXT_PIC}</span>`
        

        controls.setAttribute('id', "controls-container")
        controls.setAttribute('class', "controls")
        controls.innerHTML = PAUSE + PREV + NEXT 

    this.container.append(controls)
    this.pauseBtn = this.container.querySelector('#pause');
    this.previous = this.container.querySelector('#previous');
    this.next = this.container.querySelector('#next');
    },
 
    _InitIndicators() {
         const indicators = document.createElement('div')

         indicators.setAttribute('id', "indicators-container")
         indicators.setAttribute('class', "indicators")

         for (let i = 0; i < this.SLIDES_COUNT; i++) {
                     
         const indicator = document.createElement('span')
         indicator.setAttribute('class', i ? 'indicator ' : 'indicator active')
         indicator.dataset.slideTo = i
         indicators.append(indicator)
         }

         this.container.append(indicators)

         this.indicatorItems = this.container.querySelectorAll('.indicator')
         this.indicatorsContainer = this.container.querySelector('#indicators-container')
    },
    
    _initListeners() {
        this.pauseBtn.addEventListener('click', this.pauseButton.bind(this))
        this.previous.addEventListener('click', this.prevHandler.bind(this))
        this.next.addEventListener('click', this.nextHandler.bind(this))
        this.indicatorsContainer.addEventListener('click', this._indicateHandler.bind(this))
        document.addEventListener('keydown', this._pressKey.bind(this))
        },
        

    _gotoNth(n) {
        this.slides[this.currentSlide].classList.toggle ('active');
        this.indicatorItems[this.currentSlide].classList.toggle ('active');
        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
        this.slides[this.currentSlide].classList.toggle ('active');
        this.indicatorItems[this.currentSlide].classList.toggle ('active');
        },

     _gotoNext() {
        this._gotoNth(this.currentSlide + 1);
        },
        
         _gotoPrev() {
            this._gotoNth(this.currentSlide - 1);
        },
         _tick() {
            this.timerID = setInterval(this._gotoNext.bind(this), this.INTERVAL);
        },


    
    
     pause() {
        clearInterval(this.timerID);
        this.pauseBtn.innerHTML = this.PLAY_PIC;
        this.playing = false;
    },
    
     play() {
         this._tick()
        this.pauseBtn.innerHTML = this.PAUSE_PIC;
        this.playing = true;
    },
    
     pauseButton() {
        if (this.playing) this.pause()
         else this.play()
    },
    

     nextHandler() {
        this.pause();
        this._gotoNext();
    },
    
     prevHandler() {
        this.pause();
        this._gotoPrev();
    },
    
     _indicateHandler(e) {
    const { target } = e
    if (target && target.classList.contains('indicator')) {
        this.pause()
        this._gotoNth(+target.dataset.slideTo)
    }
    },
    
     _pressKey(e) {
        const { code } = e
        e.preventDefault()
    
        if (code === this.CODE_ARROW_LEFT) this.prevHandler()
        if (code === this.CODE_ARROW_RIGHT) this.nextHandler()
        if (code === this.CODE_ARROW_SPACE) this.pauseButton()
    },

 init() {
    this._initProps()
    this._initControls()
    this._InitIndicators()
    this._initListeners()
    this._tick()
},
}

Carousel.prototype.constructor = Carousel


    