const StocksTest = require('../models/TestBDD/Stocks')

//lister tous les stocks
const getAllStocks = (req, res) => {
    StocksTest.findAll({
          attributes : {exclude: ['createdAt', "updatedAt"]}
      })
      .then((stocks) => {
          res.status(200).json(stocks)
      })
      .catch(error => res.statut(500).json(error))
  }

  module.exports = { getAllStocks }