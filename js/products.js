const ORDER_ASC_BY_PRICE = "--- a +++";
const ORDER_DESC_BY_PRICE = "+++ a ---";
const ORDER_BY_PROD_COUNT = "count";
let productID = PRODUCTS_URL + localStorage.getItem("catID") + EXT_TYPE;
let cartID = CART_INFO_URL + localStorage.getItem("id") + EXT_TYPE;
let initialArray = []
let currentArray = []
let criteria = undefined;
let maxCount = undefined;
let minCount = undefined;

const getProducts = () => {
    let product="";
    initialArray.products.map((item)=>{
            if (((minCount == undefined) || (minCount != undefined && item.cost >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && item.cost <= maxCount))) {
            product +=`
            <li class="list-group-item" id=${item.id}>
            <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                <div class = "product">
                    <h3 class="mt-0 font-weight-bold mb-2">${item.name}</h3>
                    <p class="font-italic text-muted mb-0 small">${item.description}</p>
                    <div class="d-flex align-items-center justify-content-between mt-1">
                        <h4 class="font-weight-bold my-2"> ${item.currency + " " + item.cost }</h4>
                        <h4 class="font-weight-bold my-2"> ${item.soldCount + " vendidos"}</h4>
                    </div>
                </div>
            </div>
            <div>
                <img src="${item.image}" alt="item image" width="200" class media align-items-lg-left>
            </div>
            </li>`
            }
        })
        document.getElementById('product list').innerHTML= product
        const productList = document.querySelectorAll("li")
            for (const product of productList) {
            product.addEventListener('click', function(e) {
            let productId = product.id
            console.log(productId)     
            localStorage.setItem("prodID", productId);
            window.location = "product-info.html"
        })   
    } 
}

document.getElementById("filtrar").addEventListener("click", function(){
    minCount = document.getElementById("min").value;
    maxCount = document.getElementById("max").value;
    getProducts();
});

document.getElementById("reset").addEventListener("click", function(){
    minCount = undefined
    maxCount = undefined
    currentArray = initialArray;
    initialArray.products.sort(function (a, b) {
        return a.id - b.id
    })
    getProducts(initialArray);
});

function sortProducts(){
    if (criteria === ORDER_BY_PROD_COUNT){
    initialArray.products.sort(function (a, b) {
        return b.soldCount - a.soldCount   
    });
    }else if (criteria === ORDER_DESC_BY_PRICE){
    initialArray.products.sort(function (a, b) {
       return b.cost - a.cost
     })

    }else if (criteria === ORDER_ASC_BY_PRICE){
    initialArray.products.sort(function (a, b) {
    return a.cost - b.cost 
    })  
}
getProducts()
}

document.addEventListener("DOMContentLoaded", function(e){
    let usuario = localStorage.getItem('user');
    if (usuario === null){
        window.location = "login.html"
    } else {
    document.getElementById('user').innerHTML = usuario ;
    getJSONData(productID).then(function(resultObj){
    if (resultObj.status === "ok"){
        initialArray = resultObj.data
        currentArray = JSON.parse(JSON.stringify(initialArray));
        document.getElementById('categoria').innerHTML += initialArray.catName;  
        getProducts();
        }
        console.log(usuario)
    })

    document.getElementById("sortRelev").addEventListener("click", function(){
        criteria = ORDER_BY_PROD_COUNT; 
        sortProducts();
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        criteria =(ORDER_DESC_BY_PRICE);
        sortProducts();
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        criteria =(ORDER_ASC_BY_PRICE);
        sortProducts();
    });

    
    document.getElementById("sortAsc").addEventListener("click", function(){
        criteria =(ORDER_ASC_BY_PRICE);
        sortProducts();
    });
};
})