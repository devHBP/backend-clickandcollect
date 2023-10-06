const Router = require('express')
const { signup, getAll, getOne, deleteOne, login, updateOneUser, updateRole, verifyToken, modifyUser, deleteUser, getEmailByUserId, getUserByEmail } = require('../controllers/ctrl')
const { forgotPassword, resetPassword , updatePassword} = require('../controllers/emails/pwd_ctrl')
const { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct, decreaseProductStock, increaseProductStock, getProductsofOneCategory,
     getFamillyOfProduct, createFormule, getAllFormules, getAllProductsClickandCollect, addDessertIds, getDessertIds, resetDessertIds, addBoissonIds, getBoissonIds,resetBoissonIds, } = require('../controllers/product_ctrl')
const { addFamillyProduct, getAllFamillyProducts, getOneFamillyProduct, deleteFamillyProduct } = require('../controllers/famille_produits_ctrl')
const { addStore, getAllStores, getOneStore, updateStore, getStoresByRole } = require('../controllers/stores_ctrl')
const {addPromo, handleApplyDiscount, allDiscounts, deletePromo } = require('../controllers/promo_ctrl')
const { getAllStocks, getStockByProduct, getUpdateStockAntigaspi } = require('../controllers/stock_ctrl')
const { createSession, success, paiementStatus, createPaiement,  } = require('../controllers/payment_ctrl')
const { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder,getOrderProducts , updateStatus, cancelOrder , 
    productsWithFormuleForOrder, ordersOfUserWithProducts, createReview, getAllReviews, statusLastOrder } = require('../controllers/order_ctrl')
const {sendWelcomeEmail } = require('../controllers/emails/welcomeEmail')
const {confirmOrder } = require('../controllers/emails/confirmOrder')
const {orderStatusReady } = require('../controllers/emails/orderStatusReady')
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
router.delete('/deleteUser/:id', deleteUser)
router.get('/getEmailByUserId/:userId/email', getEmailByUserId)
router.get('/getUserByEmail', getUserByEmail)

//PASSWORD
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword);
router.put('/updatePassword', updatePassword)

//PRODUCTS
router.post('/addProduct',uploadImage, addProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getAllProductsClickandCollect',getAllProductsClickandCollect)
router.get('/getOneProduct/:id', getOneProduct)
// router.put('/updateProduct/:id', updateProduct);
router.put('/updateProduct/:id', uploadImage, updateProduct);
router.patch('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);
router.put('/decreaseStock/:id', decreaseProductStock);
router.put('/increaseStock/:id', increaseProductStock)
router.get('/getProductsofOneCategory/:category', getProductsofOneCategory)
router.get('/getFamillyOfProduct/:id', getFamillyOfProduct)
router.post('/addDessertIds/ids', addDessertIds)
router.get('/getDessertIds/ids', getDessertIds);
router.post('/resetDessertIds', resetDessertIds);
router.post('/addBoissonIds/ids', addBoissonIds)
router.get('/getBoissonIds/ids', getBoissonIds);
router.post('/resetBoissonIds', resetBoissonIds);

//REVIEWS
router.post('/reviews', createReview)
router.get('/getAllReviews', getAllReviews)

//Formules
router.post('/formules', createFormule)
router.get('/getAllFormules', getAllFormules)

//FAMILLES PRODUITS - CATEGORIES
router.post('/addFamillyProduct', addFamillyProduct)
router.get('/getAllFamillyProducts', getAllFamillyProducts)
router.get('/getOneFamillyProduct/:id', getOneFamillyProduct)
router.delete('/famille/:id', deleteFamillyProduct);

//STORES
router.post('/addStore', addStore)
 router.get('/getAllStores', getAllStores)
router.post('/getStoresByRole', getStoresByRole)
router.get('/getOneStore/:id', getOneStore)
router.put('/updateStore/:id', updateStore)
// router.get('/:roleName/stores', getStoresByRole);


//PROMOS
router.post('/promocodes',addPromo )
router.get('/promocodes',allDiscounts )
router.get('/promocodes/:code',handleApplyDiscount )
router.delete('/deletepromocodes/:id', deletePromo)
// reste a faire : lister une promo, supprimer une promo

//STOCKS
router.get('/allStocks', getAllStocks)
router.get('/getStockByProduct/:productId', getStockByProduct)
router.put('/getUpdateStockAntigaspi', getUpdateStockAntigaspi)

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
router.get('/productsInFormule/:id/', productsWithFormuleForOrder);
router.get('/ordersOfUserWithProducts/:userId', ordersOfUserWithProducts);
router.get('/statusLastOrder/:userId', statusLastOrder)

//router.post('/createOrderAndPayment')

//PAYMENTS
router.post('/checkout_session', createSession )
router.get('/success', success)
router.get('/paiementStatus', paiementStatus)
router.post('/createPaiement', createPaiement) //paiement sur place, seuleulement le paiement ici

//EMAILS
router.post('/sendWelcomeEmail', sendWelcomeEmail)
router.post('/confirmOrder', confirmOrder)
router.post('/orderStatusReady', orderStatusReady)



module.exports = router