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

  //lister le stock par productId
  const getStockByProduct = async (req, res) => {
    const { productId } = req.params; // Récupération de l'ID du produit depuis les paramètres de la requête
  
    try {
      const stockByProduct = await StocksTest.findAll({
        where: { productId }, // Utilisation de l'ID du produit pour filtrer les résultats
        attributes: ['productId', 'quantite'], // Sélection des attributs à récupérer
      });
      console.log(stockByProduct);
  
      res.json(stockByProduct); // Envoi des données en réponse
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération du stock par produit :", error);
      res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du stock par produit." });
    }
  };
  
  
  module.exports = { getAllStocks, getStockByProduct }