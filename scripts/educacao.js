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




var newNoticia = new noticia("Educação", "Jovem impedida tem reviravolta!", "jose bezerra", "https://media.gazetadopovo.com.br/2021/05/05152446/Elisa-Flemer-380x214.jpeg", "Jovem impedida de se matricular na USP vai para o Vale do Silício");
var newNoticia2 = new noticia("Educação", "Vacina para professores em SP: Sindicatos comemoram, mas com ressalva", "Ana Paula Bimbati", "https://conteudo.imguol.com.br/c/noticias/ad/2021/02/05/sala-de-aula-educacao-sao-paulo-1612556305751_v2_450x600.jpg", "Os sindicatos que representam professores em São Paulo comemoraram o anúncio da ampliação da vacina contra covid-19 para os profissionais da Educação, com idade entre 18 a 46 anos, a partir do dia 21 de julho. A informação foi dada hoje pelo governador João Doria (PSDB), que afirmou que a retomada da imunização da categoria permitirá 'retomar as aulas do segundo semestre com total segurança'.");
var newNoticia3 = new noticia("Educação", "Justiça suspende instalação da 1ª escola cívico-militar do estado em Sorocaba", "José Maria Tomazela", "https://conteudo.imguol.com.br/c/noticias/17/2018/08/26/alunos-de-colegios-militares-custam-em-media-tres-vezes-mais-que-os-de-escolas-publicas-1535284656681_v2_900x506.jpg", "Um dia depois da instalação oficial, a Justiça suspendeu nesta terça-feira, 18, a instalação da que seria a primeira escola cívico-militar do Estado, em Sorocaba, interior de São Paulo. A unidade funcionaria com 423 alunos do ensino fundamental 2 na Escola Municipal Matheus Maylasky, que tem um total de 875 estudantes. A juíza Erna Thecla Maria Hakvood apontou na decisão que a prefeitura não esperou a conclusão das análises pedidas pelo Conselho Municipal de Educação sobre o cumprimento das normas do Programa Nacional de Escolas Cívico-Militares (Pecim)");
var newNoticia4 = new noticia("Educação", "IFMG: inscrições abertas para Vestibular 2021/2 via Enem", "Giullya Franco", "https://s4.static.brasilescola.uol.com.br/enem/conteudo/images/ifmg.jpg", "O Instituto Federal de Minas Gerais (IFMG) abriu nesta semana as inscrições para o Vestibular 2021/2. O período vai até o dia 21 de junho e a taxa é de R$ 25.");
var newNoticia5 = new noticia("Educação", "Fatecs (SP) liberam resultados da isenção e redução de taxa do Vestibular 2021/2", "Giullya Franco", "https://s3.static.brasilescola.uol.com.br/vestibular/conteudo/images/fatec.jpg", "As Faculdades de Tecnologia do Estado de São Paulo (Fatecs) divulgaram nesta terça-feira, 18 de maio, o resultado dos pedidos de isenção e redução da taxa do Vestibular 2021/2.");
var newNoticia6 = new noticia("Educação", "Inscrições do Vestibular de Inverno 2021 da PUCRS estão abertas", "Lorraine Vilela Campos", "https://s3.static.brasilescola.uol.com.br/vestibular/conteudo/images/pucrs.jpg", "As inscrições do Vestibular de Inverno 2021 da Pontíficia Universidade Católica do Rio Grande do Sul (PUCRS) estão abertas. Os interessados podem se inscrever até 7 de junho e a taxa é de R$ 60.");

// PARA ADICIONAR NOTICIA NOVA -> var newNoticia2 = new noticia("saude", "Estudiosos descobriram que a laranja ajuda na queda de cabelo", "jose bezerra", "https://revolucao.etc.br/wp-content/uploads/2019/12/Sa%C3%BAde.png", "Laranja contem vitamina c que auxilia no fortalecimento do cabelo, fazendo com que diminua as quedas. :)");
// adicionar_noticia(newNoticia2,"noticias");

adicionar_noticia(newNoticia,"noticias");
adicionar_noticia(newNoticia2,"noticias");
adicionar_noticia(newNoticia3,"noticias");
adicionar_noticia(newNoticia4,"noticias");
adicionar_noticia(newNoticia5,"noticias");
adicionar_noticia(newNoticia6,"noticias");

//console.log(newNoticia.categoria, newNoticia.titulo, newNoticia.autor, newNoticia.image, newNoticia.text);




