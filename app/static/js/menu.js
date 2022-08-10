document.addEventListener('DOMContentLoaded', function() {
    window.onscroll = () =>{
        menuSpace()
    }
    
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

function menuSpace(){
    var startPosition = window.pageXOffset;
    var target = 30;
    var distance = target - startPosition;
    var menu = document.getElementsByClassName('open');
    console.log(distance)
    if (distance === 1) {
        menu.style.top = 80;
    }
}