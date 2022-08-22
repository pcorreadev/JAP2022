const getProducts = () => {
    fetch('https://japceibal.github.io/emercado-api/cats_products/101.json').then((data)=>{
    return data.json();
   
    }).then((data)=> {
        let product="";
        data.products.map((item)=>{
            product+=`
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
        });
        document.getElementById('product list').innerHTML= product;
        document.getElementById('categoria').innerHTML += data.catName;

    })
    .catch ((error)=>{
        console.log(error);
    });

}

getProducts();