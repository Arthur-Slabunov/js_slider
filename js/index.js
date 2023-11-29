import SwipeCarousel from "./swipe-carousel.js";

const carousel = new SwipeCarousel({
    carouselContainer: '.carousel-container',
    containerID: '#carousel',
    slideID: '.slide',
    interval: 2000,
    isPlaying: true,
});

carousel.init();
