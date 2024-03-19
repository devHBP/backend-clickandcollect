const sequelize = require('../db/db');
const StocksTest = require("../models/BDD/Stocks");
const Products = require("../models/BDD/Produits.js");

const { Op } = require("sequelize");



//lister tous les stocks
const getAllStocks = (req, res) => {
  StocksTest.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((stocks) => {
      res.status(200).json(stocks);
    })
    .catch((error) => res.statut(500).json(error));
};

//lister le stock par productId
const getStockByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const stockByProduct = await StocksTest.findAll({
      where: { productId }, // Utilisation de l'ID du produit pour filtrer les résultats
      attributes: ["productId", "quantite"], // Sélection des attributs à récupérer
    });
    //console.log(stockByProduct);

    res.json(stockByProduct); // Envoi des données en réponse
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération du stock par produit :",
      error
    );
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération du stock par produit.",
    });
  }
};

// verif stockantigaspi dans le panier
const checkStockAntiGaspi = async (req, res) => {
  const panier = req.body.cart;

  try {
    let stockResponse = {};

    for (let i = 0; i < panier.length; i++) {
      const { productId, antigaspi } = panier[i];

      // Vérifie uniquement les produits marqués comme antigaspi
      if (antigaspi) {
        const product = await Products.findByPk(productId);

        if (!product) {
          stockResponse[productId] = { error: "Produit non trouvé" };
          continue;
        }

        stockResponse[productId] = product.stockantigaspi;
      }
    }

    res.status(200).json(stockResponse);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la vérification des stocks." });
  }
};

//verif info stockantigaspi sur le produit
const verifStockAntiGaspi = async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Products.findByPk(productId);

    if (product) {
      res.json({ stockantigaspi: product.stockantigaspi });
    } else {
      res.status(404).send("Produit non trouvé");
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la vérification des stocks antisgapi.",
      });
  }
};
// j'enleve du stock antigaspi
const getUpdateStockAntigaspi = async (req, res) => {
  const { productId, quantityPurchased } = req.body;
  // console.log("productId", productId);
  // console.log("qty", quantityPurchased);
  console.log("req body ", req.body);
  try {
    const product = await Products.findByPk(productId);

    // console.log("product", product);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    product.stockantigaspi -= quantityPurchased; // Soustrait la quantité du stock
    console.log("j enleve du stock");

    await product.save();

    res
      .status(200)
      .json({ message: "Stock antigaspi mis à jour avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du stock antigaspi." });
  }
};

// je rajoute du stock antigaspi
const getAddStockAntigaspi = async (req, res) => {
  const { productId, quantityPurchased } = req.body;
  console.log("productId", productId);
  console.log("qty", quantityPurchased);
  console.log("req body ", req.body);
  try {
    const product = await Products.findByPk(productId);

    //console.log("product", product);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    product.stockantigaspi += quantityPurchased; // ajoute la quantité du stock
    // console.log("je rajoute du stock");
    // console.log("product.antigasti", product.stockantigaspi);

    await product.save();

    res
      .status(200)
      .json({ message: "Stock antigaspi mis à jour avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour du stock antigaspi." });
  }
};

// j'enleve du stock - produit normal
// const getUpdateStock = async (req, res) => {
//   const { productId, quantityPurchased } = req.body;
  
//   try {
//     const product = await Products.findByPk(productId);
//     const stock = await StocksTest.findOne({ where: { productId: productId } });

//     if (!product) {
//       return res.status(404).json({ message: "Produit non trouvé." });
//     }
//     if (stock.quantite < quantityPurchased) {
//       return res.status(400).json({ error: "Not enough stock" });
//     }

//     product.stock -= quantityPurchased;
//     stock.quantite -= quantityPurchased;
//     await product.save();
//     await stock.save();

//     res.status(200).json({ message: `Stock mis à jour (- ${quantityPurchased}) avec succès.` });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Erreur lors de la mise à jour du stock." });
//   }
// };
const getUpdateStock = async (req, res) => {
  const { productId, quantityPurchased } = req.body;
  try {
    // Démarrez une transaction
    const result = await sequelize.transaction(async (t) => {
      // Vérifiez la quantité de stock disponible pour le productId donné
      const stock = await StocksTest.findOne({ where: { productId }, transaction: t });
      if (!stock || stock.quantite < quantityPurchased) {
        // Si le stock n'est pas suffisant, lancez une erreur pour annuler la transaction
        throw new Error('Not enough stock');
      }

      // Mise à jour conditionnelle du stock si la quantité est suffisante
      const updatedStock = await StocksTest.update(
        { quantite: sequelize.literal(`quantite - ${quantityPurchased}`) },
        { where: { productId, quantite: { [Op.gte]: quantityPurchased } }, transaction: t }
      );

      // Mise à jour conditionnelle du produit (si nécessaire, ajustez selon votre modèle)
      const updatedProduct = await Products.update(
        { stock: sequelize.literal(`stock - ${quantityPurchased}`) },
        { where: { productId: productId }, transaction: t }
      );

      return { updatedStock, updatedProduct };
    });
    // console.log(result)

    // Vérifiez le résultat de la transaction
    if (!result.updatedStock || !result.updatedProduct) {
      return res.status(400).json({ error: "Update failed" });
    }

    res.status(200).json({ message: `Stock updated (- ${quantityPurchased}) successfully.` });
  } catch (error) {
    console.log(error)
    if (error.message === 'Not enough stock') {
      return res.status(400).json({ error: "Not enough stock" });
    }
    res.status(500).json({ message: "Error updating stock." });
  }
};


// j'ajoute du stock
const getAddStock = async (req, res) => {
  const { productId, quantityPurchased } = req.body;
  console.log('req.body', req.body)
 
  try {
    const product = await Products.findByPk(productId);
    const stock = await StocksTest.findOne({ where: { productId: productId } });

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    product.stock += quantityPurchased;
    stock.quantite += quantityPurchased;
    await product.save();
    await stock.save();

    res.status(200).json({ message: "Stock mis à jour (+)  avec succès." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour en plus du stock." });
  }
};

module.exports = {
  getAllStocks,
  getStockByProduct,
  getUpdateStockAntigaspi,
  checkStockAntiGaspi,
  getUpdateStock,
  getAddStock,
  getAddStockAntigaspi,
  verifStockAntiGaspi,
};
