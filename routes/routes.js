const Router = require('express')
const { signup, getAll, getOne, login, updateOneUser, updateRole, verifyToken, verifyHeader, modifyUser, getEmailByUserId, getUserByEmail, getInfoAlimentaire, addListePref , getListePref, getInfoPrefCommande, addListeAllergie,
    getListeAllergie, deleteUserOrAnonymize} = require('../controllers/ctrl')
const { forgotPassword, resetPassword , updatePassword} = require('../controllers/emails/pwd_ctrl')
const { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct, desactiveProduct, decreaseProductStock, increaseProductStock, getProductsofOneCategory,
     getFamillyOfProduct, createFormule, getAllFormules, getAllProductsClickandCollect, addDessertIds, getDessertIds, resetDessertIds, addBoissonIds, getBoissonIds,resetBoissonIds,updateStatusProduct,
     getProductsSolanid, getOneProductForNewCartString, getLibelleProduct } = require('../controllers/product_ctrl')
const { addFamillyProduct, getAllFamillyProducts, getOneFamillyProduct, deleteFamillyProduct } = require('../controllers/famille_produits_ctrl')
const { addStore, getAllStores, getOneStore, updateStore, getStoresByRole, getStores, getOneStoreName } = require('../controllers/stores_ctrl')
const {addPromo, handleApplyDiscount, allDiscounts, deletePromo, updateStatusPromo } = require('../controllers/promo_ctrl')
const { getAllStocks, getStockByProduct, getUpdateStockAntigaspi, checkStockAntiGaspi , getUpdateStock, getAddStockAntigaspi, verifStockAntiGaspi, getAddStock} = require('../controllers/stock_ctrl')
const { createSession, success, paiementStatus, createPaiement, cancel , back, stripeWebhook } = require('../controllers/payment_ctrl')
const { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder,getOrderProducts , cancelOrder , 
    productsWithFormuleForOrder, ordersOfUserWithProducts, createReview, getAllReviews, statusLastOrder, tableOrderProduct, updateViewStatus, ordersInWebApp, ordersInWaiting, ordersByDate, updateOrderContent } = require('../controllers/order_ctrl')
const {sendWelcomeEmail } = require('../controllers/emails/welcomeEmail')
const {confirmOrder } = require('../controllers/emails/confirmOrder')
const {orderStatusReady } = require('../controllers/emails/orderStatusReady')
const {refundArticle } = require('../controllers/emails/refundArticle')
const {feedback} = require('../controllers/emails/feedback')
const { verify } = require('jsonwebtoken')
const  { saveToken, deleteToken } = require('../controllers/token')
const  { versionApp, status, checkAntiGaspi, updateVersion, getUserVersion } = require('../controllers/version')
const  { updateOrderPaidStatus } = require('../controllers/order_paid')
const  { getEmailInvite, getPsswInvite } = require('../controllers/config')
const  { getTotalSales, getSalesToday, getSalesMonth, getSalesWeek, getSalesByDate, getOrderToday, getOrderWeek, getOrderMonth, getTotalOrders, getOrdersByDate, calculateAverageBasket, getTopSoldProducts} = require('../controllers/dashboard_webapp')
const  { createCart, addCartItems, getCart } = require('../controllers/cart')
const  { sendConfirmLink, receiveSunConnection, getStatusSun, sendCancelLink, sendConnexionRequest , receiveConfirmationFromSun} = require('../controllers/connect_sun')


const router = Router()

//USERSreceiveSunConnection
router.post('/signup', signup)
router.post('/login', login)
router.get('/getAll', getAll)
router.get('/getOne/:id', verifyHeader, getOne)
router.put('/updateOneUser/:id',  updateOneUser)
router.put('/updateRole/:id',  updateRole)
router.get('/verifyToken', verifyToken)
router.patch('/modifyUser/:userId', verifyToken, modifyUser)
router.get('/getEmailByUserId/:userId/email', getEmailByUserId)
router.get('/getUserByEmail/:email',  getUserByEmail);
router.get('/getInfoAlimentaire/:id',  getInfoAlimentaire);
router.post('/addListePref', addListePref)
router.get('/getListePref', getListePref);
router.get('/getInfoPrefCommande/:id', getInfoPrefCommande)
router.post('/addListeAllergie', addListeAllergie)
router.get('/getListeAllergie', getListeAllergie);
router.post('/deleteUserOrAnonymize/:userId', verifyToken, deleteUserOrAnonymize)
// router.delete('/deleteOne/:id', deleteOne)
// router.post('/refreshToken', refreshToken)
// router.delete('/deleteUser/:id', verifyToken,  deleteUser)

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
router.get('/getProductsSolanid',getProductsSolanid)
router.get('/getOneProductForNewCartString/:id', getOneProductForNewCartString)
router.get('/getLibelleProduct', getLibelleProduct)

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
router.get('/getOneStoreName/:id', getOneStoreName)
router.put('/updateStore/:id', updateStore)
router.get('/getStores', getStores)

