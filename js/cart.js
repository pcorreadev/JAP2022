
let userName = localStorage.getItem('user');
let dolar = 42
let cartArray = []
 const productsArray = localStorage.getItem('productsArray')
 let cartID = JSON.parse(productsArray);
 let deleteflag = ''

const showitemCart = () => {
    let product = "";
    for (let item of cartID[0].articles)
    product +=`
    <tr>
        <td data-th="Product" id=${item.id}>
            <div class="row">
                <div class="col-md-3 text-left">
                    <img src="${item.image}" alt="" class="img-fluid d-none d-md-block rounded mb-2 shadow">
                </div>
                <div class="col-md-9 text-left mt-sm-2">
                    <h4>${item.name}</h4>
                </div>
            </div>
        </td>
        <td data-th="price" type="number" classname= "price" name ="price">${item.unitCost} </td>
        <td data-th="subtotal" class = "subtotal" name="subtotal"></td>
        <td data-th="Quantity">
            <input type="number" name="counter" class="form-control form-control-lg text-center" class="counter" value="1" min="1" oninput="validity.valid||(value=1);" required>
        </td>
        <td class="actions" data-th="">
            <div class="text-right">
                <button class="deleteBtn" name="deleteBtn" id='${cartID[0].articles.indexOf(item)}'>
                <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    </tr>
        `
    document.getElementById('cart-list').innerHTML= product
    calculos ();
}

const calculos = () => {
    let unidades = document.getElementsByName('counter')
    let precios = document.getElementsByName('price');
    let subtotales = document.getElementsByName('subtotal');
    let subtotal = 0
    
    for (let i=0; i< precios.length; i++){
        subtotales [i].innerHTML=parseFloat(precios[i].innerHTML) * parseFloat(unidades[i].value);
        subtotal+= parseFloat(precios[i].innerHTML) * parseFloat(unidades[i].value);
    }
    document.getElementById('subtotalGral').innerHTML = subtotal.toFixed(2)

    let envio= 0
    let envioPremium = document.getElementById('checkPremium')
    let envioExpress = document.getElementById('checkExpress')
    let envioStandard = document.getElementById('checkStandard')

    if (envioPremium.checked) {
        envio = subtotal * 0.15
    }
    if (envioExpress.checked) {
        envio = subtotal * 0.07
    }
    if (envioStandard.checked) {
        envio = subtotal * 0.05
    }
    let envioIncluido = parseFloat(subtotal) + parseFloat(envio)
    document.getElementById('envio').innerHTML = envio.toFixed(2)
    document.getElementById('total').innerHTML = envioIncluido.toFixed(2)
}

const validaciones = () => {
    let nombreCalle = document.getElementById('nombre-calle')
    let numero = document.getElementById('numero-puerta')
    let esquina = document.getElementById('nombre-esquina')
    let tarjeta = document.getElementById('tarjeta')
    let transferencia = document.getElementById('transferencia')
    let inputTarjeta = document.getElementById('inputTarjeta')
    let cvcTarjeta = document.getElementById('cvcTarjeta')
    let vencTarjeta = document.getElementById('vencTarjeta')
    let nroCuenta = document.getElementById('nroCuenta')
    let aviso = document.getElementById('feedback-modal-metodoPago')
    let regexText =/^[A-Za-z]+$/
    let fields=[ inputTarjeta, cvcTarjeta, vencTarjeta];
    let flag = true

    if (regexText.test(nombreCalle.value)){
        nombreCalle.setCustomValidity('');
    }else{
        nombreCalle.setCustomValidity(false);
        flag=false;
    }
    if (regexText.test(esquina.value)){
        esquina.setCustomValidity('');
    }else{
        esquina.setCustomValidity(false);
        flag=false;
    }
    if (numero.checkValidity()){
        numero.setCustomValidity('');
    } else {
        flag=false;
    }
    if (transferencia.checked || tarjeta.checked){
        console.log('holas')
        document.getElementById("btn-modal-metodoPago").classList.remove("invalid-color");
        aviso.style.display = "none";
    } else {
            document.getElementById("btn-modal-metodoPago").classList.add("invalid-color");
            aviso.style.display = "inline";
            flag=false;  
    }
    transferencia.addEventListener("click", function(){
        inputTarjeta.disabled = true
        cvcTarjeta.disabled = true
        vencTarjeta.disabled = true
        nroCuenta.disabled = false
        tarjeta.checked = false;
        nroCuenta.setAttribute("required", "");
        if (nroCuenta.checkValidity() && nroCuenta.value != ''){
            nroCuenta.setCustomValidity('');
        }else {
            flag=false;
        }
         fields.forEach(field => {
            field.value = ''
           })
    })
    tarjeta.addEventListener("click", function(){
        transferencia.checked = false
        nroCuenta.disabled = true
        nroCuenta.value = ''
        inputTarjeta.disabled = false
        cvcTarjeta.disabled = false
        vencTarjeta.disabled = false
        
        fields.forEach( field => {
            field.setAttribute("required", "");
            if (field.checkValidity()){
            field.setCustomValidity('');
            } else {
                flag=false;
            }
        })
        
    })
    return flag
}

const deleteProduct = () => {
    cartArray = cartID[0].articles.splice(deleteflag,1)
    showitemCart();
}

document.getElementById('formulario').addEventListener('submit', evento=>{
    if( !validaciones() ){
        evento.preventDefault();
        evento.stopPropagation();
    }
    document.getElementById('formulario').classList.add('was-validated');
    let events=['change', 'input'];
    events.forEach( event => {document.body.addEventListener(event, validaciones)})
})

document.addEventListener("DOMContentLoaded", function(e){
    let usuario = localStorage.getItem('user');
    if (usuario === null){
        window.location = "login.html"
    } else {
        cartArray = cartID
        document.getElementById('logoutBtn').addEventListener("click", function(){
        cerrarSesion();
        })
        document.getElementById('dropdownMenuButton1').innerHTML= 'Bienvenido ' + userName
        showitemCart();   
        let envios = document.getElementsByName('enviosRadio')
        let unidades = document.getElementsByName('counter')
        unidades.forEach(elem => elem.addEventListener("change", calculos))
        envios.forEach(elem => elem.addEventListener("change", calculos))
     
        const btns = document.querySelectorAll('.deleteBtn');
        Array.from(btns).forEach(function(btn) {
        btn.addEventListener('click', function() {
            deleteflag = this.id
            deleteProduct(deleteflag);
        });
        });
        document.getElementById('comprar').addEventListener("click", function(){
            validaciones();
            if(validaciones()) {
                Swal.fire('La compra fue realizada!')
            }
        })
    }
})