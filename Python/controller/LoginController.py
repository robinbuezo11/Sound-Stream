from flask import Blueprint, request, jsonify
from util.configPage import hash_password, guardarObjeto, check_password
from db import query, query_con_retorno
from pymysql.err import MySQLError
from io import BytesIO

BlueprintLogin =  Blueprint('login', __name__)

@BlueprintLogin.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        correo = data.get('correo')
        password = data.get('password')
        # Validaciones
        if not correo or not password:
            return jsonify({"error": "Correo o contraseña vacíos"}), 400
        # Consulta del usuario por correo
        usuario = query_con_retorno("SELECT * FROM usuario WHERE correo = %s", (correo,))
        if not usuario:
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
        # Verificación de la contraseña
        usuario = usuario[0]
        if not check_password(password, usuario['password']):
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
        return jsonify({"message": "Login exitoso", "usuario": usuario}), 200
    except MySQLError as e:
        print(f"Error en la consulta de login: {e}")
        return jsonify({"error": "Error en el proceso de login"}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado"}), 500

@BlueprintLogin.route('/registrar', methods=['POST'])
def registrar():
    try:
        nombres = request.form['nombre']
        apellidos = request.form['apellido']
        foto = request.files['foto']
        email = request.form['correo']
        password = request.form['password']
        fecha_nacimiento = request.form['fecha_nacimiento']
        # Validaciones
        extension = foto.filename.split('.')[-1]
        if foto.filename != '':
            data = foto.read()
        correo = query_con_retorno("SELECT * FROM usuario WHERE correo = %s", (email,))
        if correo:
            return jsonify({"error": "El correo ya está registrado"}), 400
        cifrar_password = hash_password(password)
        nombre_imagen = guardarObjeto(BytesIO(data), extension, "Fotos/")
        id_foto = nombre_imagen['Key']
        path_foto = nombre_imagen['Location']
        query("INSERT INTO usuario (nombres, apellidos, foto, correo, password, fecha_nacimiento) VALUES (%s, %s, %s, %s, %s, %s)",
              (nombres, apellidos, path_foto, email, cifrar_password, fecha_nacimiento))
        return jsonify({"message": "Usuario registrado"}), 201
    except MySQLError as e:
        print(f"Error al registrar el usuario: {e}")
        return jsonify({"error": "Error al registrar el usuario"}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado"}), 500
    




