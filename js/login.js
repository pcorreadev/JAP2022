let id = '25801'
let user = ''
let password = ''

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

const login= () => {
    localStorage.setItem('user', user);
    localStorage.setItem('id', id);
    localStorage.setItem('password', password);
    passwordValidation();
    userValidation();
    if (passwordValidation() && userValidation()){
  
        location.href='index.html';
}}
   
function onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    localStorage.setItem('id', profile.getId());
    localStorage.setItem('user', profile.getName());
    location.href='index.html'
}

document.getElementById('username').addEventListener("blur",userValidation)
document.getElementById('password').addEventListener("blur",passwordValidation)

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('buttonlogin').addEventListener("click", login);
    }
);
 
