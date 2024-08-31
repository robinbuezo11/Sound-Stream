from flask import Blueprint, request, jsonify, current_app
from util.configPage import hash_password, guardarObjeto, check_password
from db import query, query_con_retorno
from pymysql.err import MySQLError
from io import BytesIO
import logging
import base64

BlueprintLogin =  Blueprint('login', __name__)
logger = logging.getLogger(__name__)

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
        usuario = query_con_retorno("SELECT * FROM USUARIO WHERE correo = %s", (correo,))
        # Depuración: imprime el resultado de la consulta
        print("Resultado de la consulta:", usuario)
        if not usuario:
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
        # Verificación de la contraseña
        usuario = usuario[0]
        if not check_password(password, usuario['PASSWORD']):
            return jsonify({"error": "Correo o contraseña incorrectos"}), 401
        # Opcionalmente, eliminar la contraseña del resultado antes de devolver el usuario
        usuario.pop('PASSWORD', None)
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
        # Obtener datos del formulario y archivo
        data = request.json
        if 'foto' not in data or not data['foto']:
            return jsonify({"error": "Falta la imagen del perfil"}), 400
        nombres = data.get('nombre')
        apellidos = data.get('apellido')
        foto = data.get('foto')
        email = data.get('correo')
        password = data.get('password')
        fecha_nacimiento = data.get('fecha_nacimiento')
        # Validar que el correo no esté registrado
        correo = query_con_retorno("SELECT * FROM usuario WHERE correo = %s", (email,))
        if correo:
            return jsonify({"error": "El correo ya está registrado"}), 400
        # Cifrar la contraseña
        cifrar_password = hash_password(password)
        # Procesar la imagen
        if foto:
            # Decodificar la imagen
            foto_bytes = base64.b64decode(foto.split(',')[1])  # Decodifica la imagen
            extension = 'jpg'  # Puedes mejorar esto determinando la extensión correcta a partir del base64 si es necesario
            nombre_imagen = guardarObjeto(BytesIO(foto_bytes), extension, "Fotos/")
            path_foto = nombre_imagen['Location']
        else:
            path_foto = None
        # Insertar el usuario
        query("INSERT INTO usuario (NOMBRE, APELLIDO, FOTO, CORREO, PASSWORD, FECHA_NACIMIENTO) VALUES (%s, %s, %s, %s, %s, %s)",
              (nombres, apellidos, path_foto, email, cifrar_password, fecha_nacimiento))
        return jsonify({"message": "Usuario registrado"}), 201
    except MySQLError as e:
        print(f"Error al registrar el usuario: {e}")
        return jsonify({"error": "Error al registrar el usuario"}), 500
    except Exception as e:
        print(f"Error inesperado: {e}")
        return jsonify({"error": "Error inesperado"}), 500
    

## -- USUARIO -- ##
@BlueprintLogin.route('/', methods=['GET'])
def obtener_usuarios():
    try:
        users = query_con_retorno("SELECT * FROM USUARIO")
        users_list = [dict(zip(['id', 'name', 'email', 'age'], user)) for user in users]
        return jsonify(users_list), 200
    except MySQLError as e:
        current_app.logger.error(f"Error fetching users: {e}")
        return jsonify({"error": "Failed to fetch users"}), 500
    except Exception as e:
        current_app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error occurred"}), 500

@BlueprintLogin.route('/perfil/<int:id>', methods=['GET'])
def verPerfil(id):
    try:
        usuario = query_con_retorno("SELECT nombres, apellidos, correo, fecha_nac, path_foto FROM USUARIO WHERE id = %s", (id,))
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404
        
        usuario = usuario[0]
        datos_usuario = {
            'nombres': usuario[0],
            'apellidos': usuario[1],
            'correo': usuario[2],
            'fecha_nac': usuario[3],
            'foto': usuario[4]
        }
        return jsonify(datos_usuario), 200
    except MySQLError as e:
        logger.error(f"Error fetching user profile: {e}")
        return jsonify({"error": "Error al obtener el perfil del usuario"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500

    
@BlueprintLogin.route('/perfil/modificar/<int:id>', methods=['PUT'])
def modificarPerfil(id):
    try:
        data = request.form
        foto = request.files.get('foto')
        nombres = data.get('nombres')
        apellidos = data.get('apellidos')
        correo = data.get('correo')
        fecha_nacimiento = data.get('fecha_nacimiento')
        password_actual = data.get('password_actual')
        nueva_password = data.get('nueva_password')

        # Validar que la contraseña actual sea correcta
        usuario = query_con_retorno("SELECT password FROM USUARIO WHERE id = %s", (id,))
        if not usuario or not check_password(password_actual, usuario[0][0]):
            return jsonify({"error": "Contraseña actual incorrecta"}), 400
        # Procesar la nueva imagen si se sube una
        if foto:
            extension = foto.filename.split('.')[-1]
            data_foto = foto.read()
            nombre_imagen = guardarObjeto(BytesIO(data_foto), extension, "Fotos/")
            path_foto = nombre_imagen['Location']
        else:
            path_foto = None
        # Si hay una nueva contraseña, cifrarla
        if nueva_password:
            cifrado_password = hash_password(nueva_password)
            query("UPDATE USUARIO SET NOMBRE = %s, APELLIDO = %s, CORREO = %s, FECHA_NACIMIENTO = %s, PASSWORD = %s, PATH_FOTO = COALESCE(%s, PATH_FOTO) WHERE ID = %s",
                  (nombres, apellidos, correo, fecha_nacimiento, cifrado_password, path_foto, id))
        else:
            query("UPDATE USUARIO SET NOMBRE = %s, APELLIDO = %s, CORREO = %s, FECHA_NACIMIENTO = %s, PATH_FOTO = COALESCE(%s, PATH_FOTO) WHERE ID = %s",
                  (nombres, apellidos, correo, fecha_nacimiento, path_foto, id))
        return jsonify({"message": "Perfil actualizado exitosamente"}), 200
    except MySQLError as e:
        logger.error(f"Error updating profile: {e}")
        return jsonify({"error": "Error al actualizar el perfil"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500


