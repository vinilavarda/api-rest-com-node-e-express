const mysql = require('mysql')

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3307,
  user: 'root',
  password: '99174542Br@@',
  database: 'agenda-petshop'
})
//att
module.exports = conexao