let minCount = undefined;
let maxCount = undefined;
let currentArray = []

const getProducts = () => {
        let product="";

        currentArray.products.map((item)=>{
                if (((minCount == undefined) || (minCount != undefined && item.cost >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && item.cost <= maxCount))) {
                product +=`
                <li class="list-group-item">
                <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                    <div>
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
                </div>`
               }
            })
            document.getElementById('product list').innerHTML= product    
        }

document.getElementById("filtrar").addEventListener("click", function(){
    minCount = document.getElementById("min").value;
    maxCount = document.getElementById("max").value;
    console.log(maxCount)
    getProducts();
});
      
document.getElementById("reset").addEventListener("click", function(){
    getJSONData('https://japceibal.github.io/emercado-api/cats_products/101.json').then(function(resultObj){
        currentArray = resultObj.data 
        minCount = document.getElementById("min").value = '';
        maxCount = document.getElementById("max").value = '';
        getProducts();
    });
})

document.getElementById("sortRelev").addEventListener("click", function () {
    currentArray.products.sort(function (a, b) {
        return b.soldCount - a.soldCount 
    })
    getProducts()
});

document.getElementById("sortAsc").addEventListener("click", function () {
    currentArray.products.sort(function (a, b) {
        return a.cost - b.cost
    })
    getProducts()
});

document.getElementById("sortDesc").addEventListener("click", function () {
    currentArray.products.sort(function (a, b) {
       return b.cost - a.cost
     })
    getProducts()
 });

document.addEventListener("DOMContentLoaded", function(e){
    let usuario = localStorage.getItem('user');
    if (usuario === null){
        window.location = "login.html"
    } else {
    document.getElementById('user').innerHTML = usuario ;
    }
    getJSONData('https://japceibal.github.io/emercado-api/cats_products/101.json').then(function(resultObj){
            currentArray = resultObj.data
            document.getElementById('categoria').innerHTML += currentArray.catName;  
            getProducts();
    });
});
 