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

  lista(res) {
    const sql = 'SELECT * FROM Atendimentos'

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(resultados)
      }
    })
  }

  buscaPorId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id = ${id}`

    conexao.query(sql, (erro, resultados) => {
      const atendimentoUnico = resultados[0]
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(200).json(atendimentoUnico)
      }
    })
  }
  //att
  altera(id, valores, res) {

    if (valores.data) {
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
    }

    const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(201).json({ ...valores, id })
      }
    })

  }

  deleta(id, res) {
    const sql = 'DELETE FROM Atendimentos WHERE id=?'

    conexao.query(sql, id, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro)
      } else {
        res.status(201).json({ id })
      }
    })
  }

}

module.exports = new Atendimento