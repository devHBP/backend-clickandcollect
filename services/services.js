const TestPaymentsV2 = require("../models/BDD/Payments");
const Orders = require("../models/BDD/Orders");
const TestStoresV2 = require("../models/BDD/Stores");
const CartItems = require("../models/BDD/ProductsCart")

const createPaiementId = async (method, transactionId, status) => {
  try {
    const paiement = await TestPaymentsV2.create({
      method,
      transactionId,
      status,
    });
    // console.log("services createPaiementId", paiement.dataValues.paymentId);
    return paiement.dataValues.paymentId;
  } catch (error) {
    console.error(error);
    throw new Error("Une erreur est survenue lors de la création du paiement");
  }
};

const updateOrderService = async (orderId, paymentId) => {
  const order = await Orders.findOne({ where: { orderId } });
  if (!order) {
    throw new Error("Commande non trouvée");
  }

  order.paymentId = paymentId;
  order.paid = true;
  await order.save();

  return order;
};

const getOneStoreName = async (storeId) => {
  try {
    const store = await TestStoresV2.findByPk(storeId);
    if (!store) {
      throw new Error("Store not found");
    }
    return store.nom_magasin;
  } catch (error) {
    console.error(error);
    throw new Error(
      "Une erreur est survenue lors de la récupération du nom du magasin"
    );
  }
};

const  getCurrentOfferId = async (userId, productId) => {
  const lastItem = await CartItems.findOne({
    where: { userId, productId, type: 'offre31' },
    order: [['createdAt', 'DESC']]
  });
  return lastItem ? lastItem.offerId : 0;
}


module.exports = {
  createPaiementId,
  updateOrderService,
  getOneStoreName,
  getCurrentOfferId
};
