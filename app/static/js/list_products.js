document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var productSlug = path.split('/')[2];
    var paginationNumber = 1;
    var productUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`
    var topBtn = document.getElementById('list-products-banner-tops');
    var bottomsBtn = document.getElementById('list-products-banner-bottoms');
    var shoesBtn = document.getElementById('list-products-banner-shoes');
    var activeTop = false;
    var activeBottoms = false;
    var activeShoes = false;
    var nextUrl = ``;
    
    console.log(productSlug)
    // all products 
    listProduts(productUrl);

    //tops products
    topBtn.addEventListener("click", function(){
        if (activeTop === false){
            paginationNumber = 1
            topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
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
            topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
    });

    // bottoms products
    bottomsBtn.addEventListener("click", function(){
        paginationNumber = 1
        if (activeBottoms === false){
            bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
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
            bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
    });

    // shoes products
    shoesBtn.addEventListener("click", function(){
        paginationNumber = 1
        if (activeShoes === false){
            shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
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
            shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
    });

    // pagination
    // Next page
    nextPagBtn = document.querySelector('#pagination-btn-next'); 
    nextPagBtn.addEventListener("click", function(){
    nextBtnUrl = document.getElementById('pagination-btn-next')
    nextUrl = nextBtnUrl.className;
    console.log(`sdffsd${nextUrl}`);
        if (activeTop === true){
            topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
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
        } else if (activeBottoms === true){
            bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
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
        } else if (activeShoes === true){
            shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
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
        } else {
            productUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
        }
    });

    // Previous page
    prevPagBtn = document.querySelector('#pagination-btn-prev');
    prevPagBtn.addEventListener("click", function(){
        prevBtnUrl = document.getElementById('pagination-btn-prev')
        prevUrl = prevBtnUrl.className;
        console.log(`prev ${prevUrl}`);
            if (activeTop === true){
                topsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
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
            } else if (activeBottoms === true){
                bottomsUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
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
            } else if (activeShoes === true){
                shoesUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
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
            } else {
                productUrl = `/api/products/${productSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
            }
        });
});


function listProduts(productUrl){
    console.log(productUrl)
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
                        <h4 class="list-product-price">$${product.store_price}</h4>
                        <h4 class="list-product-name">${product.name}</h4>
                        <h4 class="list-product-category">${productCategories}</h4>
                    </div>
                    </a>
                </div>`
                document.getElementById("list-products-container").appendChild(productContainer)

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


