const Router = require('express')
const { signup, getAll, getOne, deleteOne, login, updateOneUser, updateRole, verifyToken, modifyUser } = require('../controllers/ctrl')
const { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct, decreaseProductStock, increaseProductStock } = require('../controllers/product_ctrl')
const { addStore, getAllStores, getOneStore } = require('../controllers/stores_ctrl')
const {addPromo, handleApplyDiscount, allDiscounts, deletePromo } = require('../controllers/promo_ctrl')
const { getAllStocks, getStockByProduct } = require('../controllers/stock_ctrl')
const { createSession, success, paiementStatus, createPaiement,  } = require('../controllers/payment_ctrl')
const { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder,getOrderProducts , updateStatus, cancelOrder  } = require('../controllers/order_ctrl')
const router = Router()


//USERS
router.post('/signup', signup)
router.post('/login', login)
router.get('/getAll', getAll)
router.get('/getOne/:id', getOne)
router.delete('/deleteOne/:id', deleteOne)
router.put('/updateOneUser/:id', updateOneUser)
router.put('/updateRole/:id', updateRole)
router.get('/verifyToken', verifyToken)
router.patch('/modifyUser/:userId', modifyUser)

//PRODUCTS
router.post('/addProduct',uploadImage, addProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getOneProduct/:id', getOneProduct)
router.put('/updateProduct/:id', updateProduct);
router.patch('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/decreaseStock/:id', decreaseProductStock);
router.put('/increaseStock/:id', increaseProductStock)

//STORES
router.post('/addStore', addStore)
router.get('/getAllStores', getAllStores)
router.get('/getOneStore/:id', getOneStore)

//PROMOS
router.post('/promocodes',addPromo )
router.get('/promocodes',allDiscounts )
router.get('/promocodes/:code',handleApplyDiscount )
router.delete('/deletepromocodes/:id', deletePromo)
// reste a faire : lister une promo, supprimer une promo

//STOCKS
router.get('/allStocks', getAllStocks)
router.get('/getStockByProduct/:productId', getStockByProduct)


//ORDERS
router.post('/createorder',createOrder ) // paiement sur place, seulement la commande ici
router.put('/updateStatusOrder/:orderId', updateStatusOrder)
router.get('/allOrders', allOrders)
router.delete('/deleteOneOrder/:id', deleteOneOrder)
router.get('/ordersOfUser/:userId', ordersOfUser)
router.post('/updateOrder', updateOrder) //update paymentId if order paid 
router.get('/getOrderProducts/:orderId', getOrderProducts) //products of order
router.put('/updateStatus/:orderId', updateStatus) //routes pour websocket
router.post('/cancelOrder', cancelOrder)



//router.post('/createOrderAndPayment')



//PAYMENTS
router.post('/checkout_session', createSession )
router.get('/success', success)
router.get('/paiementStatus', paiementStatus)
router.post('/createPaiement', createPaiement) //paiement sur place, seuleulement le paiement ici


module.exports = router