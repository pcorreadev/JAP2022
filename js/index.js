document.addEventListener("DOMContentLoaded", function(){
    let usuario = localStorage.getItem('user');

    if (usuario === null){
        window.location = "login.html"
    } else {
    document.getElementById('user').innerHTML = usuario ;
    }; 

    document.getElementById("autos").addEventListener("click", function() {
        let category = localStorage.getItem('id')
        localStorage.setItem("catID", category)
        window.location = "products.html"
    });

    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    })
})
