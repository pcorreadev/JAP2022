
let productKey = localStorage.getItem('prodID');
let initialArray = [];
let productID = PRODUCT_INFO_URL + productKey + EXT_TYPE;
let productComments = PRODUCT_INFO_COMMENTS_URL + productKey + EXT_TYPE;
let photos = []
let filteredArray = [];
let commentsArray = [];
let comments = [];
let addScore = ''
let userName = localStorage.getItem('user');
let newScore = ''
let productsArray = [
    {
      "user": 25801,
      "articles": [
      ]
  }
  ]
  
const showProduct = () => {
    let product="";    
            product =`
            <li class="list-group-item" id=${filteredArray.id}>
            <div class="media align-items-lg-center flex-column flex-lg-row p-3">
                <div class = "product">
                    <h3 class="mt-0 font-weight-bold mb-2">${filteredArray.name}</h3>
                    <p class="font-italic text-muted mb-0 small">${filteredArray.description}</p>
                    <div class="d-flex align-items-center justify-content-between mt-1">
                        <h4 class="font-weight-bold my-2"> ${filteredArray.currency + " " + filteredArray.cost }</h4>
                        <h4 class="font-weight-bold my-2"> ${filteredArray.soldCount + " vendidos"}</h4>
                    </div>
                </div>
            </div>
            </li>`

        document.getElementById('product').innerHTML= product
    } 

const showImages = () => {
    let photos = ""
    let galleryArray = JSON.parse(JSON.stringify(filteredArray))
    console.log(galleryArray)
    galleryArray.images.shift();
    photos+=
    `
    <div class="carousel-item active">
        <img class="testimonial-img" src="${filteredArray.images[0]}" style="width: 100%">
    </div>
    `
    for (let images of galleryArray.images){
        photos+=
    `
    <div class="carousel-item">
        <img class="testimonial-img" src="${images}" style="width: 100%">
    </div>
    `
    document.getElementById('carousel-photos').innerHTML= photos
    }
}

const showRelated = () => {
    let relatedProd = "";
    for (let relatedProducts of filteredArray.relatedProducts)
    relatedProd +=`
    <li class="related-items" id=${relatedProducts.id}>
        <div class="media align-items-lg-center flex-column flex-lg-row p-3">
            <div class = "product">
                <h3 class="mt-0 font-weight-bold mb-2">${relatedProducts.name}</h3>
                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                    <img src="${relatedProducts.image}" alt="item image" width="200" class media align-items-lg-left>
                </div>
            </div>
        </div>
    </li>`
    document.getElementById('related-products').innerHTML= relatedProd
    const productRelatedlist = document.getElementsByClassName("related-items")
        for (const product of productRelatedlist) {
            product.addEventListener('click', function(e) {
            let productId = product.id
            console.log(productId)     
            localStorage.setItem("prodID", productId);
            window.location = "product-info.html"
        })   
    } 
}

const showComments = () => {

    let commentsShown = "";
    commentsArray.map((comment)=>{
    let score = comment.score
    commentsShown+=
    ` 
<div class="card">
    <div class="row d-flex">
        <div class="d-flex flex-column">
            <h3 class="mt-2 mb-0">${comment.user}</h3>
            <div>
            ${showScore(score)}
            </div>
        </div>
    </div>
    <div class="row text-left">
        <h4 class="blue-text mt-3">"${comment.description}"</h4>
    </div>
    <div class="row text-left">
    <h4 class="blue-text mt-3">"${comment.dateTime}"</h4>
    </div>
</div>
    `
    } 
)
document.getElementById('comments').innerHTML += commentsShown
}

const cerrarSesion = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('catID');
    localStorage.removeItem('prodID');
}

const postComentario = () => {
    let usuario = {}
    let today = new Date ();
    console.log(today)
    datestring = today.getDate()  + "-" + (today.getMonth()+1) + "-" + today.getFullYear() + " " +
    today.getHours() + ":" + today.getMinutes();
    dateTime = datestring.value
    usuario.dateTime = datestring;
    usuario.user = userName;
    usuario.description = document.getElementById('comentario').value;
    usuario.score = document.getElementById('valor').textContent;
    commentsArray.push(usuario);
    showComments(commentsArray)
    usuario.description = document.getElementById('comentario').value = ''
    usuario.score = document.getElementById('valor').value = ''
}

const showScore = (score) => {
    addScore = ''
    for(let index = 0; index < score; index++)
    addScore += `<label for="radio2"><i class="fa fa-star"></i></i></label>`
    return addScore 
}

const comprar = () => {
    let articulo =
    {
        "id": filteredArray.id,
        "name": filteredArray.name,
        "count": filteredArray.count,
        "unitCost": filteredArray.cost,
        "currency": filteredArray.currency,
        "image": filteredArray.images[0]
    }
    if (localStorage.getItem("productsArray") === null) {
        productsArray[0].articles.push(articulo);
        localStorage.setItem("productsArray", JSON.stringify(productsArray));
    } else {
        let oldproductsArray = JSON.parse(localStorage.getItem('productsArray'));
        console.log(oldproductsArray)
        oldproductsArray[0].articles.push(articulo);
        localStorage.setItem("productsArray", JSON.stringify(oldproductsArray));
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    let usuario = localStorage.getItem('user');
    if (usuario === null){
        window.location = "login.html"
    } else {
    getJSONData(productID).then(function(resultObj){
        if (resultObj.status === "ok"){
            filteredArray = resultObj.data;
            }
            document.getElementById('logoutBtn').addEventListener("click", function(){
            cerrarSesion();
            })
            document.getElementById('dropdownMenuButton1').innerHTML= 'Bienvenido ' + userName
            document.getElementById('title').innerHTML = filteredArray.name;
            showProduct();
            showImages(); 
            showRelated();
            document.getElementById('botonComprar').addEventListener("click", function(){
                comprar();
            })
            getJSONData(productComments).then(function(comments){
                commentsArray = comments.data
                console.log(commentsArray)
                showComments();
                document.getElementById('send').addEventListener("click", function(){
                postComentario()
                })  
            })
        }
    )}
})
