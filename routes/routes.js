const Router = require('express')
const { signup, getAll, getOne, deleteOne, login, updateOneUser, updateRole } = require('../controllers/ctrl')
const { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct, decreaseProductStock, increaseProductStock } = require('../controllers/product_ctrl')
const { addStore, getAllStores, getOneStore } = require('../controllers/stores_ctrl')
const {addPromo, handleApplyDiscount, allDiscounts, deletePromo } = require('../controllers/promo_ctrl')
const { getAllStocks } = require('../controllers/stock_ctrl')
const { createSession, success, paiementStatus, createPaiement } = require('../controllers/payment_ctrl')
const router = Router()


//USERS
router.post('/signup', signup)
router.post('/login', login)
router.get('/getAll', getAll)
router.get('/getOne/:id', getOne)
router.delete('/deleteOne/:id', deleteOne)
router.put('/updateOneUser/:id', updateOneUser)
router.put('/updateRole/:id', updateRole)

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

//ORDERS

//PAYMENTS
router.post('/checkout_session', createSession )
router.get('/success', success)
router.get('/paiementStatus', paiementStatus)
router.post('/createPaiement', createPaiement)


module.exports = router