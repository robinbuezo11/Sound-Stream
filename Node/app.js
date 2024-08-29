const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001;

const indexRouter = require('./routes/index');
const userRouter = require('./routes/users');

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/', indexRouter);
app.use('/usuarios', userRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});