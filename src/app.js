const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes');
const errorHandler = require('./utils/errorHandler');
const path = require('path');

const app = express();

// middlewares antes de las rutas
app.use(express.json());
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// rutas
app.use('/api/v1', router);
app.get("/", (req, res) => {
    return res.send(`
    <div style="text-align: center">
        <h1>API para ecommerce</h1>
        <h3><a href="https://documenter.getpostman.com/view/17877993/2s8ZDczLBj">Documentación</a></h3>
        Academlo
    </div>
    `)
})

// middlewares después de las rutas
app.use(errorHandler)

module.exports = app;
