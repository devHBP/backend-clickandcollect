const Paniers = require("../models/BDD/Paniers");
const Products = require("../models/BDD/Produits");
const PanierProduits = require("../models/BDD/PanierProduits");

const createCart = async (req, res) => {
  try {
    const { userId, status } = req.body;

    // a revoir
    // if (!userId) {
    //     return res.status(404).json({ msg: "User not found" });
    // }

    const newCart = await Paniers.create({
      userId,
      status,
    });

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//add cartItem
const addCartItems = async (req, res) => {
    try {
      const { cartId, productId, quantite, antigaspi, formule, isFree } = req.body;
  
      // Assurez-vous que le cart existe
      const cart = await Paniers.findByPk(cartId);
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Assurez-vous que le produit existe
      const product = await Products.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Ajouter l'article au cart
      const cartItem = await PanierProduits.create({
        cartId,
        productId,
        quantite,
        antigaspi,
        formule,
        isFree
      });
  
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// test association recup un cart avec tous ses articles
const getCart = async (req, res) => {
    try {
      const { cartId } = req.params;
  
      const cart = await Paniers.findByPk(cartId, {
        include: [PanierProduits]
      });
  
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { createCart, addCartItems, getCart };
