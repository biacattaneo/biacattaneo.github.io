const webApi = "http://webnoticiasapi.ddns.net:5000/"
var searchBtn = document.getElementById("search-btn");
var noticiasDiv = document.getElementById("noticias");
var noticiasInput = document.getElementById("search-txt")


searchBtn.addEventListener("click", ()=>{
  while(document.getElementById("noticias").firstChild){
    noticiasDiv.removeChild(noticiasDiv.firstChild);
  }
  if(noticiasInput.value == ""){
    chamar_noticias("0","Educação");
  }else{
    chamar_noticias(noticiasInput.value,"Educação")
  }
});


function noticia (id, categoria, titulo, autor, image, text, data){
    this.id = id;
    this.categoria = categoria
    this.titulo = titulo
    this.autor = autor
    this.image = image
    this.text = text
    this.data = data
}


function adicionar_noticia(noticia, onde){
    var tagOnde = document.getElementById(onde);
    
    var divHeader = document.createElement("div");
    divHeader.className="card bg-light m-3 shadow-lg rounded";
        
    var divTitulo = document.createElement("div"); 
    divTitulo.className="mt-3 ml-3 row d-flex justify-content-between";
    

    var h4DivTitulo = document.createElement("h4");
    h4DivTitulo.innerText=noticia.titulo;
    
    var LabelDivHeader = document.createElement("label");
    LabelDivHeader.className="mr-5";
    LabelDivHeader.innerHTML="<i><b>" + noticia.autor + "</i></b>"  + "<br>" + "<small>" + noticia.data + "</small>";


    divTitulo.appendChild(h4DivTitulo);
    divHeader.appendChild(divTitulo);
    divTitulo.appendChild(LabelDivHeader);
    
    var divConteudo = document.createElement("div");
    divConteudo.className="row";

    var divImagemConteudo = document.createElement("div");
    divImagemConteudo.className="col-lg-3";

    var imagemDivImagemConteudo = document.createElement("img");
    imagemDivImagemConteudo.className="img-fluid ml-2 mt-2 mb-2";
    imagemDivImagemConteudo.style="width: 386px; height: 269px";
    imagemDivImagemConteudo.src=noticia.image; // NOTICIA.IMAGE

    

    var imgLikeButton = document.createElement("img");
    imgLikeButton.id=noticia.id;
    imgLikeButton.className="likeButton";
    imgLikeButton.src="https://www.shareicon.net/data/128x128/2017/06/05/886714_like_512x512.png";
    imgLikeButton.style="width: 50px"
    imgLikeButton.addEventListener("click", ()=>{
      curtir_noticia(sessionStorage.getItem("token_de_acesso"),imgLikeButton.id);
    })

    divImagemConteudo.appendChild(imagemDivImagemConteudo);
    divImagemConteudo.appendChild(imgLikeButton);

    var divTextoNoticia = document.createElement("div");
    divTextoNoticia.className="col-lg-9 mt-2";
    divTextoNoticia.style="font-size: 30px;";
    divTextoNoticia.innerText=noticia.text;

    divConteudo.appendChild(divImagemConteudo);
    divConteudo.appendChild(divTextoNoticia);
    divHeader.appendChild(divConteudo);
    tagOnde.appendChild(divHeader);
}

const curtir_noticia = async (token,id_noticia) => {
  // /logar/<email>/<senha> FUNÇÃO LOGAR
  const response = await fetch((webApi + "curtir_noticia/" + token + "/" + id_noticia), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  
  const data = await response.json(); //extract JSON from the http response
  if(data["Message"] == "Você já curtiu essa notícia!"){
    swal("Oops!", "Você já curtiu essa notícia!", "error");
  }else{
    swal("Eba!", "Notícia curtida com sucesso!", "success");
  }

  // console.log(data);
}



const chamar_noticias = async (filtro,categoria) => {
    // /logar/<email>/<senha> FUNÇÃO LOGAR
    const response = await fetch((webApi + "noticia/" + filtro + "/" + categoria), {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    
    const data = await response.json(); //extract JSON from the http response
    var noticias = [];
    data.map((i)=>{
      imagem = i[3];
      imagem = webApi + i[3]; // adicionando o diretório corretamente ao qual se encontra a imagem
      _noticia = new noticia(i[0],i[4],i[1],i[5],imagem,i[2], i[6]);
      noticias.push(_noticia);
      adicionar_noticia(_noticia,"noticias");
    });
}
chamar_noticias("0","Educação")



// PARA ADICIONAR NOTICIA NOVA -> var newNoticia2 = new noticia("saude", "Estudiosos descobriram que a laranja ajuda na queda de cabelo", "jose bezerra", "https://revolucao.etc.br/wp-content/uploads/2019/12/Sa%C3%BAde.png", "Laranja contem vitamina c que auxilia no fortalecimento do cabelo, fazendo com que diminua as quedas. :)");
// adicionar_noticia(newNoticia2,"noticias");
//console.log(newNoticia.categoria, newNoticia.titulo, newNoticia.autor, newNoticia.image, newNoticia.text);




