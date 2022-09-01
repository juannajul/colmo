document.addEventListener('DOMContentLoaded', function() {
    getRandomProducts()
});

function getRandomProducts(){
    fetch(`/api/products/?ordering=-created_at&limit=15`)
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
                        <span class="product-price">$${product.store_price}</span>
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
                        <span class="product-price">$${product.store_price}</span>
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