document.addEventListener('DOMContentLoaded', function() {
    getRandomProducts()
});

function getRandomProducts(){
    fetch(`/api/products/list_random_products/`)
        .then(response => response.json())
        .then(products =>{
            //console.log(products)
            products.results.forEach(product => {
                var productCategories = product.category.join(" ");
                const productBox = document.createElement("DIV")
                productBox.classList.add("product-box")
                productBox.innerHTML = 
                `<div class="product-img-container">
                    <div class="product-img">
                        <a href="/product/${product.slug}/"><img src="${product.image}" alt=""></a>
                    </div>
                </div>
                <div class="product-box-text">
                    <div class="product-store-price">
                        <span id="carousel-product-sale-price-${product.slug}" class=" ">$${product.sale_price}</span>
                        <span id="carousel-product-price-${product.slug}" class=" carousel-product-sale-store-price">$${product.store_price}</span>
                    </div>
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-category">
                    <span>${productCategories}</span>
                </div>`
                document.getElementById("glider-id").appendChild(productBox)
                if (product.is_sale_price_active === true) {
                    let salePrice = document.getElementById(`carousel-product-sale-price-${product.slug}`);
                    let storePrice = document.getElementById(`carousel-product-price-${product.slug}`);
                    salePrice.classList.add("carousel-product-sale-price");
                    storePrice.classList.add("carousel-product-sale-store-price")
                } else if (product.is_sale_price_active === false) {
                    let salePrice = document.getElementById(`carousel-product-sale-price-${product.slug}`);
                    let storePrice = document.getElementById(`carousel-product-price-${product.slug}`);
                    salePrice.style.display = "none";
                    storePrice.classList.add("carousel-product-price")
                } 
            });
            gliderFunction()
        })
    }

function getMoreSearchedProducts(){
  fetch(`/api/products/?ordering=-views`)
        .then(response => response.json())
        .then(products =>{
            //console.log(products)
            products.results.forEach(product => {
                const productBox = document.createElement("DIV")
                productBox.classList.add("product-box")
                productBox.innerHTML = 
                `<div class="product-img-container">
                    <div class="product-img">
                        <a href="/product/${product.slug}/"><img src="${product.image}" alt=""></a>
                    </div>
                </div>
                <div class="product-box-text">
                    <div class="product-store-price">
                        <span id="carousel-product-sale-price-${product.slug}" class=" ">$${product.sale_price}</span>
                        <span id="carousel-product-price-${product.slug}" class="product-price carousel-product-sale-store-price">$${product.store_price}</span>
                    </div>
                <div class="product-name">
                    ${product.name}
                </div>
                <div class="product-category">
                    <span>${product.category}</span>
                </div>`
                document.getElementById("glider-id").appendChild(productBox)
            });
            gliderFunction()
        })
}

function gliderFunction(){
    //glider
    new Glider(document.querySelector('.glider'), {
        slidesToScroll: 1,
        slidesToShow: 4,
        draggable: true,
        dots: '.dots',
        arrows: {
          prev: '.glider-prev',
          next: '.glider-next'
        },
        responsive: [
            {
              // screens greater than >= 1200px
              breakpoint: 1200,
              settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 4,
                slidesToScroll: 2,
              }
            },{
              // screens greater than >= 900px
              breakpoint: 900,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },{
                // screens greater than >= 640px
                breakpoint: 530,
                settings: {
                  slidesToShow: 2.1,
                  slidesToScroll: 1,
                }
            },{
                // screens greater than >= 304px
                breakpoint: 304,
                settings: {
                  slidesToShow: 2.1,
                  slidesToScroll: 1,
                }
            },{
                // screens greater than >= 0px
                breakpoint: 0,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
            }
          ]
      });
}