const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const mysql = require('mysql2');
require('dotenv').config();

const connect = require('../conexao.js');

const connection = mysql.createConnection({
    host: process.env.BANCO_HOST,
    port: process.env.BANCO_PORT,
    user: process.env.BANCO_USER,
    password: process.env.BANCO_SENHA,
    database: process.env.BANCO
});

router.post('/usuarios', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.senha, salt);
    if (hash != undefined) {
        return connect.execSQLQuery(
            `insert into usuario (nome, login, senha) value('${req.body.nome}', '${req.body.login}', '${hash}')`, res);
    }
})

router.post('/usuarios/login', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');

    connection.query(
        `SELECT senha FROM usuario WHERE login = '${req.body.login}'`,
        function (err, results) {
            if (results.length > 0) {
                bcrypt.compare(req.body.senha, results[0].senha, function (err, result) {
                    if (result) {
                        var token = jwt.sign({ login: req.body.login }, process.env.PRIVATE_KEY, { expiresIn: 60 });
                        res.json({ "token": token })
                        res.end()
                    } else {
                        res.json({ "token": undefined })
                        res.end()
                    }
                })
            } else {
                res.json({ "token": undefined })
                res.end()
            };
        }
    );
})

router.get('/usuarios/auth', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');

    const authHeader = req.headers.authorization;

    const [, token] = authHeader.split(' ');

    try {
        jwt.verify(token, process.env.PRIVATE_KEY);
        res.json({ erro: false })
    } catch (error) {
        res.json({ erro: true })
    }
    
    res.end()
})

module.exports = router;
