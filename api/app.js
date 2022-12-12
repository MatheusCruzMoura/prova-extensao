const express = require('express');
require('dotenv').config();

const routes = require('./routes/index.js');

// Creating express object
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Rotas
app.use(routes)

// Port Number
const PORT = process.env.PORT || 5001;

// Server Setup
app.listen(PORT, console.log(`Server iniciado na porta ${PORT} | http://localhost:${PORT}`));
