from flask import Flask
from flask_cors import CORS
import db as db
from controller.clienteController import BlueprintCliente
from controller.LoginController import BlueprintLogin

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hola():
    return "<h1>'Seminario de Sistemas 1 - Practica 1'</h1>"

app.register_blueprint(BlueprintLogin)
app.register_blueprint(BlueprintCliente)



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)