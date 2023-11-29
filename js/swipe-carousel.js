import Carousel from "./carousel.js"

Carousel
class SwipeCarousel extends Carousel {
    constructor(...args) {
        super(...args)
        this.itemContainer = this.slides[0].parentElement
    }

    _initListeners() {
        super._initListeners()
        this.container.addEventListener('touchstart', this._swipeStart.bind(this))
        this.itemContainer.addEventListener('mousedown', this._swipeStart.bind(this))
        this.container.addEventListener('touchend', this._swipeEnd.bind(this))
        this.itemContainer.addEventListener('mouseup', this._swipeEnd.bind(this))
    }

    _swipeStart(e) {
        this.startPosX = e instanceof MouseEvent
            ? e.pageX
            : e.changedTouches[0].pageX

    }

    _swipeEnd(e) {
        this.endPosX = e instanceof MouseEvent
            ? e.pageX
            : e.changedTouches[0].pageX

        if (this.endPosX - this.startPosX > 100) this.prevHandler()
        if (this.endPosX - this.startPosX < -100) this.nextHandler()
    }
}

export default SwipeCarousel