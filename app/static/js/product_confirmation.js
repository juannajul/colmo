document.addEventListener('DOMContentLoaded', function () {
    
    showProductsConfirmation();
    window.setTimeout(()=>{
        confirmationBtns();
        checkoutProduct();
        closeCheckout()
        
    }, 300) 
    
});

function confirmationBtns(){
    fetch(`/api/sold_products_confirmation/?ordering=-created_at`)
        .then(response => response.json())
        .then(confirmation => {
            let confirmations = confirmation.results;
            confirmations.forEach(conf => {
                let confirmationStatus = conf.confirmation;
                let finishedStatus = conf.finished;
                if (confirmationStatus === true){
                    let confirmationBtn = document.getElementById(`product-btn-confirmation_${conf.id}`);
                    confirmationBtn.style.display = 'none';
                    let finishBtn = document.getElementById(`product-btn-cancelation_${conf.id}`);
                    finishBtn.style.display = 'none';
                }
                if (finishedStatus === true){
                    let confirmationBtn2 = document.getElementById(`product-btn-confirmation_${conf.id}`);
                    confirmationBtn2.style.display = 'none';
                    let finishBtn2 = document.getElementById(`product-btn-cancelation_${conf.id}`);
                    finishBtn2.style.display = 'none';
                }
            });
            

        });
}

function showProductsConfirmation(){
    var confirmation_list = []
    var conf_id_list = []
    fetch(`/api/sold_products_confirmation/?ordering=-created_at`)
        .then(response => response.json())
        .then(data => {
            var all_confirmations = data.results
            //console.log(data)
            confirmation_list.push(all_confirmations)
            //console.log(confirmation_list)
            confirmation_list.forEach(productsConfirmation => {
                const confirmationContainer = document.querySelector('.item-confirmation-container');
                
                confirmationContainer.innerHTML = productsConfirmation.map(function (conf) {
                    let conf_id = conf.id;
                    conf_id_list.push(conf_id)
                    return `
                        <div class="product-confirmation-container">
                            <div class="product-confirmation-info-container">
                                <div id="product-confirmation-info">
                                <label id="conf-slug">${conf.sold_number_code}
                                <h4>Numero de venta: ${conf.sold_number_code}</h4>
                                <h4>Descuento: ${conf.discount}</h4>
                                <h4>Monto total de venta: $${conf.total_amount}</h4>
                                </div>
                            </div>
                            <div id="product-confirmation-products-container" class="product-confirmation-products-container-${conf.id}">
                                
                            </div>
                        <div class="product-confirmation-btns-container">
                            <button id="product-btn-confirmation_${conf.id}" class="product-btn-confirmation">Confirmar Venta</button>
                            <button id="product-btn-cancelation_${conf.id}" class="product-btn-cancelation">Cancelar Venta</button>
                        </div>
                    </div>
                        `}).join('');
            //console.log(productsConfirmation)    
            });
            
           // let productConfirmationId = 
        })   
        window.setTimeout(()=>{
            //console.log(conf_id_list)
            
            conf_id_list.forEach(id =>{
                fetch(`/api/sold_products/${id}/product_confirmation/`)
                .then(response => response.json())
                .then(data => {
                    products = data.results
                   // console.log(products)
                    //products_list = [products]
                    const soldProductConfirmation = document.querySelector(`.product-confirmation-products-container-${id}`);
                    soldProductConfirmation.innerHTML = products.map(function (product) {
                        fetch(`/api/products/`)
                        return `
                                <div class="product-confirmation-product-name">
                                    <a href="/product/${product.slug}/">- ${product.name}</a> 
                                </div>
                                <div class="product-confirmation-product-info">
                                    <p id="confirmation-product-size_${product.product_size}"> ${product.size}</p>
                                </div>
                                <div class="product-confirmation-product-info">
                                    <span>Cantidad: </span><p id="confirmation-product-size-qty_${product.product_size}">${product.qty}</p>
                                </div>
                        `
                    }).join('');
                })
            })
            
        }, 300)  
}

function checkoutProduct(){
    var btns = document.querySelectorAll(".product-btn-confirmation");
    btns.forEach(btn => {
        btn.addEventListener('click', function(){
            console.log(this.id)
            let confirmationId = this.id.split("_")[1]
            console.log(confirmationId)
            fetch(`/api/sold_products/${confirmationId}/product_confirmation/`)
                .then(response => response.json())
                .then(data => {
                    let products = data.results;
                    console.log(products)
                    products.forEach(product => {
                        let size_qty = document.getElementById(`confirmation-product-size-qty_${product.product_size}`).innerHTML;
                        console.log(size_qty)
                        fetch(`/api/product_sizes/${product.product_size}/`)
                            .then(response => response.json())
                            .then(data => {
                                let productSize = data;
                                let sizeId = productSize.id
                                let size = productSize.size
                                console.log(sizeId)
                                let productQty = productSize.qty;
                                let newQty = productQty - size_qty;
                                //let newQty = size_qty - productQty;
                                console.log(productQty)
                                console.log(newQty)
                                if (newQty < 0) {
                                    alert("Error cantidad de producto insuficiente.")
                                }
                                else {
                                    fetch(`/api/product_sizes/${sizeId}/`,{
                                        method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            "X-CSRFToken": getCookie("csrftoken"),
                                        },
                                        body: JSON.stringify({
                                            "qty": newQty,
                                            "size": size
                                        })
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data)
                                        fetch(`/api/sold_products_confirmation/${confirmationId}/`, {
                                            method: 'PATCH',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            "X-CSRFToken": getCookie("csrftoken"),
                                        },
                                        body: JSON.stringify({
                                            "confirmation": true,
                                            })
                                        })
                                        .then(response => response.json())
                                        .then(data => {
                                            window.location.reload();
                                        })
                                       
                                    })        
                                }
                            })
                    })
                });
        });
    })
    console.log(btns)
}


function closeCheckout(){
    var btns = document.querySelectorAll(".product-btn-cancelation");
    btns.forEach(btn => {
        btn.addEventListener('click', function(){
            let confirmationId = this.id.split("_")[1]
            fetch(`/api/sold_products_confirmation/${confirmationId}/`, {
                method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": getCookie("csrftoken"),
            },
            body: JSON.stringify({
                "finished": true,
                })
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
        })
            
        });
    
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