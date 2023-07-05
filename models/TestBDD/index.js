const TestUsers = require('./_users');
const TestStores = require('./_stores');
const TestOrderProducts = require('./_orderproducts');
//const TestOrderProductsV2 = require('./__orderproducts');
const TestOrderProductsV3 = require('./___orderproducts');
const TestOrderProductsV4 = require('./____orderproducts');
const TestOrderProductsV5 = require('./_____orderproducts');
const TestOrderProductsV6 = require('./______orderproducts');
const TestOrderProductsV7 = require('./_______orderproducts');
const OrderProducts = require('./OrderProducts.js');
const TestProducts = require('./_products');
const TestProductsV2 = require('./__products');
const TestProductsV3 = require('./___products');
const TestProductsV4 = require('./_____products');
const TestProductsV5 = require('./______products');
const TestSlots = require('./_slots');
const TestPayments = require('./_payments');
const TestPaymentsV2 = require('./__payments');
const TestPromotions = require('./_promotions');
const TestStoresV2 = require('./__stores')
const TestStocks = require('./_stocks')
const TestStocksV2 = require('./__stocks')
const TestStocksV3 = require('./___stocks')
const StocksTest = require('./Stocks')
const ProductsTest = require('./Products')
const TestOrders = require('./__orders');
const TestOrdersV2 = require('./___orders');
const TestOrdersV3 = require('./____orders');
const TestOrdersV4 = require('./_____orders');
//const TestOrdersV5 = require('./______orders');
const TestOrdersV6 = require('./_______orders');




// Relations
// Une commande (Orders) peut être passée par un utilisateur (Users).
TestUsers.hasMany(TestOrdersV6, { foreignKey: 'userId', as: 'orders' });
TestOrdersV6.belongsTo(TestUsers, { foreignKey: 'userId' });

// Une commande (Orders) peut être passée dans un magasin (Stores).
// TestStores.hasMany(TestOrders, { foreignKey: 'storeId', as: 'orders' });
// TestOrders.belongsTo(TestStores, { foreignKey: 'storeId' });
TestStoresV2.hasMany(TestOrdersV6, { foreignKey: 'storeId', as: 'orders' });
TestOrdersV6.belongsTo(TestStoresV2, { foreignKey: 'storeId' });

// Un produit (Products) peut être inclus dans plusieurs commandes (Orders) via la table OrderProducts.
//TestProducts.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProducts, { through: TestOrderProducts, foreignKey: 'orderId' });
//TestProductsV2.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProductsV2, { through: TestOrderProducts, foreignKey: 'orderId' });
//TestProductsV4.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProductsV4, { through: TestOrderProducts, foreignKey: 'orderId' });
ProductsTest.belongsToMany(TestOrdersV6, { through: OrderProducts, foreignKey: 'productId' });
TestOrdersV6.belongsToMany(ProductsTest, { through: OrderProducts, foreignKey: 'orderId' });

// Un créneau horaire (Slots) peut être associé à plusieurs commandes (Orders).
TestSlots.hasMany(TestOrdersV6, { foreignKey: 'slotId', as: 'orders' });
TestOrdersV6.belongsTo(TestSlots, { foreignKey: 'slotId' });

// Une commande (Orders) peut avoir une méthode de paiement spécifique (Payments).
TestPaymentsV2.hasMany(TestOrdersV6, { foreignKey: 'paymentId', as: 'orders' });
TestOrdersV6.belongsTo(TestPaymentsV2, { foreignKey: 'paymentId' });

// Une commande (Orders) peut avoir une promotion appliquée (Promotions).
TestPromotions.hasMany(TestOrdersV6, { foreignKey: 'promotionId', as: 'orders' });
TestOrdersV6.belongsTo(TestPromotions, { foreignKey: 'promotionId' });

//
//TestStocks.belongsTo(TestProductsV2, { foreignKey: 'productId' });
//TestProductsV3.hasOne(TestStocks, { foreignKey: 'stockId' });
//TestStocks.belongsTo(TestProductsV3, { foreignKey: 'productId' });
//TestProductsV4.hasOne(TestStocksV2, { foreignKey: 'productId' });
//TestStocksV2.belongsTo(TestProductsV4, { foreignKey: 'productId' });
//TestProductsV5.hasOne(TestStocksV3, { foreignKey: 'productId' });
//TestStocksV3.belongsTo(TestProductsV5, { foreignKey: 'productId' });
ProductsTest.hasOne(StocksTest, { foreignKey: 'productId', as:'stock' }); //j'ai rajouté l'alias stock pour test
StocksTest.belongsTo(ProductsTest, { foreignKey: 'productId' });





module.exports = {
  TestUsers,
  TestStores,
  TestOrderProducts,
  // TestOrderProductsV2,
  TestOrderProductsV3,
  TestOrderProductsV4,
  TestOrderProductsV6,
  TestOrderProductsV7,
  OrderProducts,
  TestProducts,
  TestSlots,
  TestPayments,
  TestPaymentsV2,
  TestPromotions, 
  TestStoresV2,
  TestProductsV2,
  TestProductsV3,
  TestProductsV4, 
  TestProductsV5,
  TestStocks, 
  TestStocksV2,
  TestStocksV3,
  ProductsTest,
  StocksTest,
  TestOrdersV2,
  TestOrdersV3,
  TestOrdersV4,
  TestOrdersV5,
  TestOrdersV6
};

