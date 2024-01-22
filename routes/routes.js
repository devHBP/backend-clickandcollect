const Router = require('express')
const { signup, getAll, getOne, login, updateOneUser, updateRole, verifyToken, verifyHeader, modifyUser, deleteUser, getEmailByUserId, getUserByEmail, getInfoAlimentaire } = require('../controllers/ctrl')
const { forgotPassword, resetPassword , updatePassword} = require('../controllers/emails/pwd_ctrl')
const { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct, desactiveProduct, decreaseProductStock, increaseProductStock, getProductsofOneCategory,
     getFamillyOfProduct, createFormule, getAllFormules, getAllProductsClickandCollect, addDessertIds, getDessertIds, resetDessertIds, addBoissonIds, getBoissonIds,resetBoissonIds,updateStatusProduct } = require('../controllers/product_ctrl')
const { addFamillyProduct, getAllFamillyProducts, getOneFamillyProduct, deleteFamillyProduct } = require('../controllers/famille_produits_ctrl')
const { addStore, getAllStores, getOneStore, updateStore, getStoresByRole } = require('../controllers/stores_ctrl')
const {addPromo, handleApplyDiscount, allDiscounts, deletePromo } = require('../controllers/promo_ctrl')
const { getAllStocks, getStockByProduct, getUpdateStockAntigaspi, checkStockAntiGaspi , getUpdateStock, getAddStockAntigaspi, verifStockAntiGaspi} = require('../controllers/stock_ctrl')
const { createSession, success, paiementStatus, createPaiement, cancel , back } = require('../controllers/payment_ctrl')

const { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder,getOrderProducts , cancelOrder , 
    productsWithFormuleForOrder, ordersOfUserWithProducts, createReview, getAllReviews, statusLastOrder, tableOrderProduct, updateViewStatus } = require('../controllers/order_ctrl')
const {sendWelcomeEmail } = require('../controllers/emails/welcomeEmail')
const {confirmOrder } = require('../controllers/emails/confirmOrder')
const {orderStatusReady } = require('../controllers/emails/orderStatusReady')
const {feedback} = require('../controllers/emails/feedback')
const { verify } = require('jsonwebtoken')
const  { saveToken, deleteToken } = require('../controllers/token')
const  { versionApp, status } = require('../controllers/version')
const  { updateOrderPaidStatus } = require('../controllers/order_paid')
const  { getEmailInvite, getPsswInvite } = require('../controllers/config')

const router = Router()


//USERS
router.post('/signup', signup)
router.post('/login', login)
router.get('/getAll', getAll)
router.get('/getOne/:id', verifyHeader, getOne)
router.put('/updateOneUser/:id',  updateOneUser)
router.put('/updateRole/:id',  updateRole)
router.get('/verifyToken', verifyToken)
router.patch('/modifyUser/:userId', verifyToken, modifyUser)
router.delete('/deleteUser/:id', verifyToken,  deleteUser)
router.get('/getEmailByUserId/:userId/email', getEmailByUserId)
router.get('/getUserByEmail/:email',  getUserByEmail);
router.get('/getInfoAlimentaire/:id',  getInfoAlimentaire);
// router.delete('/deleteOne/:id', deleteOne)
// router.post('/refreshToken', refreshToken)

//PASSWORD
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:token', resetPassword);
router.put('/updatePassword',verifyToken, updatePassword)

//PRODUCTS
router.post('/addProduct',uploadImage, addProduct)
router.get('/getAllProducts',getAllProducts)
router.get('/getAllProductsClickandCollect',getAllProductsClickandCollect)
router.get('/getOneProduct/:id', getOneProduct)
// router.put('/updateProduct/:id', updateProduct);
router.put('/updateProduct/:id', uploadImage, updateProduct);
router.patch('/updateProduct/:id', updateProduct);
router.put('/updateStatusProduct/:id', updateStatusProduct);
router.delete('/deleteProduct/:id', deleteProduct); 
router.delete('/desactiveProduct/:id', desactiveProduct);
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
// router.post('/handleApplyDiscount', handleApplyDiscount);

// reste a faire : lister une promo, supprimer une promo

//STOCKS
router.get('/allStocks', getAllStocks)
router.get('/getStockByProduct/:productId', getStockByProduct)
router.put('/getUpdateStockAntigaspi', getUpdateStockAntigaspi) 
router.put('/getAddStockAntigaspi', getAddStockAntigaspi)
router.put('/getUpdateStock', getUpdateStock)
router.post('/checkStockAntiGaspi', checkStockAntiGaspi)
router.get('/verifStockAntiGaspi/:productId', verifStockAntiGaspi)
//ORDERS
router.post('/createorder',createOrder ) // paiement sur place, seulement la commande ici
router.put('/updateStatusOrder/:orderId', updateStatusOrder)
router.get('/allOrders', allOrders)
router.delete('/deleteOneOrder/:id', deleteOneOrder)
router.get('/ordersOfUser/:userId', ordersOfUser)
router.post('/updateOrder', updateOrder) //update paymentId if order paid 
router.get('/getOrderProducts/:orderId', getOrderProducts) //products of order
router.post('/cancelOrder', cancelOrder)
router.get('/productsInFormule/:id/', productsWithFormuleForOrder);
router.get('/ordersOfUserWithProducts/:userId',verifyToken,  ordersOfUserWithProducts);
router.get('/statusLastOrder/:userId', statusLastOrder)
router.get('/tableOrderProduct', tableOrderProduct)
router.put('/updateViewStatus/:orderId',updateViewStatus )
router.patch('/updateOrderPaidStatus', updateOrderPaidStatus);
// router.put('/updateStatus/:orderId', updateStatus) //routes pour websocket
//router.post('/createOrderAndPayment')

//PAYMENTS
router.post('/checkout_session', createSession )
router.get('/success', success)
router.get('/cancel', cancel)
router.get('/back', back)
router.get('/paiementStatus', paiementStatus)
router.post('/createPaiement', createPaiement) //paiement sur place, seuleulement le paiement ici
//router.post('/stripeWebhook', stripeWebhook)

//EMAILS
router.post('/sendWelcomeEmail', sendWelcomeEmail)
router.post('/confirmOrder', confirmOrder)
router.post('/orderStatusReady', orderStatusReady)
router.post('/feedback', feedback)

//TOKEN
router.post('/saveToken', saveToken)
router.delete('/deleteToken/:tokenId', deleteToken)

//VERSION
router.get('/versionApp',versionApp )
router.get('/status', status)
router.get('/getEmailInvite',getEmailInvite )
router.get('/getPsswInvite',getPsswInvite )
module.exports = router