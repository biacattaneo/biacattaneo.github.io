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

@app.route('/logar/<email>/<senha>')
def logar(email,senha):
    if( (DataBaseManipulation.Main().logar(email,senha)) == True):
        response = make_response(
                jsonify(
                    {"message": str(f"Você logou como o usuário {email}")}
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
    return response


@app.route('/')
def mainRoute():
    response = make_response(
                jsonify(
                    {"message": str("Bem vindo ao EndPoint")}
                ),
                400,
            )
    response.headers["Content-Type"] = "application/json"
    return response

app.config['JSON_AS_ASCII'] = False
app.config['JSON_AS_UTF8'] = True
CORS(app)
app.run(debug=False, host="192.168.15.60")
#app.run(debug=True)