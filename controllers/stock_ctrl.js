const TestStocksV2 = require('../models/TestBDD/__stocks')

//lister tous les stocks
const getAllStocks = (req, res) => {
    TestStocksV2.findAll({
          attributes : {exclude: ['createdAt', "updatedAt"]}
      })
      .then((stocks) => {
          res.status(200).json(stocks)
      })
      .catch(error => res.statut(500).json(error))
  }

  module.exports = { getAllStocks }