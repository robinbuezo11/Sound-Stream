const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const db = require('./utils/db');

app.use(cors());

app.get('/', (req, res) => {
    res.send('Practica 1 - Seminario de Sistemas 1');
});

app.get('/users', (req, res) => {
    db.query('SELECT * FROM USUARIO', (err, rows) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            return;
        }

        res.send(rows);
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});