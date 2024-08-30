import bcrypt
import uuid
import boto3
from util.configdb import s3Config

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

s3 = boto3.client(
    's3',
    aws_access_key_id=s3Config['id'],
    aws_secret_access_key=s3Config['key'],
)

def guardarObjeto(contenido, extension, tipoObjeto):
    #Generar un nombre unico para el archivo
    key = f"{tipoObjeto}{uuid.uuid4()}.{extension}"
    print(s3Config['name'])

    #Subir el archivo
    s3.upload_fileobj(contenido, s3Config['name'], key, ExtraArgs={'ACL': 'public-read'})
    try:
        return {
            'Key': key,
            'Location': f"https://{s3Config['name']}.s3.amazonaws.com/{key}"
        }
    except Exception as e:
        print(e)
        return {
            'Key': key,
            'Location': f"https://{s3Config['name']}.s3.amazonaws.com/{key}"
        }

def eliminarObjeto(key):
    try:
        s3.delete_object(Bucket=s3Config['name'], Key=key)
        return True
    except Exception as e:
        print(e)
        return False

def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password, hashed):
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

