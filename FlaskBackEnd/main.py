from flask import Flask, request, jsonify, make_response
from flask.helpers import send_file

import DataBaseManipulation

from flask_cors import CORS
app = Flask(__name__,static_url_path='/static')


@app.errorhandler(404)
def not_found(e):
    response = make_response(
                jsonify(
                    {"message": str("Não é possível encontar essa página.")}
                ),
                200
            )
    response.headers["Content-Type"] = "application/json"
    return response

@app.route('/upload', methods = ['POST', 'GET'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        f.save("static/Noticias/"+f.filename)
        return ""
    else:
        return ""

    # //TITULO
    # //DESCRICAO
    # //IMAGEM
    # //CATEGORIA
    # //AUTOR
    # //DATA
@app.route('/adicionar_noticia/<titulo>/<descricao>/<imagem>/<categoria>/<autor>/<data>/<token>')

def adicionar_noticia(titulo,descricao,imagem,categoria,autor,data,token):
    _idUsuario = DataBaseManipulation.Main().buscar_usuario_por_token(token)
    if(DataBaseManipulation.Main().IsUsuarioAdmin(_idUsuario)):
        pass
    else:
        response = make_response(jsonify( {"Message": "Você não é um administrador para poder adicionar notícias."} ), 200)
        return response


    
    imagem = "static/Noticias/" + imagem
    try:
        DataBaseManipulation.Main().inserir_noticia(titulo,descricao,imagem,categoria,autor,data)
        _dict = {"Message": "Sucesso ao inserir notícia!"}
        response = make_response(jsonify(_dict), 200)
        return response
    except Exception as e:
        _dict = {"Message": f"Não foi possível inserir essa notícia devido ao erro: {e}!"
        }
        response = make_response(jsonify(_dict), 200)
        return response


@app.route ('/curtir_noticia/<token>/<id_noticia>')
def curtir_noticia(token,id_noticia):
    id_usuario = DataBaseManipulation.Main().buscar_usuario_por_token(token)
    result = DataBaseManipulation.Main().curtir_noticia(id_usuario,id_noticia)
    if(result == "Este usuário já curtiu essa notícia."):
        _answer = {"Message": f"Você já curtiu essa notícia!"}
        response = make_response(jsonify(_answer), 200)
        return response
    elif(result == "Ok"):
        _answer = {"Message": f"Curtida inserida com sucesso!"}
        response = make_response(jsonify(_answer), 200)
        return response
    else:
        _answer = {"Message": f"Um erro inesperado ocorreu.!"}
        response = make_response(jsonify(_answer), 200)
        return response


@app.route('/cookietest')
def cookie_test():
    response = make_response(
        jsonify({"message": str(request.remote_addr)})
    ,200)
    #response.set_cookie();
    #request.cookies.get();
    return response

@app.route('/signup/<name>/<mail>/<password>')
#NÃO DEVE SER USADO EM PRODUÇÃO, NÃO É SEGURO
def signup(name,mail, password):
    print(name,mail,password)
    try:
        DataBaseManipulation.Main().inserir_usuario(name,mail,password)
        response = make_response(
                jsonify(
                    {"message": str(f"Usuário {name} cadastrado com sucesso.")}
                ),
                200,
            )
    except Exception as e:
        response = make_response(
                jsonify(
                    {"message": str(f"É impossível cadastrar esse usuário."),
                    "exception": str(e)
                    }
                ),
                200,
            )


    
    response.headers["Content-Type"] = "application/json"
    return response

@app.route('/noticias_favoritas/<token>')
def noticias_favoritas(token):
    id_usuario= DataBaseManipulation.Main().buscar_usuario_por_token(token)
    data = []
    # SELECT titulo FROM noticia INNER JOIN relacao_curtidas ON relacao_curtidas.id_noticia = noticia.id WHERE relacao_curtidas.id_usuario = '3'"
    for i in DataBaseManipulation.Main().NoWhere_recuperar_informacoes("*",f"INNER JOIN relacao_curtidas ON relacao_curtidas.id_noticia = noticia.id WHERE relacao_curtidas.id_usuario = '{id_usuario}'","noticia"):
        data.append(i)
    response = make_response(jsonify(data))
    response.headers["Content-Type"] = "application/json"
    return response 

@app.route('/noticia/<filtro>/<assunto>')
def noticia(filtro,assunto):
    if((filtro != '0') and (assunto !='0')): # Filtro deve ser aplicado..
        data = []
        for i in DataBaseManipulation.Main().retornar_noticias(filtro,assunto):
            print(i)
            data.append(i)
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json"
        return response 
    elif(filtro != '0' and (assunto == '0')):
        data = []
        for i in DataBaseManipulation.Main().retornar_noticias(filtro,'0'):
            print(i)
            data.append(i)
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json"
        return response 
    elif(filtro == '0' and (assunto !='0')):
        data = []
        for i in DataBaseManipulation.Main().retornar_noticias('0',assunto):
            data.append(i)
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json"
        return response 
    else:
        data = []
        for i in DataBaseManipulation.Main().retornar_noticias('0','0'):
            data.append(i)
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json"
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add("Access-Control-Allow-Credentials","true")
        response.headers.add("Access-Control-Allow-Headers","Content-Type, Authorization, Accept-Language, X-Requested-With")
        return response 

@app.route('/logar/<email>/<senha>')
def logar(email,senha):
    if((DataBaseManipulation.Main().logar(email,senha)) == True):
        _token = DataBaseManipulation.Main().get_user_token(email,senha)
        print(_token)
        response = make_response(
                jsonify(
                    {
                        "message": str(f"Você logou como o usuário {email}"),
                        "token_de_acesso": str(_token)
                    }
                ),
                200,
            )
    else:
        response = make_response(
                jsonify(
                    {"message": str(f"Credenciais inválidas")}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Credentials","true")
    response.headers.add("Access-Control-Allow-Headers","Content-Type, Authorization, Accept-Language, X-Requested-With")
    
    
    
    


    
    #response.headers["Content-Type"] = "application/json"
    return response



@app.route('/')
def mainRoute():
    response = make_response(
                jsonify(
                    {"message": str("Bem vindo ao EndPoint")}
                ),
                200,
            )
    response.headers["Content-Type"] = "application/json"
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add("Access-Control-Allow-Credentials","true")
    response.headers.add("Access-Control-Allow-Headers","Content-Type, Authorization, Accept-Language, X-Requested-With")
    return response

app.config['JSON_AS_ASCII'] = False
app.config['JSON_AS_UTF8'] = True

CORS(app, resources={r"/*": {"origins": "*"}})
app.run(debug=True, host="192.168.15.60")
# app.run(debug=True)