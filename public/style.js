// add event for materialize elements after page is loaded
document.addEventListener('DOMContentLoaded', function () {
    // choose target element
    const sideNav = document.querySelectorAll('.sidenav');
    //initialise action
    M.Sidenav.init(sideNav);
    // choose target element
    const carousel = document.querySelector('.carousel');
    //initialise action
    M.Carousel.init(carousel, {
        duration: 200,
        dist: -10,
        shift: 0,
        padding: 0,
        numVisible: 4,
        fullWidth: true,
        indicators: true,
        noWrap: false,
        onCycleTo: null
    });
    // initialise automatic slider ( in forever cycle )
    setTimeout(function autoPlay() {
        // get target
        let carousel = document.querySelector('.carousel');
        // click next slide
        M.Carousel.getInstance(carousel).next();
        // set delay
        setTimeout(autoPlay, 10000)
    }, 10000)
});

