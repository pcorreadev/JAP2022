let id = '25801'
let user = ''
let password = ''
let email = ''

const userValidation = () => {
    user = document.getElementById('username').value;
    if (user===''){
        document.getElementById('username-error').innerText = 'Usuario no puede estar vacío';
        document.getElementById('username-error').style="visibility: visible";
    } else {
        document.getElementById('username-error').style="visibility: hidden";
        return true
    }
}

const passwordValidation= () => {
    password = document.getElementById('password').value;
    if (password===''){
        document.getElementById('password-error').innerText = 'Contraseña no puede estar vacía';
        document.getElementById('password-error').style="visibility: visible";
    }else {
        document.getElementById('password-error').style="visibility: hidden";
        return true
    }
}

const emailValidation= () => {
    email = document.getElementById('email').value;
    if (email===''){
        document.getElementById('email-error').innerText = 'Email no puede estar vacío';
        document.getElementById('email-error').style="visibility: visible";
    }else {
        document.getElementById('email-error').style="visibility: hidden";
        return true
    }
}

const register= () => {
    localStorage.setItem('user', user);
    localStorage.setItem('email', email);
    localStorage.setItem('id', id);
    localStorage.setItem('password', password);
    passwordValidation();
    emailValidation();
    userValidation();
    if (emailValidation() && passwordValidation() && userValidation()){

        location.href='index.html';
    }}
document.getElementById('email').addEventListener("blur",emailValidation)
document.getElementById('username').addEventListener("blur",userValidation)
document.getElementById('password').addEventListener("blur",passwordValidation)

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonregister').addEventListener("click", register);
    }
);
 
