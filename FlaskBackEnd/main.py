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
@app.route('/adicionar_noticia/<titulo>/<descricao>/<imagem>/<categoria>/<autor>/<data>')

def adicionar_noticia(titulo,descricao,imagem,categoria,autor,data):
    imagem = "static/Noticias/" + imagem
    try:
        DataBaseManipulation.Main().inserir_noticia(titulo,descricao,imagem,categoria,autor,data)
        _dict = {"Status": "Sucesso ao inserir notícia!"
        }
        response = make_response(jsonify(_dict), 200)
        return response
    except Exception as e:
        _dict = {"Status": f"Não foi possível inserir essa notícia devido ao erro: {e}!"
        }
        response = make_response(jsonify(_dict), 200)
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

@app.route('/noticia/<filtro>/<assunto>')
def noticia(filtro,assunto):
    print(type(filtro))
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
            print(i)
            data.append(i)
        response = make_response(jsonify(data))
        response.headers["Content-Type"] = "application/json"
        return response 
    else:
        data = []
        for i in DataBaseManipulation.Main().retornar_noticias('0','0'):
            print(i)
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


# def inserir_noticia(self,titulo,descricao,imagem,assunto,autor,data):
@app.route('/inserirNoticia/<titulo>/<descricao>/<imagem>/<assunto>/<autor>/<data>')
def inserir_noticia(inserirNoticias,titulo,descricao,imagem,assunto,autor,data):
    DataBaseManipulation.Main().inserir_noticia(titulo,descricao,imagem,assunto,autor,data);


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