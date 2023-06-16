const TestUsers = require('./_users');
const TestStores = require('./_stores');
const TestOrders = require('./_orders');
const TestOrderProducts = require('./_orderproducts');
const TestProducts = require('./_products');
const TestSlots = require('./_slots');
const TestPayments = require('./_payments');
const TestPromotions = require('./_promotions');

// Relations
// Une commande (Orders) peut être passée par un utilisateur (Users).
TestUsers.hasMany(TestOrders, { foreignKey: 'userId', as: 'orders' });
TestOrders.belongsTo(TestUsers, { foreignKey: 'userId' });

// Une commande (Orders) peut être passée dans un magasin (Stores).
TestStores.hasMany(TestOrders, { foreignKey: 'storeId', as: 'orders' });
TestOrders.belongsTo(TestStores, { foreignKey: 'storeId' });

// Un produit (Products) peut être inclus dans plusieurs commandes (Orders) via la table OrderProducts.
TestProducts.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
TestOrders.belongsToMany(TestProducts, { through: TestOrderProducts, foreignKey: 'orderId' });

// Un créneau horaire (Slots) peut être associé à plusieurs commandes (Orders).
TestSlots.hasMany(TestOrders, { foreignKey: 'slotId', as: 'orders' });
TestOrders.belongsTo(TestSlots, { foreignKey: 'slotId' });

// Une commande (Orders) peut avoir une méthode de paiement spécifique (Payments).
TestPayments.hasMany(TestOrders, { foreignKey: 'paymentId', as: 'orders' });
TestOrders.belongsTo(TestPayments, { foreignKey: 'paymentId' });

// Une commande (Orders) peut avoir une promotion appliquée (Promotions).
TestPromotions.hasMany(TestOrders, { foreignKey: 'promotionId', as: 'orders' });
TestOrders.belongsTo(TestPromotions, { foreignKey: 'promotionId' });

/**module.exports = {
  TestUsers,
  TestStores,
  TestOrders,
  TestOrderProducts,
  TestProducts,
  TestSlots,
  TestPayments,
  TestPromotions
};
*/
