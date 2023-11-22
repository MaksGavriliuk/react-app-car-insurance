const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.listen(8080, () => {
    console.log('Сервер запущен на порту 8080');
});