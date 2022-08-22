const userValidation = () => {
    let user = document.getElementById('username').value;
    if (user===''){
        document.getElementById('username-error').innerText = 'Usuario no puede estar vacío';
        document.getElementById('username-error').style="visibility: visible";
    } else {
        document.getElementById('username-error').style="visibility: hidden";
        return true
    }
}

const passwordValidation= () => {
    let password = document.getElementById('password').value;
    if (password===''){
        document.getElementById('password-error').innerText = 'Contraseña no puede estar vacía';
        document.getElementById('password-error').style="visibility: visible";
    }else {
        document.getElementById('password-error').style="visibility: hidden";
        return true
    }
}

const login= () => {
    let user = document.getElementById('username').value;
    passwordValidation();
    userValidation();
    if (passwordValidation() && userValidation()){
        localStorage.setItem('user', user);
        location.href='index.html';
    }}

document.getElementById('username').addEventListener("blur",userValidation)
document.getElementById('password').addEventListener("blur",passwordValidation)

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonlogin').addEventListener("click", login);
    }
);
 
