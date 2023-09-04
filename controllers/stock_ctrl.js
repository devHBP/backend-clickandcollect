const StocksTest = require('../models/BDD/Stocks')
const Products = require('../models/BDD/Produits.js')

const { Op } = require("sequelize");

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

  //stockantigaspi
  const getUpdateStockAntigaspi = async (req, res) => {
    const { productId, quantityPurchased } = req.body;
    console.log('productId', productId)
    console.log('qty', quantityPurchased)
    try {
      const product = await Products.findByPk(productId);
      console.log('product', product)
      if (!product) {
          return res.status(404).json({ message: 'Produit non trouvé.' });
      }
        console.log('produit trouvé')

        product.stockantigaspi -= quantityPurchased;
        console.log('new product', product)
        await product.save();

        res.status(200).json({ message: 'Stock antigaspi mis à jour avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour du stock.' });
    }
}

  
  module.exports = { getAllStocks, getStockByProduct, getUpdateStockAntigaspi }