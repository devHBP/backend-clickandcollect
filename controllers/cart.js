const Carts = require("../models/BDD/Carts");
const Products = require("../models/BDD/Produits");
const CartItems = require("../models/BDD/ProductsCart");
const { sequelize } = require('../db/db')

/**
 *
 * @param {number} req.body.userId - The unique identifier of the user for whom the cart is being created.
 * @param {string} [req.body.status='active'] - The initial status of the cart, which defaults to 'active' if not specified.
 * @description creates a new cart for a user
 * @returns a JSON response with the created cart or an error message
 */
const createCart = async (req, res) => {
  try {
    const { userId, status } = req.body;

    const newCart = await Carts.create({
      userId,
      status,
    });

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @param {number} req.body.cartId - The ID of the cart to which the item is being added.
 * @param {number} [req.body.productId] - The ID of the main product being added to the cart.
 * @param {number} req.body.quantity - The quantity of the main product being added.
 * @param {number} req.body.unitPrice - The price per unit of the product.
 * @param {string} req.body.type - The type of the cart item (e.g., 'simple', 'formule').
 * @param {boolean} req.body.isFree - Indicates if the item is free (as part of a promotion, for example).
 * @param {number} [req.body.option1ProductId] - The ID of the first optional product associated with this cart item.
 * @param {number} [req.body.option2ProductId] - The ID of the second optional product associated with this cart item.
 * @param {number} [req.body.option3ProductId] - The ID of the third optional product associated with this cart item.
 * @param {number} [req.body.offerId] - The ID of any offer associated with this cart item.
 * @param {string} [req.body.typeProduit] - Specific type of the product (e.g., a subtype or a promotion identifier).
 * @description Adds a new item to a specified cart.
 * @returns a JSON response with the created cartItem or an error message
 */
const addCartItems = async (req, res) => {
  try {
    const {
      userId,
      productId,
      quantity,
      unitPrice,
      type,
      isFree,
      option1ProductId,
      option2ProductId,
      option3ProductId,
      offerId,
      typeProduit,
      libelle,
      key,
    } = req.body;
    
    // Recherche d'un panier actif existant pour cet utilisateur
    let cart = await Carts.findOne({
      where: {
        userId: userId,
        status: "active",
      },
    });

    if (!cart) {
      cart = await Carts.create({
        userId,
        status: "active",
      });
    }else {
      // Mettre à jour le champ updatedAt du panier
      cart.changed('updatedAt', true);
      await cart.save();
    }

    if (productId) {
      const product = await Products.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
    }
    
    let totalPrice = 0;
    if (type === "formule") {
      const option1 = await Products.findByPk(option1ProductId);
      const option2 = await Products.findByPk(option2ProductId);
      const option3 = await Products.findByPk(option3ProductId);

      // Additionner les prix des options, en prenant en compte les champs de prix différents (2euros pour boissions et deserts dans la formule)
      if (option1) totalPrice += option1.prix_unitaire;
      if (option2) totalPrice += option2.prix_formule;
      if (option3) totalPrice += option3.prix_formule;

      totalPrice *= quantity; // Multiplier par la quantité de la formule
    } else {
      // Calculer le totalPrice basé sur unitPrice s'il est fourni
      totalPrice = unitPrice * quantity;
    }

    const cartItem = await CartItems.create({
      cartId: cart.cartId,
      productId,
      quantity,
      unitPrice,
      totalPrice,
      type,
      option1ProductId,
      option2ProductId,
      option3ProductId,
      isFree,
      offerId,
      typeProduit,
      libelle,
      key,
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @param {number} req.body.userId - The unique identifier of the user for whom the cart is being retrieved.
 * @description Retrieves the cart for a given userId.
 * @returns a JSON response with cart details or an error message
 */
const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Carts.findOne({
      where: { userId: userId, status: "active" },
      include: [CartItems],
    });

    if (!cart) {
      // return res.status(200).json({ message: "No active cart found" });
      return res.status(200).json({ ProductsCarts: [] }); // Renvoyer un tableau vide pour les produits du panier
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @param {number} req.params.cartItemId - The unique identifier of the cart item whose quantity is to be updated.
 * @param {number} req.body.quantity - The new quantity for the cart item. Must be greater than 0.
 * @description updating the quantity of a product in the cart
 * @returns a JSON response with the updated cart item details or an error message.
 */
const adjustCartItemQuantity = async (req, res) => {
  try {
    const { cartId, productId, type } = req.params;
    const { change } = req.body;

    const cartItem = await CartItems.findOne({
      where: {
        cartId: cartId,
        productId: productId,
        type: type,
      },
    });

    if (!cartItem) {
      return res.status(404).json({
        error:
          "Cart item not found with the given product ID and type in the specified cart.",
      });
    }

    const newQuantity = cartItem.quantity + change;

    // si la quantité passe a 0, on supprime le produit du panier
    if (newQuantity <= 0) {
      await CartItems.destroy({ where: { cartItemId: cartItem.cartItemId } });
      // Vérifier s'il reste d'autres articles dans le panier
      const remainingItems = await CartItems.count({
        where: { cartId: cartId },
      });
      if (remainingItems === 0) {
        // S'il n'y a plus d'articles, supprimer également le panier
        await Carts.destroy({ where: { cartId: cartId } });
        return res.status(200).json({
          msg: "Cart item and cart removed as the last item was deleted.",
        });
      }
      return res
        .status(200)
        .json({ msg: "Cart item removed as quantity reached zero or less." });
    }

    cartItem.quantity = newQuantity;
    cartItem.totalPrice = cartItem.unitPrice * newQuantity;

    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @param {number} req.params.cartItemId - The unique identifier of the formula item in the cart
 * @param {number} req.body.quantity - The new quantity for the formula. Must be greater than zero.
 * @returns Sends a JSON response with the details of the updated form article or an error message
 * @description  Updated the quantity for a specific formula in the cart
 */
const updateFormulaQuantity = async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { change } = req.body;

    // Recherche de l'article de formule par cartItemId
    const formulaItem = await CartItems.findByPk(cartItemId, {
      include: [
        { model: Products, as: "Option1", attributes: ["prix_unitaire"] },
        { model: Products, as: "Option2", attributes: ["prix_formule"] },
        { model: Products, as: "Option3", attributes: ["prix_formule"] },
      ],
    });

    if (!formulaItem) {
      return res.status(404).json({
        error: "Formula item not found or the item is not a formula type.",
      });
    }

    const newQuantity = formulaItem.quantity + change;

    // si quantité passe à 0, on supprime la formule du panier
    if (newQuantity <= 0) {
      await CartItems.destroy({
        where: { cartItemId: formulaItem.cartItemId },
      });
      // Vérifier s'il reste d'autres articles dans le panier
      const remainingItems = await CartItems.count({
        where: { cartId: cartId },
      });
      if (remainingItems === 0) {
        // S'il n'y a plus d'articles, supprimer également le panier
        await Carts.destroy({ where: { cartId: cartId } });
        return res.status(200).json({
          msg: "Cart item and cart removed as the last item was deleted.",
        });
      }
      return res
        .status(200)
        .json({ msg: "Cart item removed as quantity reached zero or less." });
    }

    // Mise à jour de la quantité et recalcul du totalPrice
    formulaItem.quantity = newQuantity;
    const totalPrice =
      (formulaItem.Option1.prix_unitaire +
        formulaItem.Option2.prix_formule +
        formulaItem.Option3.prix_formule) *
      newQuantity;
    formulaItem.totalPrice = totalPrice;

    await formulaItem.save();

    res.status(200).json(formulaItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @param {number} req.params.cartId - The unique identifier of the cart to be deleted
 * @description deletion of a specific cart
 * @returns a JSON response with either a success message or an error message.
 */
// L'utilisateur décide de vider tout son panier en une seule fois.
// deleteOneCart est appelé pour supprimer tout le panier, évitant ainsi la nécessité de supprimer chaque article individuellement.
// par exemple a l'expiration du countdown
const deleteOneCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Carts.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    await Carts.destroy({
      where: { cartId: cartId },
    });

    res.status(200).json({ msg: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @param {number} req.params.cartItemId - The unique identifier of the cart item to be deleted
 * @param {number} req.params.cartId - The unique identifier of the cart that the item belongs to.
 * @description deletion of a specific cartim in a specific cart
 * @returns a JSON response with either a success message or an error message.
 */
const deleteCartItems = async (req, res) => {
  try {
    const { cartItemId, cartId } = req.params;

    const cart = await Carts.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = await CartItems.findOne({
      where: { cartItemId: cartItemId, cartId: cartId },
    });
    if (!cartItem) {
      return res.status(404).json({
        error: "Cart item not found or does not belong to the specified cart",
      });
    }

    await CartItems.destroy({ where: { cartItemId: cartItemId } });

    const remainingItems = await CartItems.count({ where: { cartId: cartId } });
    if (remainingItems === 0) {
      await Carts.destroy({ where: { cartId: cartId } });
      res.status(200).json({
        msg: "Cart is now empty, consider updating its status or deleting it",
      });
    } else {
      res.status(200).json({ msg: "Cart item deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 *
 * @description get all carts
 * @returns Sends a JSON response containing all carts or an error message.
 */
// const getAllCarts = async (req, res) => {
//   try {
//     const carts = await Carts.findAll({
//       attributes: { exclude: ["createdAt", "updatedAt"] },
//     });
//     res.status(200).json(carts);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const getAllCarts = async () => {
  try {
    const carts = await Carts.findAll();
    if (!carts) {
      console.log("Aucun panier trouvé");
      return []; // Retourner un tableau vide si aucun panier n'est trouvé
    }
    return carts;
  } catch (error) {
    console.error("Erreur lors de la récupération des paniers:", error);
    throw error; // Propager l'erreur pour la gérer plus haut dans la pile d'appels
  }
};

// Ajout d'un produit ou d'une formule ou ajustement de la quantité si produit ou formule deja existant(e)
const addOrUpdateCartItem = async (req, res) => {
  try {
    const {
      userId,
      productId,
      quantity,
      unitPrice,
      type,
      isFree,
      option1ProductId,
      option2ProductId,
      option3ProductId,
      typeProduit,
      libelle,
      key,
      product
    } = req.body;
    console.log('req.body', req.body)


    // Recherche ou création d'un panier actif
    let cart = await Carts.findOne({
      where: { userId: userId, status: "active" },
    });
    if (!cart) {
      cart = await Carts.create({ userId, status: "active" });
    }
    else {
      // Mettre à jour le champ updatedAt du panier
      cart.changed('updatedAt', true);
      await cart.save();
    }
    // logique pour les offres 3 + 1
    // Initialize or update offerId for offre31 type
    // let offerId = null;
    let offerId = req.body.offerId;

    if (type === "offre31") {
      const lastItem = await CartItems.findOne({
        where: { productId, type: "offre31" },
        order: [["createdAt", "DESC"]],
      });
      console.log("dernier produit avec cette offre", lastItem);

      if (lastItem ) {
        // Check if it's time to start a new offer cycle
        const offerItems = await CartItems.findAll({
          where: {
            productId,
            offerId: lastItem.offerId,
            type: "offre31",
          },
          attributes: ['quantity']
        });
        const freeItems = await CartItems.findAll({
          where: {
            productId,
            offerId: lastItem.offerId,
            type: "offre31",
            isFree: true
          },
          attributes: ['quantity']
        });
        const itemCountInOffer = offerItems.reduce((acc, item) => acc + item.quantity, 0);
        console.log('itemCountInOffer', itemCountInOffer);    
        console.log('freeItems', freeItems);
        // If already 3 paid items and next is free or if 3 paid and 1 free already exist, start new offer
        if ((itemCountInOffer === 3 && freeItems > 0) || itemCountInOffer === 4) {
          console.log("nouveau cycle offre 3+1, on incrémente offerID");
          offerId = lastItem.offerId + 1;
        } else {
          offerId = lastItem.offerId;
          console.log('offerId est le même')
        }
      } else if (!lastItem || isFree) {
        // New offer cycle
        console.log("1er article de ce type de produit");
        offerId = 1;
      }
    }
    console.log('Recherche de cartItem avec :', {
      cartId: cart.cartId,
      productId: productId,
      type: type,
      key: key,
      isFree: isFree,
      offerId: offerId,
    });
    // Recherche du produit ou de la formule dans le panier
    let cartItem = await CartItems.findOne({
      where: {
        cartId: cart.cartId,
        productId: productId,
        type: type,
        key: key,
        isFree: isFree,
        offerId: offerId,
      },
      // include: [
      //   { model: Products, as: "option1", attributes: ["prix_unitaire"] },
      //   { model: Products, as: "option2", attributes: ["prix_formule"] },
      //   { model: Products, as: "option3", attributes: ["prix_formule"] },
      // ],
    });
    console.log('cartItem', cartItem)
    if (cartItem) {
      // Ajustement de la quantité si l'article ou la formule existe déjà
      cartItem.quantity += quantity;
      console.log('cartItem.quantity', cartItem.quantity)

      // if (type === "formule") {
      //   // Recalcul du prix total pour une formule
      //   cartItem.totalPrice =
      //     ((cartItem.Option1 ? cartItem.Option1.prix_unitaire : 0) +
      //       (cartItem.Option2 ? cartItem.Option2.prix_formule : 0) +
      //       (cartItem.Option3 ? cartItem.Option3.prix_formule : 0)) *
      //     cartItem.quantity;
      // } else {
        // console.log('produit simple')
        // Produit simple
        console.log('quantity', cartItem.quantity)
        console.log('unitPrice', unitPrice)
        cartItem.totalPrice = cartItem.unitPrice * cartItem.quantity;
        console.log('totalPrice', cartItem.totalPrice)
        // cartItem.totalPrice += (unitPrice * quantity);
      //}
      await cartItem.save();
      res.status(200).json(cartItem);
    } else {
      // Ajout d'un nouvel article si ce n'est pas déjà fait
      let totalPrice = 0;
      if (type === "formule") {
        // Calcul du prix pour une nouvelle formule
        const option1 = option1ProductId
          ? await Products.findByPk(option1ProductId)
          : null;
        const option2 = option2ProductId
          ? await Products.findByPk(option2ProductId)
          : null;
        const option3 = option3ProductId
          ? await Products.findByPk(option3ProductId)
          : null;

        totalPrice += option1 ? option1.prix_unitaire : 0;
        totalPrice += option2 ? option2.prix_formule : 0;
        totalPrice += option3 ? option3.prix_formule : 0;
        totalPrice *= quantity; // Multiplier par la quantité de la formule
      } else {
        // Calcul du prix pour un produit simple
        totalPrice = unitPrice * quantity;
      }

      const newCartItem = await CartItems.create({
        cartId: cart.cartId,
        productId,
        quantity,
        unitPrice,
        totalPrice,
        type,
        isFree,
        option1ProductId,
        option2ProductId,
        option3ProductId,
        offerId,
        typeProduit,
        libelle,
        key,
        product
      });

      res.status(201).json(newCartItem);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// retrait d'un produit ou suppression si c'est le dernier - produit et formule
const removeOrUpdateCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity, type, cartItemId, key } = req.body;

    console.log("req.body", req.body);
    // Trouver le panier actif de l'utilisateur
    let cart = await Carts.findOne({
      where: { userId: userId, status: "active" },
    });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Active cart not found for this user." });
    }

    // Recherche du produit ou de la formule dans le panier
    // let cartItem = await CartItems.findByPk(cartItemId, {
    //   include: [
    //     { model: Products, as: "Option1", attributes: ["prix_unitaire"] },
    //     { model: Products, as: "Option2", attributes: ["prix_formule"] },
    //     { model: Products, as: "Option3", attributes: ["prix_formule"] },
    //   ]
    // });
    let cartItem = await CartItems.findOne({
      where: {
        cartId: cart.cartId,
        type: type,
        key: key,
        cartItemId: cartItemId,
      },
      include: [
        { model: Products, as: "Option1", attributes: ["prix_unitaire"] },
        { model: Products, as: "Option2", attributes: ["prix_formule"] },
        { model: Products, as: "Option3", attributes: ["prix_formule"] },
      ],
    });

    if (cartItem) {
      if (cartItem.quantity > quantity) {
        // Réduire la quantité de l'article
        cartItem.quantity -= quantity;
        if (type === "formule") {
          // Recalcul du prix total pour une formule
          cartItem.totalPrice =
            ((cartItem.Option1 ? cartItem.Option1.prix_unitaire : 0) +
              (cartItem.Option2 ? cartItem.Option2.prix_formule : 0) +
              (cartItem.Option3 ? cartItem.Option3.prix_formule : 0)) *
            cartItem.quantity;
        } else {
          // Produit simple
          cartItem.totalPrice -= cartItem.unitPrice * quantity;
        }
        await cartItem.save();
        res.status(200).json(cartItem);
      } else {
        console.log("je vais supprimer larticle");
        // Si la quantité à retirer équivaut ou dépasse celle dans le panier, supprimer l'article
        await CartItems.destroy({
          where: { cartItemId: cartItemId },
        });
        // Vérifier si d'autres articles restent dans le panier
        const remainingItems = await CartItems.count({
          where: { cartId: cart.cartId },
        });
        if (remainingItems === 0) {
          // Si aucun article ne reste, supprimer également le panier
          console.log("dernier article je le supprime");
          await Carts.destroy({
            where: { cartId: cart.cartId },
          });
          res.status(200).json({
            message:
              "Cart and item deleted successfully as it was the last item.",
          });
        } else {
          res.status(200).json({ message: "Item deleted successfully." });
        }
      }
    } else {
      res.status(404).json({ message: "Item not found in the cart." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// recupere le cartItemId
// const getCartItemId = async (req, res) => {
//   const { userId, productId, type, key } = req.query;

//   console.log(req.query)
//   try {
//     const whereConditions = {
//       type: type,
//       key: key
//     };

//     if (productId !== undefined && productId !== 'null' && productId !== '') {
//       whereConditions.productId = productId;
//     }

//     const cartItem = await CartItems.findOne({
//       include: [{
//         model: Carts,
//         where: { userId: userId, status: "active" }
//       }],
//       where: whereConditions
//     });

//     if (cartItem) {
//       res.json({ cartItemId:  cartItem.cartItemId });
//     } else {
//       res.status(404).send('Cart item not found.');
//     }
//   } catch (error) {
//     res.status(500).send('Server error.');
//   }
// };

const getCartItemId = async (req, res) => {
  const { userId, productId, type, key } = req.query;

  // console.log(req.query);
  try {
    const whereConditions = { type };

    if (productId) {
      whereConditions.productId = productId;
    }
    if (key) {
      whereConditions.key = key;
    }

    const cartItem = await CartItems.findAll({
      include: [
        {
          model: Carts,
          where: { userId: userId, status: "active" },
        },
      ],
      where: whereConditions,
      attributes: ['cartItemId'],
    });
    console.log(cartItem)
    if (cartItem && cartItem.length > 0) {
      // Map the results to an array of cartItemIds
      const cartItemIds = cartItem.map(item => item.cartItemId);
      // console.log(cartItemIds)
      res.json({ cartItemIds }); // Send back an array of IDs
    } else {
      res.status(404).send("Cart items not found.");
    }
  } catch (error) {
    res.status(500).send("Server error.");
  }
};

const getOffer31ItemsGroupedByOfferId = async (req, res) => {
  try {

    const productId = req.params.productId; // ou req.params.productId si vous passez productId dans le chemin

    // Remplacez CartItems par votre modèle Sequelize pour la table cart items.
    const items = await CartItems.findAll({
      where: {
        productId: productId,
        type: 'offre31'
      },
      order: [
        ['offerId', 'DESC'],
        ['cartItemId', 'DESC']
      ]
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getCartTotalQuantity = async (req, res) => {
  const { userId } = req.params;

  try {
    // Recherchez tous les éléments du panier pour l'utilisateur spécifié
    const cartItems = await CartItems.findAll({
      include: [{
        model: Carts,
        where: { userId: userId, status: "active" }
      }]
    });

    // Calculez la quantité totale à partir des éléments du panier trouvés
    let totalQuantity = 0;
    for (const cartItem of cartItems) {
      totalQuantity += cartItem.quantity;
    }

    res.status(200).json({ totalQuantity: totalQuantity });
  } catch (error) {
    console.error('Erreur lors de la récupération de la quantité totale du panier :', error);
    res.status(500).json({ error: error.message });
  }
};


/**
 * Retrieves all cart items for a specific user.
 * @param {number} req.params.userId - The unique identifier of the user whose cart items are to be retrieved.
 * @description Retrieves all items in the active cart for the given userId.
 * @returns a JSON response with all cart items or an error message.
 */
const getAllCartItemsForUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // First, find the active cart for the given user
    const cart = await Carts.findOne({
      where: { userId: userId, status: 'active' },
      attributes: ['cartId'], 

    });

    if (!cart) {
      return res.status(404).json({ message: "No active cart found for this user." });
    }

    // Retrieve all cart items from the found cart
    const cartItems = await CartItems.findAll({
      where: { cartId: cart.cartId },
      attributes: ['cartItemId', 'cartId'], 
    });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Failed to retrieve cart items:', error);
    res.status(500).json({ error: error.message });
  }
};
const clearUserCart = async (req, res) => {
  const { userId } = req.params;  // récupérer userId depuis les paramètres de l'URL

  try {
    // Trouver le panier actif de l'utilisateur
    const cart = await Carts.findOne({
      where: { userId: userId, status: 'active' }
    });

    if (!cart) {
      return res.status(404).json({ message: "No active cart found for this user." });
    }

    // Supprimer tous les articles du panier
    await CartItems.destroy({
      where: { cartId: cart.cartId }
    });

    // Supprimer le panier lui-même si nécessaire
    await Carts.destroy({
      where: { cartId: cart.cartId }
    });

    res.status(200).json({ message: "Cart and all its items have been successfully cleared." });
  } catch (error) {
    console.error('Failed to clear cart:', error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  createCart,
  addCartItems,
  getCart,
  adjustCartItemQuantity,
  deleteOneCart,
  deleteCartItems,
  updateFormulaQuantity,
  getAllCarts,
  addOrUpdateCartItem,
  removeOrUpdateCartItem,
  getCartItemId,
  getOffer31ItemsGroupedByOfferId,
  getCartTotalQuantity,
  getAllCartItemsForUser,
  clearUserCart
};
