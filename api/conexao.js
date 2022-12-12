const mysql = require('mysql2');
require('dotenv').config();

function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: process.env.BANCO_HOST,
        port: process.env.BANCO_PORT,
        user: process.env.BANCO_USER,
        password: process.env.BANCO_SENHA,
        database: process.env.BANCO
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            res.json(error);
        } else {
            res.json(results);
            console.log('executou!');
        }
        connection.end();
    });
}

exports.execSQLQuery = execSQLQuery;