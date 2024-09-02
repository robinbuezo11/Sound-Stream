from flask import Blueprint, request, jsonify, current_app
from util.configPage import hash_password, guardarObjeto, check_password
from db import query, query_con_retorno
from pymysql.err import MySQLError
from io import BytesIO
import logging
import base64

BlueprintPlaylists =  Blueprint('playlists', __name__)
logger = logging.getLogger(__name__)

@BlueprintPlaylists.route('/', methods=['GET'])
def getPlaylists():
    try:
        playlists = query_con_retorno('SELECT * FROM PLAYLIST')
        playlists_with_canciones = []

        for playlist in playlists:
            canciones = query_con_retorno('SELECT * FROM CANCION WHERE ID IN (SELECT ID_CANCION FROM PLAYLIST_CANCION WHERE ID_PLAYLIST = %s)', (playlist['ID'],))
            canciones_formateadas = [{
                'id': cancion['ID'],
                'nombre': cancion['NOMBRE'],
                'cancion': cancion['CANCION'],
                'imagen': cancion['IMAGEN'],
                'duracion': cancion['DURACION'],
                'artista': cancion['ARTISTA']
            } for cancion in canciones]

            playlists_with_canciones.append({
                'id': playlist['ID'],
                'nombre': playlist['NOMBRE'],
                'descripcion': playlist['DESCRIPCION'],
                'portada': playlist['PORTADA'],
                'id_usuario': playlist['ID_USUARIO'],
                'canciones': canciones_formateadas
            })
        return jsonify(playlists_with_canciones), 200
    except MySQLError as e:
        logger.error(f"Error al obtener las playlists: {e}")
        return jsonify({'error': 'Error al obtener las playlists'}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Ocurrió un error inesperado'}), 500

@BlueprintPlaylists.route('/regsitrar', methods=['POST'])
def registrarPlaylist():
    try:
        data = request.json
        nombre = data.get('nombre')
        descripcion = data.get('descripcion')
        portada = data.get('portada')
        id_usuario = data.get('id_usuario')

        if not nombre or not portada or not id_usuario:
            return jsonify({'error': 'Faltan campos obligatorios'}), 400
        
        # Guardar la imagen en el servidor
        imagen_bytes = base64.b64decode(portada.split(',')[1])
        imagen_extension = 'png'
        nombre_imagen_obj = guardarObjeto(BytesIO(imagen_bytes), imagen_extension, "Fotos/")
        imagen_url = nombre_imagen_obj['Location']

        query('INSERT INTO PLAYLIST (NOMBRE, DESCRIPCION, PORTADA, ID_USUARIO) VALUES (%s, %s, %s, %s)', (nombre, descripcion, imagen_url, id_usuario))

        playlist = query_con_retorno('SELECT * FROM PLAYLIST WHERE NOMBRE = %s AND ID_USUARIO = %s', (nombre, id_usuario))[0]
        playlist_formateada = {
            'id': playlist['ID'],
            'nombre': playlist['NOMBRE'],
            'descripcion': playlist['DESCRIPCION'],
            'portada': playlist['PORTADA'],
            'id_usuario': playlist['ID_USUARIO']
        }
        return jsonify(playlist_formateada), 200
    except MySQLError as e:
        logger.error(f"Error al registrar la playlist: {e}")
        return jsonify({'error': 'Error al registrar la playlist'}), 500
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        return jsonify({'error': 'Ocurrió un error inesperado'}), 500

