document.addEventListener('DOMContentLoaded', function() {
/*const clothesMenuBtn = document.getElementById('nav-menu-clothes');
let dropdownMenuOpen = false
clothesMenuBtn.addEventListener('mouseover', () => {
    const clothesDropdown = document.getElementById('nav-menu-clothes-dropdown');
    clothesDropdown.style.display = 'block';
    dropdownMenuOpen = true
})

const clothesDropdown = document.getElementById('nav-menu-clothes-dropdown');
clothesDropdown.addEventListener('mouseout', () => {
    const clothesDropdown = document.getElementById('nav-menu-clothes-dropdown');
    clothesDropdown.style.display = 'none';
})
*/

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

/*document.addEventListener('DOMContentLoaded', function() {
const clothesMenuBtn = document.getElementById('nav-menu-clothes');
isDropdownMouseOut = false;
isDropdownMouseCategoryOut = false;
clothesMenuBtn.addEventListener('mouseover', () => {
    const clothesDropdown = document.getElementById('nav-menu-clothes-dropdown-nav');
    clothesDropdown.style.display = 'block';
})

const clothesDropdown = document.getElementById('nav-menu-clothes-dropdown-nav');
    clothesDropdown.addEventListener('mouseout', () => {
    isDropdownMouseOut = true;
})

const clothesCategoryDropdown = document.getElementById('nav-menu-clothes-dropdown-nav');
    clothesCategoryDropdown.addEventListener('mouseover', () => {
    isDropdownCategoryMouseOut = false;
})

if (isDropdownMouseOut === true && isDropdownCategoryMouseOut === false) {
    const clothesDropdown = document.getElementById('nav-menu-clothes-dropdown-nav');
    clothesDropdown.style.display = 'none';
} */