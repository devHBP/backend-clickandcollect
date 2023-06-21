const TestUsers = require('./_users');
const TestStores = require('./_stores');
const TestOrders = require('./_orders');
const TestOrderProducts = require('./_orderproducts');
const TestProducts = require('./_products');
const TestProductsV2 = require('./__products');
const TestProductsV3 = require('./___products');
const TestProductsV4 = require('./_____products');
const TestSlots = require('./_slots');
const TestPayments = require('./_payments');
const TestPromotions = require('./_promotions');
const TestStoresV2 = require('./__stores')
const TestStocks = require('./_stocks')
const TestStocksV2 = require('./__stocks')

// Relations
// Une commande (Orders) peut être passée par un utilisateur (Users).
TestUsers.hasMany(TestOrders, { foreignKey: 'userId', as: 'orders' });
TestOrders.belongsTo(TestUsers, { foreignKey: 'userId' });

// Une commande (Orders) peut être passée dans un magasin (Stores).
// TestStores.hasMany(TestOrders, { foreignKey: 'storeId', as: 'orders' });
// TestOrders.belongsTo(TestStores, { foreignKey: 'storeId' });
TestStoresV2.hasMany(TestOrders, { foreignKey: 'storeId', as: 'orders' });
TestOrders.belongsTo(TestStoresV2, { foreignKey: 'storeId' });

// Un produit (Products) peut être inclus dans plusieurs commandes (Orders) via la table OrderProducts.
//TestProducts.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProducts, { through: TestOrderProducts, foreignKey: 'orderId' });
//TestProductsV2.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProductsV2, { through: TestOrderProducts, foreignKey: 'orderId' });
TestProductsV4.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
TestOrders.belongsToMany(TestProductsV4, { through: TestOrderProducts, foreignKey: 'orderId' });

// Un créneau horaire (Slots) peut être associé à plusieurs commandes (Orders).
TestSlots.hasMany(TestOrders, { foreignKey: 'slotId', as: 'orders' });
TestOrders.belongsTo(TestSlots, { foreignKey: 'slotId' });

// Une commande (Orders) peut avoir une méthode de paiement spécifique (Payments).
TestPayments.hasMany(TestOrders, { foreignKey: 'paymentId', as: 'orders' });
TestOrders.belongsTo(TestPayments, { foreignKey: 'paymentId' });

// Une commande (Orders) peut avoir une promotion appliquée (Promotions).
TestPromotions.hasMany(TestOrders, { foreignKey: 'promotionId', as: 'orders' });
TestOrders.belongsTo(TestPromotions, { foreignKey: 'promotionId' });

//
//TestStocks.belongsTo(TestProductsV2, { foreignKey: 'productId' });
//TestProductsV3.hasOne(TestStocks, { foreignKey: 'stockId' });
//TestStocks.belongsTo(TestProductsV3, { foreignKey: 'productId' });
TestProductsV4.hasOne(TestStocksV2, { foreignKey: 'productId' });
TestStocksV2.belongsTo(TestProductsV4, { foreignKey: 'productId' });



module.exports = {
  TestUsers,
  TestStores,
  TestOrders,
  TestOrderProducts,
  TestProducts,
  TestSlots,
  TestPayments,
  TestPromotions, 
  TestStoresV2,
  TestStocks, 
  TestStocksV2,
  TestProductsV2,
  TestProductsV3,
  TestProductsV4
};

