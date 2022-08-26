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
        updateProductSizeBasket(productSlug, productSizeId, qty);
        window.setTimeout(()=>{
            window.location.reload();
        }, 200)
    }
    )})
    
});

function refreshBasket(){
    fetch(`/api/products/refresh_basket`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRFToken": getCookie("csrftoken"),
        }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === "success"){
                window.location.reload();
            }
        })
}

function updateProductSizeBasket(productSlug, productSizeId, qty){
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