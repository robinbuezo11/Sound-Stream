const express = require('express');
const router = express.Router();
const pool = require('../utils/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM USUARIO');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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
        // Insertar el usuario
        // const query = "INSERT INTO USUARIO (nombre, apellido, foto, correo, password, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?)";
        // const [result] = await pool.query(query, [nombre, apellido, foto, correo, password, fecha_nacimiento]);
        // res.json({ id: result.insertId, nombre, apellido, foto, correo, fecha_nacimiento });
        res.json({ nombre, apellido, foto, correo, password, fecha_nacimiento });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/')

module.exports = router;