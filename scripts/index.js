const webApi = "https://179.111.62.251:5000/"

function noticia (categoria, titulo, autor, image, text){
    this.categoria = categoria
    this.titulo = titulo
    this.autor = autor
    this.image = image
    this.text = text
}

function adicionar_noticia(noticia, onde){
    var tagOnde = document.getElementById(onde);
    
    var divHeader = document.createElement("div");
    divHeader.className="card bg-light m-3 shadow-lg rounded";
    //divHeader.style="background-color: rgb(79, 86, 219);"
    
    var divTitulo = document.createElement("div"); 
    divTitulo.className="mt-3 ml-3 row";
    

    var h4DivTitulo = document.createElement("h4");
    h4DivTitulo.innerText=noticia.titulo;
    divTitulo.appendChild(h4DivTitulo);
    divHeader.appendChild(divTitulo);
    
    var divConteudo = document.createElement("div");
    divConteudo.className="row";

    var divImagemConteudo = document.createElement("div");
    divImagemConteudo.className="col-lg-3";

    var imagemDivImagemConteudo = document.createElement("img");
    imagemDivImagemConteudo.className="img-fluid ml-2 mt-2 mb-2";
    imagemDivImagemConteudo.style="width: 386px; height: 269px";
    imagemDivImagemConteudo.src=noticia.image; // NOTICIA.IMAGE
    
    divImagemConteudo.appendChild(imagemDivImagemConteudo);

    var divTextoNoticia = document.createElement("div");
    divTextoNoticia.className="col-lg-9 mt-2";
    divTextoNoticia.style="font-size: 30px;";
    divTextoNoticia.innerText=noticia.text;

    divConteudo.appendChild(divImagemConteudo);
    divConteudo.appendChild(divTextoNoticia);
    divHeader.appendChild(divConteudo);
    tagOnde.appendChild(divHeader);
}

const chamar_noticias = async () => {
    // /logar/<email>/<senha> FUNÇÃO LOGAR
    const response = await fetch((webApi + "noticia/0/0"), {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json(); //extract JSON from the http response
    // console.log(data);
    //ID
    //TITULO
    //DESCRICAO
    //IMAGEM
    //CATEGORIA
    //AUTOR
    //DATA
    
    data.map((i)=>{
      _noticia = new noticia(i[4],i[1],i[5],i[3],i[2]);
      
      adicionar_noticia(_noticia,"noticias");
      adicionar_noticia(_noticia,"noticias");
      adicionar_noticia(_noticia,"noticias");
      adicionar_noticia(_noticia,"noticias");
    });
}
chamar_noticias();




// PARA ADICIONAR NOTICIA NOVA -> var newNoticia2 = new noticia("saude", "Estudiosos descobriram que a laranja ajuda na queda de cabelo", "jose bezerra", "https://revolucao.etc.br/wp-content/uploads/2019/12/Sa%C3%BAde.png", "Laranja contem vitamina c que auxilia no fortalecimento do cabelo, fazendo com que diminua as quedas. :)");
// adicionar_noticia(newNoticia2,"noticias");
//console.log(newNoticia.categoria, newNoticia.titulo, newNoticia.autor, newNoticia.image, newNoticia.text);




