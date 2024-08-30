from flask import Blueprint, request, jsonify, current_app
from util.configPage import hash_password, guardarObjeto, check_password
from db import query, query_con_retorno
from pymysql.err import MySQLError
from io import BytesIO
import logging

BlueprintCancion =  Blueprint('cancion', __name__)
logger = logging.getLogger(__name__)

@BlueprintCancion.route('/crear', methods=['POST'])
def crearCancion():
    try:
        # Obtener los datos del formulario
        nombre = request.form['nombre']
        duracion = request.form['duracion']
        artista = request.form['artista']
        fotografia = request.files['fotografia']
        archivo_mp3 = request.files['archivo_mp3']

        if not nombre or not duracion or not artista or not fotografia or not archivo_mp3:
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Guardar fotografía
        extension_foto = fotografia.filename.split('.')[-1]
        data_foto = fotografia.read()
        nombre_imagen = guardarObjeto(BytesIO(data_foto), extension_foto, "Fotografias/")
        path_foto = nombre_imagen['Location']

        # Guardar archivo mp3
        extension_mp3 = archivo_mp3.filename.split('.')[-1]
        if extension_mp3.lower() != 'mp3':
            return jsonify({"error": "El archivo debe ser de tipo .mp3"}), 400
        data_mp3 = archivo_mp3.read()
        nombre_archivo = guardarObjeto(BytesIO(data_mp3), extension_mp3, "Canciones/")
        path_mp3 = nombre_archivo['Location']

        # Insertar datos en la base de datos
        query("INSERT INTO CANCION (nombre, duracion, artista, path_foto, path_mp3) VALUES (%s, %s, %s, %s, %s)",
              (nombre, duracion, artista, path_foto, path_mp3))

        return jsonify({"message": "Canción creada exitosamente"}), 201

    except MySQLError as e:
        logger.error(f"Error al crear la canción: {e}")
        return jsonify({"error": "Error al crear la canción"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500