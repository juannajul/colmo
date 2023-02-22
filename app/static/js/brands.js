document.addEventListener('DOMContentLoaded', function() {
    getBrands()
});

function getBrands(){
    fetch(`/api/brands/active_brands/`)
        .then(response => response.json())
        .then(brands =>{
            //console.log(brands)
            brands = brands.results;
            console.log(brands);
            brands.forEach(brand => {
                const brandContainer = document.createElement("DIV");
                brandContainer.setAttribute("id", "brand-container");
                brandContainer.innerHTML = `
                <div id="brand-images-container">
                    <a href="/brands/${brand.slug}"><img id="brand-img" src="${brand.brand_image}" alt=""></a>
                </div>`
                document.getElementById("index-brands-container").appendChild(brandContainer);
            });
        })
    }