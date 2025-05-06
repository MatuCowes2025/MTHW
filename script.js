document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.nav__toggle');
    const menu = document.querySelector('.nav__link');

    
    toggleButton.addEventListener('click', function () {
        menu.classList.toggle('nav__link--show');
    });
});
