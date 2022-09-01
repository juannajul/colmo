document.addEventListener('DOMContentLoaded', function() {
    var path = window.location.pathname;
    productSlug = path.split('/')[2];
    productRetrieve(productSlug);
    // get selected size
    window.setTimeout(()=>{
        //getSelectedSize();
        var addBasketBtn = document.querySelector(".product-add-button");
        console.log(addBasketBtn); 
        addBasketBtn.addEventListener("click", function(){
            addProductBasket(productSlug);
            var addMessage = document.querySelector(".add-product-msg-container");
            addMessage.style.display = "block";
        });
     }, 1000)
    // add product to basket
    
});

function productRetrieve(productSlug){
    fetch(`/api/products/${productSlug}/`)
        .then(response => response.json())
        .then(product =>{
            var productCategories = product.category.join(" ");
            console.log(productCategories)
            var pathImg1 = product.image;
            var pathImg2 = product.image2;
            var pathImg3 = product.image3;
            
            // Product
            const productContainer = document.createElement("DIV");
            productContainer.setAttribute("id", "product-container");
            productContainer.innerHTML = `<div id="product-images-container">
            <div class="principal-image-box">
                  <div class="product-image principal-image">
                     <a href=""><img id="principal-img" src="${product.image}" alt=""></a>
                  </div>
            </div>
            <div class="product-sec-images">
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
                <div class="product-add-btn-container">
                    <button id="product-add-button" class="product-add-button" type="button">Añadir al carrito</button>
                </div>
                <div class="add-product-msg-container">
                    <h4 class="add-product-msg">¡Producto añadido a tu carrito!</h4>
                </div>
                </form>
         </div>`
            document.getElementById("product-retrieve-container").appendChild(productContainer);
            changePrincipalImage(pathImg1, pathImg2, pathImg3)
            // Sale price
            if (product.is_sale_price_active === true){
                productPrice = document.getElementById("product-price");
                productSalePrice = document.getElementById("product-sale-price");
                productSalePrice.setAttribute("class", "product-sale-price");
                productSalePrice.removeAttribute("class", "product-sale-price-none");
                productPrice.setAttribute("class", "product-price-active-sale");
            }
            
            // Product sizes
            productSizes(product)
            // product views
            var productViews = product.views;
            fetch(`/api/products/${productSlug}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "X-CSRFToken": getCookie("csrftoken"),
                },
                body: JSON.stringify({
                    "views": productViews + 1
                })
                })
                .then(response => response.json())
                .then(product => {
                    console.log(product.views)
                });
        });    
}

function productSizes(product){
    var productSizes = product.sizes;
    var product_sizes = [];
    productSizes.forEach(product_size => {
        fetch(`/api/sizes/${product_size.size}/`)
            .then(response => response.json())
            .then(size => {
                var productSizesId = `${product_size.id}`;
                var productQty = `${product_size.qty}`;
                if (parseInt(productQty) > 0){
                    product_sizes.push({
                        "product_size_id":productSizesId,
                        "qty":productQty,
                        "size_id": `${size.id}`,
                        "size": `${size.size}`
                        })
                    }
                productSizesContent = document.querySelector("#product-sizes-content");
                productSizesContent.innerHTML =  product_sizes.map(function (size) {
                    return `
                    <div class="product-size-box">
                        <input type="radio" id="${size.product_size_id}" class="product-size-radio" name="product-size-radio" value="${size.product_size_id}" >
                        <label class="product-size-title" id="p-size${size.product_size_id}" value="${size.size}" for="${size.product_size_id}">${size.size}</label>
                    </div>
                    `}).join('');
                })
            });
            product.sizes = product_sizes;
            console.log(product)
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

function getSelectedSize(){
    let selected = document.querySelector(".product-size-radio:checked").value;
    return selected;
}

function addProductBasket(productSlug){
    var productSizeId = getSelectedSize();
    var productSlug = productSlug;
    var size = document.querySelector(`#p-size${productSizeId}`).innerHTML;
    console.log(size);
    fetch(`/api/products/${productSlug}/add_product_basket/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
            "product_slug": productSlug,
            "product_size_id": productSizeId,
            "size": size
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === "success"){
                alert("Producto agregado al carrito")
            }
        })
}

function getCookie(name) {
    var cookieValue = null;

    if (document.cookie && document.cookie !== '') {

        var cookies = document.cookie.split(';');

        for (var i = 0; i < cookies.length; i++) {

            var cookie = cookies[i].trim();

            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}