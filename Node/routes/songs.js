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
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message, message: 'Error en el servidor' });
    }
    console.log('GET /songs');
});

router.post('/registrar', async (req, res) => {
    try {
        const { nombre, imagen, duracion, artista } = req.body;
        // Validar los datos
        if (!nombre || !apellido || !foto || !correo || !password || !fecha_nacimiento) {
            return res.status(400).json({ error: 'Datos incompletos', message: 'Datos incompletos' });
        }
        // Verificar que el correo no exista
        const [rows] = await pool.query('SELECT id FROM USUARIO WHERE correo = ?', [correo]);
        if (rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya existe', message: 'El correo ya existe' });
        }
        // Subir la foto a AWS S3
        const fotoBuffer = Buffer.from(foto.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `Fotos/${correo}-${Date.now()}.jpg`,
            Body: fotoBuffer,
            ContentType: 'image/jpeg'
        };

        const data = await s3.upload(params).promise();
        const fotoUrl = data.Location;
        // Insertar el usuario
        const query = "INSERT INTO USUARIO (nombre, apellido, foto, correo, password, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)";
        const [result] = await pool.query(query, [nombre, apellido, fotoUrl, correo, password, fecha_nacimiento]);
        res.json({ id: result.insertId, nombre, apellido, foto: fotoUrl, correo, fecha_nacimiento });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor', message: error.message });
    }
    console.log('POST /users/registrar');
});

module.exports = router;