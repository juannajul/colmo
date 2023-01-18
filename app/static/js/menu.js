document.addEventListener('DOMContentLoaded', function() {
    openMenu();
    const clothesDropdown = document.getElementById('nav-menu-clothes');
    clothesDropdown.addEventListener('click', () => {
        openClothesDropdown(clothesDropdown);
    });
    const brandsDropdown = document.getElementById('nav-menu-brands');
    brandsDropdown.addEventListener('click', () => {
        openBrandsDropdown(brandsDropdown);
    });
});

function openMenu(){
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
}

function openClothesDropdown(){
    const dropdown = document.getElementById('nav-menu-clothes-dropdown');
    dropdown.classList.toggle('nav-menu-clothes-dropdown-open')
}

function openBrandsDropdown(){
    const dropdown = document.getElementById('nav-menu-brands-dropdown');
    dropdown.classList.toggle('nav-menu-brands-dropdown-open')
}



