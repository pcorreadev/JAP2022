let cartID = CART_INFO_URL + localStorage.getItem('id') + EXT_TYPE;
let userName = localStorage.getItem('user');
let cartArray = []

const showitemCart = () => {

    let price = "";
    let product = "";
    for (let item of cartArray.articles)
    product +=`

    <tr>
        <td data-th="Product" id=${item.id}>
            <div class="row">
                <div class="col-md-3 text-left">
                    <img src="${item.image}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow ">
                </div>
                <div class="col-md-9 text-left mt-sm-2">
                    <h4>${item.name}</h4>
                </div>
            </div>
        </td>
        <td data-th="price">${item.currency} ${item.unitCost} </td>
        <td data-th="subtotal" class = "subtotal" name="subtotal"></td>
        <td data-th="Quantity">
            <input type="number" name="counter" class="form-control form-control-lg text-center" value="1">
            
        </td>
        <td class="actions" data-th="">
            <div class="text-right">
                <button class="btn btn-white border-secondary bg-white btn-md mb-2">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
        `

    document.getElementById('cart-list').innerHTML= product

    document.querySelector("[name='counter']").addEventListener("change", function(){
        let counterElem = document.querySelector("[name='counter']").value
        let subtotal = ''
            for (let item of cartArray.articles)
                price = item.unitCost
                console.log (price)
                subtotal = parseInt(price) * parseInt(counterElem)
            document.querySelector("[name='subtotal']").innerHTML = subtotal
    })

}

const getTotal = () => {
    let total = 0;
    document.querySelectorAll('.subtotal').forEach(item => total += +item.textContent)
    document.getElementById('total').innerHTML = total
}


document.addEventListener("DOMContentLoaded", function(e){
    let usuario = localStorage.getItem('user');
    if (usuario === null){
        window.location = "login.html"
    } else {
    getJSONData(cartID).then(function(resultObj){
        if (resultObj.status === "ok"){
            cartArray = resultObj.data;
            }
            document.getElementById('logoutBtn').addEventListener("click", function(){
            cerrarSesion();
            })
            document.getElementById('dropdownMenuButton1').innerHTML= 'Bienvenido ' + userName
            showitemCart();
            document.querySelector("[name='counter']").addEventListener("change", function(){
            getTotal()
            })
        }
        )}
    })