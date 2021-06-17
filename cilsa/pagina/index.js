function ir(){
    var c=1234;
    var u="marce";
    if(document.form.password.value==c && document.form.login.value==u){
        alert("Ingresaste");
        window.location="bank.html";
    }
    else{
        alert("Datos incorrectos (usuario:marce/password:1234)");
    }
}