// router.get('/:roleName/stores', getStoresByRole);

//PROMOS
router.post('/promocodes',addPromo )
router.get('/promocodes',allDiscounts )
router.get('/promocodes/:code',handleApplyDiscount )
router.delete('/deletepromocodes/:id', deletePromo)
router.post('/handleApplyDiscount', handleApplyDiscount);
router.put('/updateStatusPromo',updateStatusPromo )

// reste a faire : lister une promo, supprimer une promo

//STOCKS
router.get('/allStocks', getAllStocks)
router.get('/getStockByProduct/:productId', getStockByProduct)
router.put('/getUpdateStockAntigaspi', getUpdateStockAntigaspi) 
router.put('/getAddStockAntigaspi', getAddStockAntigaspi)
router.put('/getUpdateStock', getUpdateStock)
router.put('/getAddStock', getAddStock)
router.post('/checkStockAntiGaspi', checkStockAntiGaspi)
router.get('/verifStockAntiGaspi/:productId', verifStockAntiGaspi)

//ORDERS
router.post('/createorder',createOrder ) // paiement sur place, seulement la commande ici
router.put('/updateStatusOrder/:orderId', updateStatusOrder)
router.get('/allOrders', allOrders)
router.get('/ordersByDate', ordersByDate)
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
router.get('/getAllProducts',getAllProducts)
router.get('/ordersInWebApp',ordersInWebApp)
router.get('/ordersInWaiting',ordersInWaiting)
router.put('/updateOrderContent', updateOrderContent);
// router.put('/updateStatus/:orderId', updateStatus) //routes pour websocket
//router.post('/createOrderAndPayment')

//PAYMENTS
router.post('/checkout_session', createSession )
router.get('/success', success)
router.get('/cancel', cancel)
router.get('/back', back)
router.get('/paiementStatus', paiementStatus)
router.post('/createPaiement', createPaiement) //paiement sur place, seuleulement le paiement ici
// ne pas utiliser ici - voir app.js
//router.post('/webhook', Router.raw({type: 'application/json'}), stripeWebhook)

//EMAILS
router.post('/sendWelcomeEmail', sendWelcomeEmail)
router.post('/confirmOrder', confirmOrder)
router.post('/orderStatusReady', orderStatusReady)
router.post('/feedback', feedback)
router.post('/refundArticle', refundArticle)

//TOKEN
router.post('/saveToken', saveToken)
router.delete('/deleteToken/:tokenId', deleteToken)

//VERSION
router.get('/versionApp',versionApp )
router.get('/status', status)
router.get('/getEmailInvite',getEmailInvite )
router.get('/getPsswInvite',getPsswInvite )
router.get('/checkAntiGaspi', checkAntiGaspi)
router.post('/updateVersion', updateVersion )
router.get('/getUserVersion', getUserVersion )

//DASHBOARD WEBAPP
router.get('/getTotalSales', getTotalSales)
router.get('/getSalesToday', getSalesToday)
router.get('/getSalesMonth', getSalesMonth)
router.get('/getSalesWeek', getSalesWeek)
router.get('/getSalesByDate/:date', getSalesByDate);
router.get('/getOrderToday', getOrderToday);
router.get('/getOrderWeek', getOrderWeek);
router.get('/getOrderMonth', getOrderMonth);
router.get('/getTotalOrders', getTotalOrders);
router.get('/getOrdersByDate/:date', getOrdersByDate);
router.get('/calculateAverageBasket', calculateAverageBasket);
router.get('/getTopSoldProducts', getTopSoldProducts);

// PANIER BACKEND
router.post('/createCart', createCart)
router.post('/addCartItems', addCartItems)
router.get('/getCart/:cartId', getCart)

//CONNEXION SUN -> PDJ
router.post('/sendConfirmLink', sendConfirmLink)
router.post('/receiveSunConnection', receiveSunConnection)
router.get('/getStatusSun/:userId',getStatusSun)
router.post('/sendCancelLink', sendCancelLink)
// CONNEXION PDJ -> SUN
router.post('/sendConnexionRequest', sendConnexionRequest)
router.post('/receiveConfirmationFromSun', receiveConfirmationFromSun)
module.exports = router