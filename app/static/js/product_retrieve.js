document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname
    productSlug = path.split('/')[2]
    productRetrieve(productSlug)
});

function productRetrieve(productSlug){
    fetch(`/api/products/${productSlug}/`)
        .then(response => response.json())
        .then(product =>{
            var productSizes = product.sizes;
            var productCategories = product.category.join(" ");
            console.log(productCategories)
            var product_sizes = [];
            var pathImg1 = product.image;
            var pathImg2 = product.image2;
            var pathImg3 = product.image3;
            
            productSizes.forEach(product_size => {
                fetch(`/api/sizes/${product_size.size}/`)
                    .then(response => response.json())
                    .then(size => {
                        var productSizesId = `${product_size.id}`;
                        var productQty = `${product_size.qty}`;
                        product_sizes.push({
                            "product_size_id":productSizesId,
                            "qty":productQty,
                            "size_id": `${size.id}`,
                            "size": `${size.size}`
                        })
                    })
            });
            product.sizes = product_sizes;
            console.log(product_sizes)
            console.log(product)
            
            // Product
            const productContainer = document.createElement("DIV");
            productContainer.setAttribute("id", "product-container");
            productContainer.innerHTML = `<div id="product-images-container">
            <div class="principal-image-box">
                  <div class="product-image principal-image">
                     <a href=""><img id="principal-img" src="${product.image}" alt=""></a>
                  </div>
            </div>
            <div id="img1" class="product-image-box">
               <div class="product-image">
                  <img src="${product.image}" alt="">
              </div>
            </div>
            <div id="img2" class="product-image-box">
               <div class="product-image">
                  <img src="${product.image2}" alt="">
              </div>
            </div>
            <div id="img3" class="product-image-box">
               <div class="product-image">
                  <img src="${product.image3}" alt="">
              </div>
            </div>
         </div>
         <div id="product-info-container">
            <div id="product-title-container">
               <h3 class="product-title">${product.name}</h3>
            </div>
            <div id="product-categoires-container">
                <h4 class="product-categories">${productCategories}</h4>
            </div>
            <div class="clearfix"></div>
            <div id="product-brand-container">
                <h4 class="product-brand">${product.made_by}</h4>
            </div>
            <div id="product-price-container">
                <span id="product-sale-price" class="product-sale-price-none">$${product.sale_price}</span><h4 id="product-price" class="product-price"> $${product.store_price} </h4>
            </div>
            <div class="clearfix"></div>
            <form id="product-buy-tool" class="product-buy-form" action="" method="post">
                <h3 class="product-size">Tallas</h3>
                <div id="product-sizes-container">
                    <div id="product-sizes-content">
                    </div>
                </div>
            </form>
         </div>`
            document.getElementById("product-retrieve-container").appendChild(productContainer);
            changePrincipalImage(pathImg1, pathImg2, pathImg3)
            // Sale price
            console.log(product.is_sale_price_active)
            if (product.is_sale_price_active === true){
                productPrice = document.getElementById("product-price");
                productSalePrice = document.getElementById("product-sale-price");
                productSalePrice.setAttribute("class", "product-sale-price");
                productSalePrice.removeAttribute("class", "product-sale-price-none");
                productPrice.setAttribute("class", "product-price-active-sale");
            }
            // Product sizes
          
            var sizes = product.sizes;
            for (var key in sizes) {
                console.log(key)
            }
           /* console.log(sizes);
            productSizesContent = document.querySelector("#product-sizes-content");
            productSizesContent.innerHTML = '<ul>' + sizes.map(function (size) {
                return `
                <div class="product-size-box">
                    <h4 class="product-size-title"></h4>
                </div>
                `}).join('') + '</ul>';*/
        })
}

function changePrincipalImage(image1, image2, image3){
    var img1 = document.getElementById("img1");
    var img2 = document.getElementById("img2");
    var img3 = document.getElementById("img3");
    img1.onclick = () => {
        var principalImg = document.getElementById("principal-img");
        principalImg.src = image1;
    }
    img2.onclick = () => {
        var principalImg = document.getElementById("principal-img");
        principalImg.src = image2;
        console.log(image2)
    } 
    img3.onclick = () => {
        var principalImg = document.getElementById("principal-img");
        principalImg.src = image3;
    }
}               
