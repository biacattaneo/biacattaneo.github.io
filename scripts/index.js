

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
    imagemDivImagemConteudo.src=noticia.image;
    
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




var noticiaSaude = new noticia("Saude", "Estudiosos descobriram que a laranja ajuda na queda de cabelo", "jose bezerra", "https://puraqualidadedevida.files.wordpress.com/2014/04/laranja-beneficios-fruta.jpg", "Laranja contem vitamina c que auxilia no fortalecimento do cabelo, fazendo com que diminua as quedas. :)");
var noticiaEducacao = new noticia("Educação", "Jovem é impedida!", "jose bezerra", "https://media.gazetadopovo.com.br/2021/05/05152446/Elisa-Flemer-380x214.jpeg", "Jovem impedida de se matricular na USP vai para o Vale do Silício");
var noticiaPolitica = new noticia("Politica", "", "", "", "");
var noticiaSaude2 = new noticia("Saude", "", "", "", "");
var noticiaEducacao2 = new noticia("Educação", "Vacina para professores em SP: Sindicatos comemoram, mas com ressalva", "Ana Paula Bimbati", "https://conteudo.imguol.com.br/c/noticias/ad/2021/02/05/sala-de-aula-educacao-sao-paulo-1612556305751_v2_450x600.jpg", "Os sindicatos que representam professores em São Paulo comemoraram o anúncio da ampliação da vacina contra covid-19 para os profissionais da Educação, com idade entre 18 a 46 anos, a partir do dia 21 de julho. A informação foi dada hoje pelo governador João Doria (PSDB), que afirmou que a retomada da imunização da categoria permitirá 'retomar as aulas do segundo semestre com total segurança'.");
var noticiaPolitica2 = new noticia("Politica", "", "", "", "");
// PARA ADICIONAR NOTICIA NOVA -> var newNoticia2 = new noticia("saude", "Estudiosos descobriram que a laranja ajuda na queda de cabelo", "jose bezerra", "https://revolucao.etc.br/wp-content/uploads/2019/12/Sa%C3%BAde.png", "Laranja contem vitamina c que auxilia no fortalecimento do cabelo, fazendo com que diminua as quedas. :)");
// adicionar_noticia(newNoticia2,"noticias");

adicionar_noticia(noticiaSaude,"noticias");
adicionar_noticia(noticiaEducacao,"noticias");
adicionar_noticia(noticiaPolitica,"noticias");
adicionar_noticia(noticiaEducacao2,"noticias");
adicionar_noticia(noticiaSaude2,"noticias");
adicionar_noticia(noticiaPolitica2,"noticias");


//console.log(newNoticia.categoria, newNoticia.titulo, newNoticia.autor, newNoticia.image, newNoticia.text);




