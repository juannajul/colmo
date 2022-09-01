document.addEventListener('DOMContentLoaded', function() {
  
});
const menuBtn = document.querySelector('.menu-btn');
const menuDes = document.querySelector('#nav-menu');
let menuOpen = false;
menuBtn.addEventListener('click', () => {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuDes.classList.add('open');
        menuOpen = true;        
    } else {
        menuBtn.classList.remove('open');
        menuDes.classList.remove('open')
        menuOpen = false;
    }
});

