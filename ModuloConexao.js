const mysql = require('mysql2');

//connection config
const connection = mysql.createConnection({
    host: 'localhoost', // or your database host
    user: 'root', //your mysql user
    password: '#!@0Mi4$Uszenfone', // your mysql password
    database: 'MyProject' // your database name
});

//connecting to database
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar', err);
    return;
    }
    console.log('Conectado ao bando de dados MYSQL');
})

module.exports = connection;