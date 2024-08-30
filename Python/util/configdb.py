from dotenv import load_dotenv
import os

#cargar las variables de entorno
load_dotenv()

# Configuración de la base de datos
dbConfig = {
    'host': os.environ.get('DB_HOST'),
    'user': os.environ.get('DB_USER'),
    'password': os.environ.get('DB_PASS'),
    'database': os.environ.get('DB_NAME'),
    'port': os.environ.get('DB_PORT')
}

# Configuración del servidor s3 de Amazon
s3Config = {
    'name': os.environ.get('NAME_BUCKET'),
    'id': os.environ.get('AWS_ACCESS_KEY_ID'),
    'key': os.environ.get('AWS_SECRET_ACCESS_KEY')
}