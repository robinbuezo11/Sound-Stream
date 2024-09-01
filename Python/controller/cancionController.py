from flask import Blueprint, request, jsonify, current_app
from util.configPage import hash_password, guardarObjeto, check_password
from db import query, query_con_retorno
from pymysql.err import MySQLError
from io import BytesIO
import logging

BlueprintCancion =  Blueprint('cancion', __name__)
logger = logging.getLogger(__name__)


@BlueprintCancion.route('/', methods=['GET'])
def listarCanciones():
    try:
        canciones = query_con_retorno("SELECT * FROM CANCION")
        canciones_data = {
            "id": canciones['ID'],
            "nombre": canciones['NOMBRE'],
            "cancion": canciones['CANCION'],
            "imagen": canciones['IMAGEN'],
            "duracion": canciones['DURACION'],
            "artista": canciones['ARTISTA']
        }
        return jsonify(canciones_data), 200
    except MySQLError as e:
        logger.error(f"Error al listar las canciones: {e}")
        return jsonify({"error": "Error al listar las canciones"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500


@BlueprintCancion.route('/registrar', methods=['POST'])
def crearCancion():
    try:
        # Obtener los datos del formulario
        nombre = request.form['nombre']
        cancion = request.form['cancion']
        imagen = request.form['imagen']
        duracion = request.files['duracion']
        artista = request.files['artista']

        if not nombre or not duracion or not cancion or not imagen or not artista:
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Guardar fotografía
        extension_foto = imagen.filename.split('.')[-1]
        data_foto = imagen.read()
        nombre_imagen = guardarObjeto(BytesIO(data_foto), extension_foto, "Fotos/")
        path_foto = nombre_imagen['Location']

        # Guardar archivo mp3
        extension_mp3 = cancion.filename.split('.')[-1]
        if extension_mp3.lower() != 'mp3':
            return jsonify({"error": "El archivo debe ser de tipo .mp3"}), 400
        data_mp3 = cancion.read()
        nombre_archivo = guardarObjeto(BytesIO(data_mp3), extension_mp3, "Canciones/")
        path_mp3 = nombre_archivo['Location']

        # Insertar datos en la base de datos
        query("INSERT INTO CANCION (nombre, duracion, artista, path_foto, path_mp3) VALUES (%s, %s, %s, %s, %s)",
              (nombre, duracion, artista, path_foto, path_mp3))

        # Obtener los datos de la canción
        canciones = query_con_retorno("SELECT * FROM CANCION WHERE nombre = %s", (nombre,))
        canciones_data = {
            "id": canciones['ID'],
            "nombre": canciones['NOMBRE'],
            "cancion": canciones['CANCION'],
            "imagen": canciones['IMAGEN'],
            "duracion": canciones['DURACION'],
            "artista": canciones['ARTISTA']
        }
        return jsonify(canciones_data), 201
    except MySQLError as e:
        logger.error(f"Error al crear la canción: {e}")
        return jsonify({"error": "Error al crear la canción"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500
    

@BlueprintCancion.route('/actualizar', methods=['PUT'])
def actualizarCancion():
    try:
        # Obtener los datos del formulario
        id_cancion = request.form['id']
        nombre = request.form['nombre']
        cancion = request.form['cancion']
        imagen = request.form['imagen']
        duracion = request.files['duracion']
        artista = request.files['artista']

        if not id_cancion or not nombre or not duracion or not cancion or not imagen or not artista:
            return jsonify({"error": "Todos los campos son obligatorios"}), 400

        # Guardar fotografía
        extension_foto = imagen.filename.split('.')[-1]
        data_foto = imagen.read()
        nombre_imagen = guardarObjeto(BytesIO(data_foto), extension_foto, "Fotos/")
        path_foto = nombre_imagen['Location']

        # Guardar archivo mp3
        extension_mp3 = cancion.filename.split('.')[-1]
        if extension_mp3.lower() != 'mp3':
            return jsonify({"error": "El archivo debe ser de tipo .mp3"}), 400
        data_mp3 = cancion.read()
        nombre_archivo = guardarObjeto(BytesIO(data_mp3), extension_mp3, "Canciones/")
        path_mp3 = nombre_archivo['Location']

        # Actualizar datos en la base de datos
        query("UPDATE CANCION SET nombre = %s, duracion = %s, artista = %s, path_foto = %s, path_mp3 = %s WHERE id = %s",
              (nombre, duracion, artista, path_foto, path_mp3, id_cancion))

        # Obtener los datos de la canción
        canciones = query_con_retorno("SELECT * FROM CANCION WHERE id = %s", (id_cancion,))
        canciones_data = {
            "id": canciones['ID'],
            "nombre": canciones['NOMBRE'],
            "cancion": canciones['CANCION'],
            "imagen": canciones['IMAGEN'],
            "duracion": canciones['DURACION'],
            "artista": canciones['ARTISTA']
        }
        return jsonify(canciones_data), 200
    except MySQLError as e:
        logger.error(f"Error al actualizar la canción: {e}")
        return jsonify({"error": "Error al actualizar la canción"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500


@BlueprintCancion.route('/eliminar', methods=['DELETE'])
def eliminarCancion():
    try:
        id_cancion = request.form['id']

        if not id_cancion:
            return jsonify({"error": "El campo id es obligatorio"}), 400
        # Eliminar datos en la base de datos
        query("DELETE FROM CANCION WHERE id = %s", (id_cancion,))
        return jsonify({id_cancion}), 200
    except MySQLError as e:
        logger.error(f"Error al eliminar la canción: {e}")
        return jsonify({"error": "Error al eliminar la canción"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500

@BlueprintCancion.route('/favoritas', methods=['GET'])
def listarCancionesFavoritas():
    try:
        canciones = query_con_retorno("SELECT * FROM CANCION WHERE favorita = 1")
        canciones_data = {
            "id": canciones['ID'],
            "nombre": canciones['NOMBRE'],
            "cancion": canciones['CANCION'],
            "imagen": canciones['IMAGEN'],
            "duracion": canciones['DURACION'],
            "artista": canciones['ARTISTA']
        }
        return jsonify(canciones_data), 200
    except MySQLError as e:
        logger.error(f"Error al listar las canciones favoritas: {e}")
        return jsonify({"error": "Error al listar las canciones favoritas"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500
    
@BlueprintCancion.route('/favorita', methods=['PUT'])
def marcarCancionFavorita():
    try:
        id_cancion = request.form['id']
        if not id_cancion:
            return jsonify({"error": "El campo id es obligatorio"}), 400
        query("UPDATE CANCION SET favorita = 1 WHERE id = %s", (id_cancion,))
        return jsonify({id_cancion}), 200
    except MySQLError as e:
        logger.error(f"Error al marcar la canción como favorita: {e}")
        return jsonify({"error": "Error al marcar la canción como favorita"}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Ocurrió un error inesperado"}), 500