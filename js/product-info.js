
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

const showImages = () => {
    let photos = ""
    for (let images of filteredArray.images){
        photos+=
    `
    <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
        <img src="${images}" alt="item image" width="200" class media align-items-lg-left>
    </div>
    `
    document.getElementById('gallery').innerHTML= photos
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

const showScore = (score) => {
    console.log(score)
    addScore = ''
    for(var index = 0; index < score; index++)
    addScore += `<label for="radio2"><i class="fa fa-star"></i></i></label>`
    return addScore 
    }

    document.addEventListener("DOMContentLoaded", function(e){
        let usuario = localStorage.getItem('user');
        if (usuario === null){
            window.location = "login.html"
        } else {
        document.getElementById('user').innerHTML = usuario ;
        getJSONData(productID).then(function(resultObj){
            if (resultObj.status === "ok"){
                filteredArray = resultObj.data;
                }
                document.getElementById('title').innerHTML = filteredArray.name;
                showProduct();
                showImages(); 
                getJSONData(productComments).then(function(comments){
                    commentsArray = comments.data
                    console.log(commentsArray)
                    showComments();
                    document.getElementById('send').addEventListener("click", function(){
                        let usuario = {}
                        let today = new Date ();
                        console.log(today)
                        dateTime = today.getDate() + "/" + parseInt(today.getMonth()+ 1) + "/" + today.getFullYear();
                        usuario.dateTime = today;
                        usuario.user = userName;
                        usuario.description = document.getElementById('comentario').value;
                        usuario.score = document.getElementById('valor').textContent;
                        commentsArray.push(usuario);
                        showComments(commentsArray)
                    })  
                })   
        }
    )}
})
