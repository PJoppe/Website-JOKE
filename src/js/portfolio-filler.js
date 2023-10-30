/* eslint-disable */
function addEventListenersToNavLinks(){
    let navLinks = document.querySelectorAll('.rd-navbar-dropdown > li > a');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            document.querySelector('.rd-navbar-toggle').classList.remove('active');
            document.querySelector('.rd-navbar-nav-wrap').classList.remove('active');
        })
    }

    navLinks = document.querySelectorAll('.isotope-filters-list > li > a');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            document.querySelector('.isotope-filters-list').classList.remove('active');
        })
    }
}

document.addEventListener("DOMContentLoaded", function(event) {
    addEventListenersToNavLinks();
});


