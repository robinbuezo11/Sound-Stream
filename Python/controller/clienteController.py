import datetime
from io import BytesIO
import db as db
from flask import Blueprint, request, jsonify, current_app
from util.configdb import dbConfig
from pymysql.err import MySQLError

BlueprintCliente = Blueprint('cliente', __name__)

@BlueprintCliente.route('/usuarios', methods=['GET'])
def obtener_usuarios():
    try:
        users = db.query_con_retorno("SELECT * FROM users")
        users_list = [dict(zip(['id', 'name', 'email', 'age'], user)) for user in users]
        return jsonify(users_list), 200
    except MySQLError as e:
        current_app.logger.error(f"Error fetching users: {e}")
        return jsonify({"error": "Failed to fetch users"}), 500
    except Exception as e:
        current_app.logger.error(f"Unexpected error: {e}")
        return jsonify({"error": "Unexpected error occurred"}), 500
