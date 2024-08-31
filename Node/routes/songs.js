const express = require('express');
const router = express.Router();
const pool = require('../utils/db');
const aws = require('aws-sdk');

// Configurar AWS
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM CANCION');
        const canciones = rows.map(cancion => {
            return {
                id: cancion.ID,
                nombre: cancion.NOMBRE,
                cancion: cancion.CANCION,
                imagen: cancion.IMAGEN,
                duracion: cancion.DURACION,
                artista: cancion.ARTISTA
            };
        });
        res.json(canciones);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'Error en el servidor' });
    }
    console.log('GET /songs');
});

router.post('/registrar', async (req, res) => {
    try {
        const { nombre, cancion, imagen, duracion, artista } = req.body;
        // Validar los datos
        if (!nombre || !cancion || !imagen || !duracion || !artista) {
            return res.status(400).json({ error: 'Datos incompletos', message: 'Datos incompletos' });
        }
        // Subir la imagen y la cancion a AWS S3
        const cancionBuffer = Buffer.from(cancion.replace(/^data:audio\/\w+;base64,/, ''), 'base64');
        const imagenBuffer = Buffer.from(imagen.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        
        const paramsCancion = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `Canciones/${nombre}-${Date.now()}.mp3`,
            Body: cancionBuffer,
            ContentType: 'audio/mp3',
        };

        const dataCancion = await s3.upload(paramsCancion).promise();
        const cancionUrl = dataCancion.Location;
        
        const paramsImagen = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `Fotos/${nombre}-${Date.now()}.png`,
            Body: imagenBuffer,
            ContentType: 'image/png',
        };

        const dataImagen = await s3.upload(paramsImagen).promise();
        const imagenUrl = dataImagen.Location;

        // Insertar la cancion en la base de datos
        const query = "INSERT INTO CANCION (nombre, cancion, imagen, duracion, artista) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(query, [nombre, cancionUrl, imagenUrl, duracion, artista]);
        res.json({ id: result.insertId, nombre, cancion: cancionUrl, imagen: imagenUrl, duracion, artista });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor', message: error.message });
    }
    console.log('POST /canciones/registrar');
});

router.put('/actualizar', async (req, res) => {
    try {
        const { id, nombre, cancion, imagen, duracion, artista } = req.body;
        // Validar los datos
        if (!id || !nombre || !artista) {
            return res.status(400).json({ error: 'Datos incompletos', message: 'Datos incompletos' });
        }
        // Verificar que la cancion exista
        const [rows] = await pool.query('SELECT * FROM CANCION WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'La cancion no existe', message: 'La cancion no existe' });
        }

        // Eliminar la cancion anterior de AWS S3 y subir la nueva cancion si es necesario
        const oldCancion = decodeURIComponent(rows[0].CANCION);
        let nuevaCancion = oldCancion;
        let nuevaDuracion = rows[0].DURACION;
        if (cancion) {
            if (!duracion) {
                return res.status(400).json({ error: 'Datos incompletos', message: 'Datos incompletos' });
            }
            nuevaDuracion = duracion;

            const key = oldCancion.split('.com/')[1];
            await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: key }).promise();

            const cancionBuffer = Buffer.from(cancion.replace(/^data:audio\/\w+;base64,/, ''), 'base64');
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `Canciones/${nombre}-${Date.now()}.mp3`,
                Body: cancionBuffer,
                ContentType: 'audio/mp3',
            };

            const data = await s3.upload(params).promise();
            nuevaCancion = data.Location;
        }

        // Eliminar la foto anterior de AWS S3 y subir la nueva foto si es necesario
        const oldImagen = decodeURIComponent(rows[0].IMAGEN);
        let nuevaImagen = oldImagen;
        if (imagen) {
            const key = oldImagen.split('.com/')[1];
            await s3.deleteObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: key }).promise();

            const imagenBuffer = Buffer.from(imagen.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            
            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `Fotos/${nombre}-${Date.now()}.png`,
                Body: imagenBuffer,
                ContentType: 'image/jpeg'
            };

            const data = await s3.upload(params).promise();
            nuevaImagen = data.Location;
        }

        // Actualizar la cancion
        const query = "UPDATE CANCION SET nombre = ?, cancion = ?, imagen = ?, duracion = ?, artista = ? WHERE id = ?";
        await pool.query(query, [nombre, nuevaCancion, nuevaImagen, nuevaDuracion, artista, id]);
        res.json({ id, nombre, cancion: nuevaCancion, imagen: nuevaImagen, duracion: nuevaDuracion, artista });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor', message: error.message });
    }
    console.log('PUT /canciones/actualizar');
});

module.exports = router;