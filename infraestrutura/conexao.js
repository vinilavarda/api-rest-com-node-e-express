const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '',
  database: 'agenda-petshop'
})
//att
module.exports = conexao