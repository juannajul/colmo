document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var productSlug = path.split('/')[2];
    var paginationNumber = 1;
    var topBtn = document.getElementById('list-products-banner-tops');
    var bottomsBtn = document.getElementById('list-products-banner-bottoms');
    var shoesBtn = document.getElementById('list-products-banner-shoes');
    var activeTop = false;
    var activeBottoms = false;
    var activeShoes = false;
    localStorage.setItem('filterUrl',  `/api/products/?ordering=-views&page=${paginationNumber}`);
    var nextUrl = ``;
    if (productSlug !== 'populares'){
        var productUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`
    } else {
        var productUrl = `/api/products/?ordering=-views&page=${paginationNumber}`
    }
    
    // all products 
    listProduts(productUrl);
    filterBySize();

    const filtersBtn = document.getElementById('list-products-filters-btn-filters');
    var filtersIsOpen = false
    filtersBtn.addEventListener('click', () => {
        const filtersDesplegable = document.getElementById('list-products-filters-desplegable');
        if (filtersIsOpen == false){
            filtersIsOpen = true
            filtersDesplegable.classList.add('open-desplegable');
        }
    });

    const closeFiltersBtn = document.getElementById('list-products-close-filters-btn');
    closeFiltersBtn.addEventListener('click', () => {
        const filtersDesplegable = document.getElementById('list-products-filters-desplegable');
        if (filtersIsOpen){
            filtersIsOpen = false
            filtersDesplegable.classList.remove('open-desplegable');
        }
    });
    
    const saveFiltersBtn = document.getElementById('save-filters-btn');
    saveFiltersBtn.addEventListener('click', () => {
        const filtersDesplegable = document.getElementById('list-products-filters-desplegable');
        getFilterProducts()
        //filterProductsBySize()
        if (filtersIsOpen){
            filtersIsOpen = false
            filtersDesplegable.classList.remove('open-desplegable');
        }
    });

    //tops products
    topBtn.addEventListener("click", function(){
        if (activeTop === false){
            paginationNumber = 1
            if (productSlug !== 'populares'){
                var topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
            } else {
                var topsUrl = `/api/products/?ordering=-views&search=tops&page=${paginationNumber}`
            }
            
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            activeTop = true;
            activeBottoms = false;
            activeShoes = false;
            if (activeTop === true){
                changeTopTitle = document.querySelector('.list-tops-title');
                changeTopBackground = document.querySelector('#list-products-banner-tops');
                changeTopTitle.style.color = 'rgba(255, 255, 255, 0.836)';
                changeTopBackground.style.backgroundColor = '#2f466f';

                changeBottomTitle = document.querySelector('.list-bottoms-title');
                changeBottomBackground = document.querySelector('#list-products-banner-bottoms');
                changeBottomTitle.style.color = '#2f466f';
                changeBottomBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeShoesTitle = document.querySelector('.list-shoes-title');
                changeShoesBackground = document.querySelector('#list-products-banner-shoes');
                changeShoesTitle.style.color = '#2f466f';
                changeShoesBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
            }
        } else if (activeTop === true){
            if (productSlug !== 'populares'){
                var topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
            } else {
                var topsUrl = `/api/products/?ordering=-views&page=${paginationNumber}`
            }
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            activeTop = false;
            activeBottoms = false;
            activeShoes = false;
            if (activeTop === false){
                changeTopTitle = document.querySelector('.list-tops-title');
                changeTopBackground = document.querySelector('#list-products-banner-tops');
                changeTopTitle.style.color = '#2f466f';
                changeTopBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeBottomTitle = document.querySelector('.list-bottoms-title');
                changeBottomBackground = document.querySelector('#list-products-banner-bottoms');
                changeBottomTitle.style.color = '#2f466f';
                changeBottomBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeShoesTitle = document.querySelector('.list-shoes-title');
                changeShoesBackground = document.querySelector('#list-products-banner-shoes');
                changeShoesTitle.style.color = '#2f466f';
                changeShoesBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
            }
        }
        listProduts(topsUrl);
        localStorage.setItem('filterUrl', topsUrl);
    });

    // bottoms products
    bottomsBtn.addEventListener("click", function(){
        paginationNumber = 1
        if (activeBottoms === false){
            if (productSlug !== 'populares'){
                var bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
            } else {
                var bottomsUrl = `/api/products/?ordering=-views&search=bottoms&page=${paginationNumber}`
            }
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            activeTop = false;
            activeBottoms = true;
            activeShoes = false;
            if (activeBottoms === true){
                changeBottomTitle = document.querySelector('.list-bottoms-title');
                changeBottomBackground = document.querySelector('#list-products-banner-bottoms');
                changeBottomTitle.style.color = 'rgba(255, 255, 255, 0.836)';
                changeBottomBackground.style.backgroundColor = '#2f466f';

                changeShoesTitle = document.querySelector('.list-shoes-title');
                changeShoesBackground = document.querySelector('#list-products-banner-shoes');
                changeShoesTitle.style.color = '#2f466f';
                changeShoesBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeTopTitle = document.querySelector('.list-tops-title');
                changeTopBackground = document.querySelector('#list-products-banner-tops');
                changeTopTitle.style.color = '#2f466f';
                changeTopBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
            }
        } else if (activeBottoms === true) {
            if (productSlug !== 'populares'){
                var bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
            } else {
                var bottomsUrl = `/api/products/?ordering=-views&page=${paginationNumber}`
            }
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            activeTop = false;
            activeBottoms = false;
            activeShoes = false;
            if (activeBottoms === false){
                changeBottomTitle = document.querySelector('.list-bottoms-title');
                changeBottomBackground = document.querySelector('#list-products-banner-bottoms');
                changeBottomTitle.style.color = '#2f466f';
                changeBottomBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeShoesTitle = document.querySelector('.list-shoes-title');
                changeShoesBackground = document.querySelector('#list-products-banner-shoes');
                changeShoesTitle.style.color = '#2f466f';
                changeShoesBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeTopTitle = document.querySelector('.list-tops-title');
                changeTopBackground = document.querySelector('#list-products-banner-tops');
                changeTopTitle.style.color = '#2f466f';
                changeTopBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
            }
        }
        listProduts(bottomsUrl);
        localStorage.setItem('filterUrl', bottomsUrl);
    });

    // shoes products
    shoesBtn.addEventListener("click", function(){
        paginationNumber = 1
        if (activeShoes === false){
            if (productSlug !== 'populares'){
                var shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
            } else {
                var shoesUrl = `/api/products/?ordering=-views&search=shoes&page=${paginationNumber}`
            }
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            activeTop = false;
            activeBottoms = false;
            activeShoes = true;
            if (activeShoes === true){
                changeShoesTitle = document.querySelector('.list-shoes-title');
                changeShoesBackground = document.querySelector('#list-products-banner-shoes');
                changeShoesTitle.style.color = 'rgba(255, 255, 255, 0.836)';
                changeShoesBackground.style.backgroundColor = '#2f466f';

                changeBottomTitle = document.querySelector('.list-bottoms-title');
                changeBottomBackground = document.querySelector('#list-products-banner-bottoms');
                changeBottomTitle.style.color = '#2f466f';
                changeBottomBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeTopTitle = document.querySelector('.list-tops-title');
                changeTopBackground = document.querySelector('#list-products-banner-tops');
                changeTopTitle.style.color = '#2f466f';
                changeTopBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
            }
        } else if (activeShoes === true) {
            if (productSlug !== 'populares'){
                var shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
            } else {
                var shoesUrl = `/api/products/?ordering=-views&page=${paginationNumber}`
            }
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            activeTop = false;
            activeBottoms = false;
            activeShoes = false;
            if (activeShoes === false){
                changeShoesTitle = document.querySelector('.list-shoes-title');
                changeShoesBackground = document.querySelector('#list-products-banner-shoes');
                changeShoesTitle.style.color = '#2f466f';
                changeShoesBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeBottomTitle = document.querySelector('.list-bottoms-title');
                changeBottomBackground = document.querySelector('#list-products-banner-bottoms');
                changeBottomTitle.style.color = '#2f466f';
                changeBottomBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';

                changeTopTitle = document.querySelector('.list-tops-title');
                changeTopBackground = document.querySelector('#list-products-banner-tops');
                changeTopTitle.style.color = '#2f466f';
                changeTopBackground.style.backgroundColor = 'rgba(255, 255, 255, 0.836)';
            }
        }
        listProduts(shoesUrl);
        localStorage.setItem('filterUrl', shoesUrl);
    });

    // pagination
    // Next page
    nextPagBtn = document.querySelector('#pagination-btn-next'); 
    nextPagBtn.addEventListener("click", function(){
    nextBtnUrl = document.getElementById('pagination-btn-next')
    nextUrl = nextBtnUrl.className;
    console.log(`sdffsd${nextUrl}`);
        if (activeTop === true){
            //topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
            if (nextUrl !== 'null') {
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                listProduts(nextUrl);
                nextBtnUrl.removeAttribute('class');
            } else {
                console.log('no next url');
            }
            smoothScroll('#list-products-banner-tops', 200)
        } else if (activeBottoms === true){
            //bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
            if (nextUrl !== 'null') {
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                listProduts(nextUrl);
                nextBtnUrl.removeAttribute('class');
            } else {
                console.log('no next url');
            }
            smoothScroll('#list-products-banner-tops', 200)
        } else if (activeShoes === true){
            //shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
            if (nextUrl !== 'null') {
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                listProduts(nextUrl);
                nextBtnUrl.removeAttribute('class');
            } else {
                console.log('no next url');
            }
            smoothScroll('#list-products-banner-tops', 200)
        } else {
            //productUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
            if (nextUrl !== 'null') {
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                listProduts(nextUrl);
                nextBtnUrl.removeAttribute('class');
            } else {
                console.log('no next url');
            }
            smoothScroll('#list-products-banner-tops', 200)
        }
    });

    // Previous page
    prevPagBtn = document.querySelector('#pagination-btn-prev');
    prevPagBtn.addEventListener("click", function(){
        prevBtnUrl = document.getElementById('pagination-btn-prev')
        prevUrl = prevBtnUrl.className;
        console.log(`prev ${prevUrl}`);
            if (activeTop === true){
                //topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
                if (prevUrl !== 'null') {
                    var deleteProducts = document.querySelectorAll('.list-product-box');
                    deleteProducts.forEach(product =>{
                        product.outerHTML = "";
                    });
                    listProduts(prevUrl);
                    prevBtnUrl.removeAttribute('class');
                } else {
                    console.log('no prev url');
                }
                smoothScroll('#list-products-banner-tops', 200)
            } else if (activeBottoms === true){
                //bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
                if (prevUrl !== 'null') {
                    var deleteProducts = document.querySelectorAll('.list-product-box');
                    deleteProducts.forEach(product =>{
                        product.outerHTML = "";
                    });
                    listProduts(prevUrl);
                    prevBtnUrl.removeAttribute('class');
                } else {
                    console.log('no prev url');
                }
                smoothScroll('#list-products-banner-tops', 200)
            } else if (activeShoes === true){
                //shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
                if (prevUrl !== 'null') {
                    var deleteProducts = document.querySelectorAll('.list-product-box');
                    deleteProducts.forEach(product =>{
                        product.outerHTML = "";
                    });
                    listProduts(prevUrl);
                    prevBtnUrl.removeAttribute('class');
                } else {
                    console.log('no prev url');
                }
                smoothScroll('#list-products-banner-tops', 200)
            } else {
                //productUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
                if (prevUrl !== 'null') {
                    var deleteProducts = document.querySelectorAll('.list-product-box');
                    deleteProducts.forEach(product =>{
                        product.outerHTML = "";
                    });
                    listProduts(prevUrl);
                    prevBtnUrl.removeAttribute('class');
                } else {
                    console.log('no prev url');
                }
                smoothScroll('#list-products-banner-tops', 200)
            }
        });

});


function listProduts(productUrl){
    fetch(productUrl)
        .then(response => response.json())
        .then(products =>{
            var all_products = products.results;
            nextUrl = products.next;
            prevUrl = products.previous;
            productsCount = products.count;
            console.log(prevUrl);
           // console.log(all_products)
            all_products.forEach(product => {
                var productCategories = product.category.join(" ");
                const productContainer = document.createElement("DIV")
                productContainer.classList.add("list-product-box")
                productContainer.innerHTML = 
                `<div class="list-products-container">
                    <div class="list-product-img">
                        <a href="/product/${product.slug}/"><img src="${product.image}" alt="${product.name}">
                    </div>
                    <a href="/product/${product.slug}/">
                    <div id="list-product-info-container">
                        <div id="list-product-price-container">
                            <span id="list-product-sale-price-${product.slug}" class=" ">$${product.sale_price}</span>
                            <h4 id="list-product-price-${product.slug}" class="list-product-price list-product-sale-store-price">$${product.store_price}</h4>
                        </div>
                            <h4 class="list-product-name">${product.name}</h4>
                        <h4 class="list-product-category">${productCategories}</h4>
                    </div>
                    </a>
                </div>`
                
                document.getElementById("list-products-container").appendChild(productContainer)
                if (product.is_sale_price_active === true) {
                    let salePrice = document.getElementById(`list-product-sale-price-${product.slug}`);
                    let storePrice = document.getElementById(`list-product-price-${product.slug}`);
                    salePrice.classList.add("list-product-sale-price");
                    storePrice.classList.add("list-product-sale-store-price")
                } else if (product.is_sale_price_active === false) {
                    let salePrice = document.getElementById(`list-product-sale-price-${product.slug}`);
                    let storePrice = document.getElementById(`list-product-price-${product.slug}`);
                    salePrice.style.display = "none";
                    storePrice.classList.add("list-product-price")
                    storePrice.classList.remove("list-product-sale-store-price")
                }
            });
            prevPagBtn = document.querySelector('#pagination-btn-prev');
            nextPagBtn = document.querySelector('#pagination-btn-next');

            // nextUrl
            if (nextUrl === null){
                nextPagBtn.setAttribute('class', 'next-btn-hide');
                prevPagBtn.style.textAlign = 'center';
            } else {
                nextPagBtn.removeAttribute('class', 'next-btn-hide');
                prevPagBtn.style.textAlign = 'right';
            }
            nextPagBtn.classList.add(`${nextUrl}`);


            // prevUrl
            if (prevUrl === null){
                prevPagBtn.setAttribute('class', 'prev-btn-hide');
                nextPagBtn.style.textAlign = 'center';
            } else {
                prevPagBtn.removeAttribute('class', 'prev-btn-hide');
                nextPagBtn.style.textAlign = 'left';
            }
            prevPagBtn.classList.add(`${prevUrl}`);

            // empty products
            if (productsCount === 0){
                prevPagBtn.removeAttribute('class');
                prevPagBtn.setAttribute('class', 'prev-btn-hide');
                nextPagBtn.removeAttribute('class');
                nextPagBtn.setAttribute('class', 'next-btn-hide');
            }
        });
}

function smoothScroll(target, duration){
    var target = document.querySelector(target);
    var targetPosition = target.getBoundingClientRect().top;
    var startPosition = window.pageYOffset;
    var distance = targetPosition ;
    var startTime = null;
    function animation(currentTime){
        if(startTime == null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(startPosition, run);
        if(timeElapsed < duration) requestAnimationFrame(animation);
    }  
    
    function ease(t, b, c, d){
        t /= d /2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2)- 1) + b;
    }
    requestAnimationFrame(animation);
}

function filterBySize(){
    fetch(`/api/sizes`)
        .then(response => response.json())
        .then(data =>{
            sizes = data.results;
            sizes.forEach(size => {
                const sizeContainer = document.createElement("DIV")
                sizeContainer.classList.add("list-products-filter-size-box")
                sizeContainer.innerHTML = 
                `<input type="radio" id="size-${size.id}" class="list-products-filter-size-radio" name="size" value="${size.size}">
                <label for="size-${size.id}" class="list-products-filter-size-title">${size.size}</label>`
                document.getElementById("list-products-filters-sizes-btns-container").appendChild(sizeContainer)
            });
        })
}

async function filterProductsBySize(){
        let filter_url = localStorage.getItem('filterUrl');
        let newFilterUrl = '';  
        let sizes_url = ''
        console.log(filter_url)
        const sizesSelected  = document.querySelectorAll(".list-products-filter-size-radio:checked");
        console.log(sizesSelected)
        if (sizesSelected.length > 0) {
            sizesSelected.forEach(size => {
             sizes_url += `&search=${size.value}`;
            })
            newFilterUrl += `${filter_url}${sizes_url}`;
            //localStorage.setItem('newFilterUrl', newFilterUrl);
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            window.setTimeout(()=>{
                listProduts(newFilterUrl);
                console.log(newFilterUrl)
            }, 500) 
        } else {
            console.log("no hay tallas seleccionadas")
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            window.setTimeout(()=>{
                listProduts(filter_url);
            }, 500) 
            
        }
}

async function getFilterProducts(){
   const filterProduct = await filterProductsBySize()
}
