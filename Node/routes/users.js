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
        const [rows] = await pool.query('SELECT * FROM USUARIO');
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
    console.log('GET /users');
});

router.post('/registrar', async (req, res) => {
    try {
        const { nombre, apellido, foto, correo, password, fecha_nacimiento } = req.body;
        // Validar los datos
        if (!nombre || !apellido || !foto || !correo || !password || !fecha_nacimiento) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }
        // Verificar que el correo no exista
        const [rows] = await pool.query('SELECT id FROM USUARIO WHERE correo = ?', [correo]);
        if (rows.length > 0) {
            return res.status(400).json({ error: 'El correo ya existe' });
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
        res.json({ id: result.insertId, nombre, apellido, foto: fotoUrl, correo, password, fecha_nacimiento });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor', message: error.message });
    }
    console.log('POST /users/registrar');
});

router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        // Validar los datos
        if (!correo || !password) {
            return res.status(400).json({ error: 'Datos incompletos' });
        }
        // Verificar que el correo exista
        const [rows] = await pool.query('SELECT * FROM USUARIO WHERE correo = ? AND password = ?', [correo, password]);
        if (rows.length === 0) {
            return res.status(400).json({ error: 'Correo o contraseña incorrectos' });
        }
        res.json({ id: rows[0].ID, nombre: rows[0].NOMBRE, apellido: rows[0].APELLIDO, foto: rows[0].FOTO, correo: rows[0].CORREO, fecha_nacimiento: rows[0].FECHA_NACIMIENTO });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error en el servidor', message: error.message });
    }
    console.log('POST /users/login');
});

module.exports = router;