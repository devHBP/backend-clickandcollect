const TestStocks = require('../models/TestBDD/_stocks')

//lister tous les stocks
const getAllStocks = (req, res) => {
    TestStocks.findAll({
          attributes : {exclude: ['createdAt', "updatedAt"]}
      })
      .then((stocks) => {
          res.status(200).json(stocks)
      })
      .catch(error => res.statut(500).json(error))
  }

  module.exports = { getAllStocks }