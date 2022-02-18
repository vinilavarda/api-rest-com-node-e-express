const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimento {
  adiciona(atendimento, res) {
    const dataAgendamento = moment().format('YYYY-MM-DD HH:MM:SS')
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

    const validDate = moment(data).isSameOrAfter(dataAgendamento)
    const validClient = atendimento.cliente.length >= 5

    const validacoes = [
      {
        nome: 'data',
        valido: validDate,
        mensagem: 'Data deve ser maior ou igual a data atual'
      },
      {
        nome: 'cliente',
        valido: validClient,
        mensagem: 'Cliente deve ter pelo menos cinco caracteres'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido)
    const existemErros = erros.length

    if (existemErros) {
      res.status(400).json(erros)
    } else {
      const diaAtendimento = { ...atendimento, dataAgendamento, data }

      const sql = 'INSERT INTO Atendimentos SET ?'

      conexao.query(sql, diaAtendimento, (erro, resultados) => {
        if (erro) {
          res.status(400).json(erro)
        } else {
          res.status(201).json(atendimento)
        }
      })
    }

  }
}

module.exports = new Atendimento