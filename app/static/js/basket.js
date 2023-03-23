document.addEventListener('DOMContentLoaded', function() {
    refreshBasket();
    deleteBtn = document.querySelectorAll(".basket-product-delete-container");
    deleteBtn.forEach(function(btn){
        btn.addEventListener("click", function(){
            delete_id = btn.id;
            productSizeId = delete_id.split("_")[1];
            productSlug = delete_id.split("_")[2];
            deleteProductBasket(productSlug, productSizeId);
            window.setTimeout(()=>{
                window.location.reload();
            }, 300)
        } );
    })
    deleteEmptyQty();
    // change qty
    var changeSelect = document.querySelectorAll('#basket-product-qty-select');
    console.log(changeSelect)
    changeSelect.forEach(function(select){
        select.addEventListener("change", function() {
        update_id = select.className;
        console.log(update_id)
        productSizeId = update_id.split("_")[1];
        productSlug = update_id.split("_")[2];
        qty = this.value;
        updateProductQtyBasket(productSlug, productSizeId, qty);
        window.setTimeout(()=>{
            window.location.reload();
        }, 200)
    }
    )})
    
    // submit disconut
    var discountForm = document.querySelector('#discount-form');
    discountForm.onsubmit = function(){
        var discountCode = document.getElementById('basket-resumen-discount-input').value;
        discount(discountCode);
        return false;
    }   
    
    // Delete Discount
    var discountBtnX = document.querySelector('#delete-discount-btn');
    discountBtnX.addEventListener("click", function(){
        let discountBtn = document.getElementById('discount-box');
        let discountResult = document.getElementById('basket-resumen-discount');
        let price = document.getElementById('basket-resumen-costo').innerHTML;
        let totalprice = document.getElementById('basket-resumen-total-price');
        let discountCode = document.getElementById('basket-resumen-discount-input');
        discountResult.innerHTML = '--';
        totalprice.innerHTML = price;
        discountBtn.style.display = "none";
        discountCode.style.display = "block";
    })
    
    // checkout 
    var checkoutbtn = document.getElementById('basket-resumen-checkout-btn');
    checkoutbtn.addEventListener("click", function(){
        checkoutConfirmation();
    })
});

function discount(discountCode){
    code = discountCode.toUpperCase();
    let controller = new AbortController();
    fetch(`/api/discount_codes/${code}/`, {
        signal: controller.signal,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        }
        })
        .then((response) => {
            if (!response.ok){
                throw Error(response.status);
            }
            return response.json();    
        })
        .then(response => {
            data = response;
            console.log(data)
            console.log(response)
            var discountResult = document.getElementById('basket-resumen-discount');
            discountData = data.discount;
            discountResult.innerHTML = `${discountData}%`;
            var discountCode = document.getElementById('basket-resumen-discount-input');
            discountCode.value = "";
            var totalprice = document.getElementById('basket-resumen-total-price');
            total = parseInt(totalprice.innerHTML);
            total = total - (total * (discountData / 100)); 
            totalprice.innerHTML = total;
            discountCode.style.display = "none";
            discountBtn = document.getElementById('discount-box');
            discountBtn.style.display = "inline-flex";
            
        }).catch(error => {
            console.log(error)
            var discountResult = document.getElementById('basket-resumen-discount');
            discountResult.innerHTML = `0%`;
            alert("Código de descuento inválido")
        });
}

function refreshBasket(){
    
    fetch(`/api/products/refresh_basket/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(data => {
                if (typeof(data) === 'string'){
                    d = data.split(":")
                    totalRefresh = d[1]
                    let total = document.getElementById("basket-total-price").innerHTML;
                    if (totalRefresh !== total){
                        window.location.reload();
                    }
                }
            })
        })
}

function updateProductQtyBasket(productSlug, productSizeId, qty){
    var productSizeId = productSizeId;
    var productSlug = productSlug;
    var qty = qty;
    fetch(`/api/products/${productSlug}/update_basket/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
            "product_slug": productSlug,
            "product_size_id": productSizeId,
            "qty": qty,
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === "success"){
                alert("Producto actualizado")
            }
        })
}

function deleteProductBasket(productSlug, productSizeId){
    var productSizeId = productSizeId;
    var productSlug = productSlug;
    fetch(`/api/products/${productSlug}/delete_product_basket/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
            "product_slug": productSlug,
            "product_size_id": productSizeId,
        })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === "success"){
                alert("Producto eliminado del carrito")
            }
        })
}

function checkoutConfirmation(){
    //var soldProducts = []
    let productsSlug = document.querySelectorAll('.basket-hidden-product-slug-id');
    let totalAmount = document.getElementById('basket-resumen-total-price').innerHTML;
    let discount = document.getElementById('basket-resumen-discount').innerHTML;
    fetch(`/api/sold_products_confirmation/`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify({
        "sold_number_code": "Nro",
        "total_amount": totalAmount,
        "discount": discount
        })
        })
        .then(response => response.json())
        .then(confirmation => {
            productsSlug.forEach(slug =>{
                let productSlug = slug.innerHTML;
                let productSlugSize =productSlug.split('_')
                let pSlug = productSlugSize[0]
                let productSizeId = productSlugSize[1]
                fetch(`/api/products/${pSlug}/`)
                    .then(response => response.json())
                    .then(product =>{
                        let soldProduct = product.id;
                        let productName = product.name;
                        let productSlug = product.slug;
                        let productSku = product.sku;
                        let psize = document.querySelector(`.basket-product-size-${productSizeId}-${pSlug}`);
                        let productSize = psize.innerHTML
                        let soldProductSizeId = productSizeId;
                        let productSizeQty = document.querySelector(`.update-basket_${soldProductSizeId}_${product.slug}`);
                        let productConfirmation = confirmation.id;
                        let qty = productSizeQty.value;
                        fetch(`/api/sold_products/`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                "X-CSRFToken": getCookie("csrftoken"),
                                },
                            body: JSON.stringify({
                                "name": productName,
                                "slug": productSlug,
                                "sku": productSku,
                                "size": productSize,
                                "product_size": soldProductSizeId,
                                "qty": qty,
                                "sold_confirmation": productConfirmation
                                })
                                })
                                .then(response => response.json())
                                .then(soldProd => {
                                console.log(soldProd)
                                })    
                    });
            }) 
            window.setTimeout(()=>{
                let checkoutMsg = `${confirmation.sold_number_code }. Quisiera comprar estos productos: `
                let m = []
                let msgs = document.querySelectorAll('.ws-msg');
                msgs.forEach(ms =>{
                    m.push(ms)
                })
                console.log(msgs)
                var productMsg = m.map(function (msg) {
                    let nMsg = `${msg.innerHTML}`
                    return `\n ${nMsg.trim()}` 
                }).join(' ')
                let newMsg = checkoutMsg.concat(' ', productMsg.trim()) + ' ' + 'total: $' + totalAmount;
                console.log(newMsg )
                window.open(`https://api.whatsapp.com/send?phone=584125553868&text=${newMsg}`)
                //window.location.reload()
            }, 500)
        })
        
   
}

function deleteEmptyQty(){
    let changeSelect = document.querySelectorAll('#basket-product-qty-select');
    changeSelect.forEach(select =>{
        let qty = select.value;
        console.log(parseInt(qty))
        if (parseInt(qty) == 'NaN') {
            console.log("Eliminar")
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

