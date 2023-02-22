document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    var brandSlug = path.split('/')[2];
    var paginationNumber = 1;
    var category1Btn = document.getElementById('list-products-banner-category_1');
    var category2Btn = document.getElementById('list-products-banner-category_2');
    var category3Btn = document.getElementById('list-products-banner-category_3');
    var activeCategory1 = false;
    var activeCategory2 = false;
    var activeCategory3 = false;
    var nextUrl = ``;
    var productUrl = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&page=${paginationNumber}`;
    localStorage.setItem('filterUrl',  `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&page=${paginationNumber}`);
    
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
    if (category1Btn) {
        category1Btn.addEventListener("click", function(){
            let category1Title = document.getElementById('list-products-banner-category_1-title');
            let category1 = category1Title.innerHTML;
            console.log(category1.innerHTML)
            if (activeCategory1 === false){
                paginationNumber = 1
                var category1Url = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&search=${category1}&page=${paginationNumber}`;
                console.log(category1Url)
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                activeCategory1 = true;
                activeCategory2 = false;
                activeCategory3 = false;
                if (activeCategory1 === true){
                    if (category1Btn){
                        categoryBtnToggle('1', 'rgba(255, 255, 255, 0.836)', '#2f466f' )
                    }
                    if (category2Btn){
                        categoryBtnToggle('2', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category3Btn){
                        categoryBtnToggle('3', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                }
            } else if (activeCategory1 === true){
                var category1Url = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&page=${paginationNumber}`;
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                activeCategory1 = false;
                activeCategory2 = false;
                activeCategory3 = false;
                if (activeCategory1 === false){
                    if (category1Btn){
                        categoryBtnToggle('1', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category2Btn){
                        categoryBtnToggle('2', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category3Btn){
                        categoryBtnToggle('3', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                }
            }
            localStorage.setItem('filterUrl', category1Url);
            listProduts(category1Url);
        });
    }

    // bottoms products
    if (category2Btn) {
        category2Btn.addEventListener("click", function(){
            let category2Title = document.getElementById('list-products-banner-category_2-title');
            let category2 = category2Title.innerHTML;
            if (activeCategory2 === false){
                paginationNumber = 1
                var category2Url = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&search=${category2}&page=${paginationNumber}`;
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                activeCategory1 = false;
                activeCategory2 = true;
                activeCategory3 = false;
                if (activeCategory2 === true){
                    if (category1Btn){
                        categoryBtnToggle('1', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category2Btn){
                        categoryBtnToggle('2', 'rgba(255, 255, 255, 0.836)', '#2f466f')
                    }
                    if (category3Btn){
                        categoryBtnToggle('3', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                }
            } else if (activeCategory2 === true) {
                var category2Url = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&page=${paginationNumber}`;
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                activeCategory1 = false;
                activeCategory2 = false;
                activeCategory3 = false;
                if (activeCategory2 === false){
                    if (category1Btn){
                        categoryBtnToggle('1', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category2Btn){
                        categoryBtnToggle('2', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category3Btn){
                        categoryBtnToggle('3', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                }
            }
            localStorage.setItem('filterUrl', category2Url);
            listProduts(category2Url);
        });
    }

    // shoes products
    if (category3Btn){
        category3Btn.addEventListener("click", function(){
            let category3Title = document.getElementById('list-products-banner-category_3-title');
            let category3 = category3Title.innerHTML;
            if (activeCategory3 === false){
                paginationNumber = 1
                var category3Url = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&search=${category3}&page=${paginationNumber}`;
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                activeCategory1 = false;
                activeCategory2 = false;
                activeCategory3 = true;
                if (activeCategory3 === true){
                    if (category1Btn){
                        categoryBtnToggle('1', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category2Btn){
                        categoryBtnToggle('2', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category3Btn){
                        categoryBtnToggle('3', 'rgba(255, 255, 255, 0.836)', '#2f466f')
                    }
                }
            } else if (activeCategory3 === true) {
                var category3Url = `/api/products/${brandSlug}/product_by_brand/?ordering=-created_at&page=${paginationNumber}`;
                var deleteProducts = document.querySelectorAll('.list-product-box');
                deleteProducts.forEach(product =>{
                    product.outerHTML = "";
                });
                activeCategory1 = false;
                activeCategory2 = false;
                activeCategory3 = false;
                if (activeCategory3 === false){
                    if (category1Btn){
                        categoryBtnToggle('1', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category2Btn){
                        categoryBtnToggle('2', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                    if (category3Btn){
                        categoryBtnToggle('3', '#2f466f', 'rgba(255, 255, 255, 0.836)')
                    }
                }
            }
            listProduts(category3Url);
            localStorage.setItem('filterUrl', category3Url);
        });
    }

    function categoryBtnToggle(categoryNumber, new_color , new_brackground){
        let changeCategoryTitle = document.querySelector(`.list-category${categoryNumber}-title`);
        let changeCategoryBackground = document.querySelector(`#list-products-banner-category_${categoryNumber}`);
        changeCategoryTitle.style.color = `${new_color}`;
        changeCategoryBackground.style.backgroundColor = `${new_brackground}`;
    }

    // pagination
    // Next page
    nextPagBtn = document.querySelector('#pagination-btn-next'); 
    nextPagBtn.addEventListener("click", function(){
    nextBtnUrl = document.getElementById('pagination-btn-next')
    nextUrl = nextBtnUrl.className;
        if (activeCategory1 === true){
            //category1Url = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
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
            smoothScroll('#list-products-banner-category_1', 200)
        } else if (activeCategory2 === true){
            //category2Url = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
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
            smoothScroll('#list-products-banner-category_1', 200)
        } else if (activeCategory3 === true){
            //category3Url = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
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
            smoothScroll('#list-products-banner-category_1', 200)
        } else {
            //productUrl = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
            smoothScroll('#list-products-banner-category_1', 200)
        }
    });

    // Previous page
    prevPagBtn = document.querySelector('#pagination-btn-prev');
    prevPagBtn.addEventListener("click", function(){
        prevBtnUrl = document.getElementById('pagination-btn-prev')
        prevUrl = prevBtnUrl.className;
        console.log(`prev ${prevUrl}`);
            if (activeCategory1 === true){
                //category1Url = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&search=tops&page=${paginationNumber}`;
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
                smoothScroll('#list-products-banner-category_1', 200)
            } else if (activeCategory2 === true){
                //category2Url = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&search=bottoms&page=${paginationNumber}`;
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
                smoothScroll('#list-products-banner-category_1', 200)
            } else if (activeCategory3 === true){
                //category3Url = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&search=shoes&page=${paginationNumber}`;
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
                smoothScroll('#list-products-banner-category_1', 200)
            } else {
                //productUrl = `/api/products/${brandSlug}/product_by_category/?ordering=-created_at&page=${paginationNumber}`;
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
                smoothScroll('#list-products-banner-category_1', 200)
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
        console.log(filter_url)
        let newFilterUrl = '';  
        let sizes_url = '';
        const sizesSelected  = document.querySelectorAll(".list-products-filter-size-radio:checked");
        console.log(sizesSelected)
        if (sizesSelected.length > 0) {
            sizesSelected.forEach(size => {
                sizes_url += `sizes__size__size=${size.value}`;
            })
            last_filter = filter_url.split('&')
            newFilterUrl = `${last_filter[0]}&${last_filter[2]}&${sizes_url}&${last_filter[1]}`
            console.log(last_filter)
            console.log(newFilterUrl)
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            window.setTimeout(()=>{
                listProduts(newFilterUrl);
            }, 300) 
        } else {
            console.log("no hay tallas seleccionadas")
            var deleteProducts = document.querySelectorAll('.list-product-box');
            deleteProducts.forEach(product =>{
                product.outerHTML = "";
            });
            window.setTimeout(()=>{
                listProduts(filter_url);
            }, 300) 
            
        }
}

async function getFilterProducts(){
   const filterProduct = await filterProductsBySize()
}
