
const Users = require('./__users');//const TestUsers = require('./_users');
const TestOrderProducts = require('./_orderproducts');
const OrdersProducts = require('./__orderproducts')
//const OrderProducts = require('./OrderProducts.js');
const TestSlots = require('./_slots');
const TestPaymentsV2 = require('./__payments');
const TestPromotions = require('./_promotions');
const TestStoresV2 = require('./__stores')
const StocksTest = require('./Stocks')
//const ProductsTest = require('./Products')
const Products = require('./_Products')
//const TestOrdersV6 = require('./_______orders');
const Orders = require('./Orders')




//const TestStores = require('./_stores');
//const TestOrderProductsV2 = require('./__orderproducts');
// const TestOrderProductsV3 = require('./___orderproducts');
// const TestOrderProductsV4 = require('./____orderproducts');
// const TestOrderProductsV5 = require('./_____orderproducts');
// const TestOrderProductsV6 = require('./______orderproducts');
// const TestOrderProductsV7 = require('./_______orderproducts');
//const TestProducts = require('./_products');
// const TestProductsV2 = require('./__products');
// const TestProductsV3 = require('./___products');
// const TestProductsV4 = require('./_____products');
// const TestProductsV5 = require('./______products');
//const TestPayments = require('./_payments');
// const TestStocks = require('./_stocks')
// const TestStocksV2 = require('./__stocks')
// const TestStocksV3 = require('./___stocks')
// const TestOrders = require('./__orders');
// const TestOrdersV2 = require('./___orders');
// const TestOrdersV3 = require('./____orders');
// const TestOrdersV4 = require('./_____orders');
//const TestOrdersV5 = require('./______orders');


// Relations
// Une commande (Orders) peut être passée par un utilisateur (Users).
Users.hasMany(Orders, { foreignKey: 'userId', as: 'orders' });
Orders.belongsTo(Users, { foreignKey: 'userId' });

// Une commande (Orders) peut être passée dans un magasin (Stores).
// TestStores.hasMany(TestOrders, { foreignKey: 'storeId', as: 'orders' });
// TestOrders.belongsTo(TestStores, { foreignKey: 'storeId' });
TestStoresV2.hasMany(Orders, { foreignKey: 'storeId', as: 'orders' });
Orders.belongsTo(TestStoresV2, { foreignKey: 'storeId' });

// Un produit (Products) peut être inclus dans plusieurs commandes (Orders) via la table OrderProducts.
//TestProducts.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProducts, { through: TestOrderProducts, foreignKey: 'orderId' });
//TestProductsV2.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProductsV2, { through: TestOrderProducts, foreignKey: 'orderId' });
//TestProductsV4.belongsToMany(TestOrders, { through: TestOrderProducts, foreignKey: 'productId' });
//TestOrders.belongsToMany(TestProductsV4, { through: TestOrderProducts, foreignKey: 'orderId' });
Products.belongsToMany(Orders, { through: OrdersProducts, foreignKey: 'productId' });
Orders.belongsToMany(Products, { through: OrdersProducts, foreignKey: 'orderId' });

// Un créneau horaire (Slots) peut être associé à plusieurs commandes (Orders).
TestSlots.hasMany(Orders, { foreignKey: 'slotId', as: 'orders' });
Orders.belongsTo(TestSlots, { foreignKey: 'slotId' });

// Une commande (Orders) peut avoir une méthode de paiement spécifique (Payments).
TestPaymentsV2.hasMany(Orders, { foreignKey: 'paymentId', as: 'orders' });
Orders.belongsTo(TestPaymentsV2, { foreignKey: 'paymentId' });

// Une commande (Orders) peut avoir une promotion appliquée (Promotions).
TestPromotions.hasMany(Orders, { foreignKey: 'promotionId', as: 'orders' });
Orders.belongsTo(TestPromotions, { foreignKey: 'promotionId' });

//
//TestStocks.belongsTo(TestProductsV2, { foreignKey: 'productId' });
//TestProductsV3.hasOne(TestStocks, { foreignKey: 'stockId' });
//TestStocks.belongsTo(TestProductsV3, { foreignKey: 'productId' });
//TestProductsV4.hasOne(TestStocksV2, { foreignKey: 'productId' });
//TestStocksV2.belongsTo(TestProductsV4, { foreignKey: 'productId' });
//TestProductsV5.hasOne(TestStocksV3, { foreignKey: 'productId' });
//TestStocksV3.belongsTo(TestProductsV5, { foreignKey: 'productId' });
Products.hasOne(StocksTest, { foreignKey: 'productId', as:'stock' }); //j'ai rajouté l'alias stock pour test
StocksTest.belongsTo(Products, { foreignKey: 'productId' });





module.exports = {
  TestUsers,
  Users,
  TestStores,
  TestOrderProducts,
  // TestOrderProductsV2,
  TestOrderProductsV3,
  TestOrderProductsV4,
  TestOrderProductsV6,
  TestOrderProductsV7,
  OrderProducts,
  OrdersProducts,
  TestProducts,
  Products,
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
  TestOrdersV6,
  Orders
};

