const express = require('express');
const router = express.Router();

// const mysql = require('mysql2');
const connect = require('../conexao.js');

// GET todos os produtos
router.get('/produtos', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    return connect.execSQLQuery('select * from produto', res);
})

// GET produto por id
router.get('/produtos/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET');
    return connect.execSQLQuery(`select * from produto where id = ${req.params.id}`, res);
})

// PUT produto
router.put('/produtos/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT');
    return connect.execSQLQuery(`update produto set nome='${req.body.nome}', imagem='${req.body.imagem}', capacidade='${req.body.capacidade}', preco='${req.body.preco}' where id=${req.params.id}`, res);
})

// POST produto
router.post('/produtos', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST');
    return connect.execSQLQuery(`insert into produto (nome, imagem, capacidade, preco) value('${req.body.nome}', '${req.body.imagem}', '${req.body.capacidade}', '${req.body.preco}')`, res);
})

// DELETE produto
router.delete('/produtos/:id', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery(`delete from produto where id=${req.params.id}`, res);
})

module.exports = router;
