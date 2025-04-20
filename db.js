const mysql = require('mysql2');

// Connection configuration
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#!@0Mi4$Uszenfone',
    database: 'todo_list'
});

// Connect to the database
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados', err);
        return;
    }
    console.log('Conectado ao banco de dados MYSQL');
});

module.exports = connection;