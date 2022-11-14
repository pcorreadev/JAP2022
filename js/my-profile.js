

let usuario = localStorage.getItem('user');
let userData = {}
let nombre = document.getElementById('primer-nombre')
let segundoNombre = document.getElementById('segundo-nombre')
let apellido = document.getElementById('apellido')
let segundoApellido = document.getElementById('segundo-apellido')
let telefono = document.getElementById('telefono')
let email = document.getElementById('email')

const validaciones = () => {
    let regexEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let regexText =/^[A-Za-z]+$/
    let flag = true

    if (regexEmail.test(email.value)){
        email.setCustomValidity('');
    }else{
        email.setCustomValidity(false);
        flag=false;
    }
    if (telefono.checkValidity() || telefono.value === ''){
        telefono.setCustomValidity('');
    } else {
        flag=false;
    }
    if (regexText.test(apellido.value)){
        apellido.setAttribute("required", "");
        apellido.setCustomValidity('');
    }else{
        apellido.setCustomValidity(false);
        flag=false;
    }
    if (regexText.test(segundoApellido.value) || segundoApellido.value === ''){
        segundoApellido.setCustomValidity('');
    }else{
        segundoApellido.setCustomValidity(false);
        flag=false;
    }
    if (regexText.test(segundoNombre.value) || segundoNombre.value === ''){;
        segundoNombre.setCustomValidity('');
    }else{
        segundoNombre.setCustomValidity(false);
        flag=false;
    }
    if (regexText.test(nombre.value)){
        nombre.setAttribute("required", "");
        nombre.setCustomValidity('');
    }else{
        nombre.setCustomValidity(false);
        flag=false;
    }
    return flag
}

document.getElementById('formulario').addEventListener('submit', evento=>{
    if( !validaciones() ){
        evento.preventDefault();
        evento.stopPropagation();
    }
    document.getElementById('formulario').classList.add('was-validated');
    let events=['change', 'input'];
    events.forEach( event => {document.body.addEventListener(event, validaciones)})
    localStorage.setItem("userData", JSON.stringify(userData));
})

document.addEventListener("DOMContentLoaded", function(e){
    if (usuario === null){
        window.location = "login.html"
    } else {
            document.getElementById('logoutBtn').addEventListener("click", function(){
            cerrarSesion();
            })
            userData = JSON.parse(localStorage.getItem("userData"));
            if (userData === null) {
                email.value = localStorage.getItem('email');
                nombre.value = ''
                apellido.value = ''
                telefono.value = ''
                segundoNombre.value = ''
                segundoApellido.value = ''
                telefono.value = ''

            } else {
                nombre.value = userData.nombre
                segundoNombre.value = userData.segundoNombre
                apellido.value = userData.apellido
                segundoApellido.value = userData.segundoApellido
                email.value = userData.email
                telefono.value = userData.telefono
            }
            document.getElementById('dropdownMenuButton1').innerHTML= 'Bienvenido ' + userName
            document.getElementById('guardarCambios').addEventListener("click", function(){
                if (validaciones()) {
                userData = {
                    nombre : nombre.value,
                    segundoNombre : segundoNombre.value,
                    apellido : apellido.value,
                    segundoApellido : segundoApellido.value,
                    email : email.value,
                    telefono : telefono.value
                    }
                localStorage.setItem("userData", JSON.stringify(userData));
                }
            })
    }
})