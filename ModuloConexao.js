const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhoost',
    user: 'root',
    password: '#!@0Mi4$Uszenfone',
    database: 'MyProject'
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar', err);
    return;
    }
    console.log('Conectado ao bando de dados MYSQL');
})

module.exports = connection;