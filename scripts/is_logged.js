var canContinueAsking=true;
const interval = setInterval(function() {
    if  (!sessionStorage.getItem("token_de_acesso") && canContinueAsking == true){
        canContinueAsking=false;
        swal("Oops!", "Você não está logado, ou talvez sua sessão tenha expirado !", "error")
        .then((value) => {
            canContinueAsking=true;
            window.location.href="/ProjetoNoticias/login.html";
        });
        
    }
  }, 5000);