const webApi = "http://179.111.62.251:5000/"
const url = "http://179.111.62.251:5500/ProjetoNoticias";

const emailField = document.getElementById("email");
const passField = document.getElementById("password");



const logar = async () => {
    // /logar/<email>/<senha> FUNÇÃO LOGAR
    const response = await fetch((webApi + "logar/" + emailField.value + "/" + passField.value), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json(); //extract JSON from the http response
    console.log(data);
    // console.log(data["token"]);

    if((typeof data["token_de_acesso"]) === 'undefined'){
    // do something with myJson
        alert("Não foi possível logar.")
    }else{
        sessionStorage.setItem("token_de_acesso", data["token_de_acesso"]);
        window.location.href=url + "/";
    }
}