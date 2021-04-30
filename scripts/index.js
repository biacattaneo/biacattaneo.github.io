var tagNoticias = document.getElementById("noticias");

function noticia (categoria, titulo, autor, image, text){
    this.categoria = categoria
    this.titulo = titulo
    this.autor = autor
    this.image = image
    this.text = text
}

var newNoticia = new noticia("saude", "cientistas descobriram que a laranja ajuda na queda de cabelo", "jose bezerra", "https://revolucao.etc.br/wp-content/uploads/2019/12/Sa%C3%BAde.png", "Laranja contem vitamina c que auxilia no fortalecimento do cabelo, fazendo com que diminua as quedas. :)");

console.log(newNoticia.categoria, newNoticia.titulo, newNoticia.autor, newNoticia.image, newNoticia.text);

var titulo = document.createElement("h2");
titulo.innerHTML = newNoticia.titulo;
titulo.id = "titulo";
tagNoticias.appendChild(titulo);

var image = document.createElement("img");
image.src = newNoticia.image;
tagNoticias.appendChild(image);



