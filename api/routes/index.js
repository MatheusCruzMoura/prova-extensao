const express = require('express');
const router = express.Router();

// GET base
router.get('/', (req, res) => {
    res.send('A API node está rodando ' + 'neste servidor')
    res.end()
})

// GET node version
router.get('/node', (req, res) => {
    res.send('Aplicação rodando no node v16.18.1')
    res.end()
})

module.exports = router;