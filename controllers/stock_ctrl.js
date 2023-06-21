const TestStocksV3 = require('../models/TestBDD/___stocks')

//lister tous les stocks
const getAllStocks = (req, res) => {
    TestStocksV3.findAll({
          attributes : {exclude: ['createdAt', "updatedAt"]}
      })
      .then((stocks) => {
          res.status(200).json(stocks)
      })
      .catch(error => res.statut(500).json(error))
  }

  module.exports = { getAllStocks }