const webApi = "https://akiraflash.herokuapp.com/"


const btn_Enviar = $('#enviar');
const btn_EnviarImagem = $('#enviar_imagem');
const input_Title = $('#title');
const input_Autor = $('#autor');
const input_Imagem = $('#imagem');
const input_Categoria = $('#categoria');
const input_Descriçao = $('#descriçao');
const lbl_tituloInvalido = $('#lbl_tituloInvalido');
const lbl_autorInvalido = $('#lbl_autorInvalido');
const lbl_descriçaoInvalida = $('#lbl_descriçaoInvalida');
const input_Data = $('#date');

// Desabilitando mensagens de erro que não devem aparecer no início.
lbl_tituloInvalido.hide();
lbl_autorInvalido.hide();
lbl_descriçaoInvalida.hide();


var isTitleValidated = true;
var isAutorValidated = true;
var isDescriçaoValidated = true;

var fileName;


input_Title.change(()=>{
    var str = new String(input_Title.val());
    if(str.length > 50){
        lbl_tituloInvalido.show();
        isTitleValidated=false;
    }else{
        lbl_tituloInvalido.hide();
        isTitleValidated=true;
    }
} );

input_Autor.change(()=>{
    var str = new String(input_Autor.val());
    if(str.length > 100){
        lbl_autorInvalido.show();
        isAutorValidated=false;
    }else{
        lbl_autorInvalido.hide();
        isAutorValidated=true;
    }
} );
input_Descriçao.change(()=>{
    var str = new String(input_Descriçao.val());
    if(str.length > 1000){
        lbl_descriçaoInvalida.show();
        isDescriçaoValidated=false;
    }else{
        lbl_descriçaoInvalida.hide();
        isDescriçaoValidated=true;
    }
} );

const enviarNoticia_req = async () => {
    // def inserir_noticia(self,titulo,descricao,imagem,assunto,autor,data):
    const AccessToken = sessionStorage.getItem("token_de_acesso");
    const response = await fetch((webApi + "adicionar_noticia/" + input_Title.val() + "/" + input_Descriçao.val() + "/" + fileName + "/" + input_Categoria.val() + "/" + input_Autor.val() + "/" + input_Data.val() + "/" + AccessToken), {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json(); //extract JSON from the http response
            if (data["Message"].includes('Você não é um administrador para poder adicionar notícias.')){
                swal("Acesso negado!", "Você não tem privilégio para adicionar notícias!", "error")
            }
            else{  
                swal("Sucesso!", "Sua notícia foi inserida com sucesso!", "success")
                .then((value)=>{
                    btn_EnviarImagem.click();
                    window.location.href="/ProjetoNoticias/index.html";
                });
            }
            // console.log(data);
            //window.location.href="/ProjetoNoticias/index.html";

        }
        
        
        
        
function enviar_noticia(){
    
    fileName = new String(input_Imagem[0].value);
    fileName = fileName.replace(/\\/g, '');
    fileName = fileName.replace("C:fakepath", ''); // agora o nome está pronto para ser utilizado.
    
    
    if( (input_Title.val() == "") || (input_Autor.val() == "") || (input_Imagem.val() == "") || (input_Categoria.val() == "") || (input_Data.val() == "") || (input_Descriçao.val() == "") ){
        swal("Oops!", "Você esqueceu de preencher algum campo", "error");
        return "Impossível continuar. Campos invalidos";
    }
    if ( (isDescriçaoValidated == false) || (isTitleValidated == false) || (isAutorValidated == false) ){
        swal("Campos inválidos!", "Algum dos seus campos ultrapassou o limite de caracteres..", "error");
        return "Impossível continuar. Campos invalidos";
    }
    // se chegar até aqui, é porque está válido.
    // btn_EnviarImagem.click();
    enviarNoticia_req();
     // enviar imagem pelo metodo post
    
}


btn_Enviar.click(()=>{
    enviar_noticia();
});