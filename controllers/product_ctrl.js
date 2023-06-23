//appel du model
// const Product = require('../models/testProduct.js')
const TestStocksV2 = require('../models/TestBDD/__stocks.js')
const TestStocksV3 = require('../models/TestBDD/___stocks.js')
const TestProducts = require('../models/TestBDD/_products.js')
const TestProductsV2 = require('../models/TestBDD/__products.js')
const TestProductsV3 = require('../models/TestBDD/___products.js')
const TestProductsV4 = require('../models/TestBDD/_____products.js')
const TestProductsV5 = require('../models/TestBDD/______products.js')
const StocksTest = require('../models/TestBDD/Stocks.js')
const ProductsTest = require('../models/TestBDD/Products.js')


const db = require('../db/db.js')

//import multer
const multer = require('multer')
const path = require('path')

//creation des routes

//créer un produit
// const addProduct = async (req, res) => {
// try {
//     let produit = {
//         //verifier infos
//         // a completer avec tous les champs
//         image: req.file.path,
//         // image: req.files.path for multiple images
//         libelle: req.body.libelle,
//         prix_unitaire: req.body.prix_unitaire,
//         categorie: req.body.categorie,
//         description: req.body.description,
//         prix_remise_collaborateur: req.body.prix_remise_collaborateur,
//         disponibilite: req.body.disponibilite,
//         //stock: req.body.stock,
//         TestStocksV3: {
//           quantite: req.body.stock,
//           // Ajoutez ici d'autres champs nécessaires pour créer un stock
//         }
//     }

//     const product = await TestProductsV5.create(produit, {
//       include: [{ model: TestStocksV3 }]
//     })
//     console.log(product)

//     const produits = await TestProductsV5.findAll({
//       include: [{ model: TestStocksV3 }]
//     })

//     res.status(201).json({ msg: "produit créé", produits: produits })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ error: "Internal server error" })
// }
// }

const addProduct = async (req, res) => {
  try {
    let product = {
      // Vérifier si req.file existe et contient les informations sur le fichier
      image: req.file ? req.file.path : '',
      libelle: req.body.libelle,
      prix_unitaire: req.body.prix_unitaire,
      categorie: req.body.categorie,
      description: req.body.description,
      prix_remise_collaborateur: req.body.prix_remise_collaborateur,
      disponibilite: req.body.disponibilite,
      stock: req.body.stock,
    };
    console.log('product', product)

    const createdProduct = await ProductsTest.create(product);
    console.log('createdProduct', createdProduct)

    const productId = createdProduct.productId; // Récupérer l'ID du produit créé

    const productStock = await StocksTest.create({
      productId: productId,
      quantite: product.stock,
    });
    console.log('productStock', productStock)

    // const produits = await ProductsTest.findAll({
    //   include: [ {model: StocksTest, as: 'stock'} ]}
    // );
    // console.log('produits', produits)

    console.log(createdProduct);
    console.log(productStock);

    res.status(201).json({ msg: "produit créé", createdProduct });
  } catch (error) {
    console.error('erreur', error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//modifier un produit
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updates = req.body;
  
    try {
      const product = await ProductsTest.findOne({ where: { productId: productId } });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Mettez à jour uniquement les champs spécifiés dans les mises à jour
      await ProductsTest.update(updates, { where: { productId: productId } });
      console.log(product)
      return res.status(200).json({ msg: 'Product updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update product' });
    }
  };
  



//lister tous les produits
const getAllProducts = (req, res) =>
    {
      ProductsTest.findAll({
            attributes : {exclude: ['createdAt', 'updatedAt']}
        })
        .then((products) => {
            res.status(200).json(products)
            
        })
        .catch(error => res.status(500).json(error))
    }

//lister un produit par id
// ?? User ?
const getOneProduct = ( req, res) => {
    const { id } = req.params
    //findbyprimarykey
    // User.findByPk
    ProductsTest.findByPk(id)
        .then( product => {
            if(!product) return res.status(404).json({msg:"product not found"})
            res.status(200).json(product)
        })
        .catch(error => res.statut(500).json(error))
}


//upload une image
const storage = multer.diskStorage({
    //where  the image will go
    destination: (req, file, cb) => {
        //callback func
        cb(null, 'Images')
        // format
        //25/05/2023.png
    },
    //the name
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})

//upload one single image
const uploadImage = multer({
    storage: storage,
    limits: { fileSize : '10000000'}, //10Mb pour une photo
    fileFilter: (req, file, cb) => {
        //types de fichier acceptés
        const fileTypes= /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname){
            return cb(null, true)
        }
        cb(`Mauvais format d'image`)
    }
}).single('image')
//pour plusieurs images
// .array('images', 3) ici 3 nombre d'images


//supprimer un produit
  const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await ProductsTest.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Supprimer le produit
    await product.destroy();

    // Supprimer le stock associé
    const stock = await StocksTest.findOne({ where: { productId: productId } });
    if (stock) {
      await stock.destroy();
    }

    return res.status(200).json({ msg: 'Product and stock deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete product and stock' });
  }
};


  //diminuer un stock
  const decreaseProductStock = async (req, res) => {
    const { id, decreaseAmount } = req.body;

  try {
    const stock = await StocksTest.findOne({ where: { productId: id } });
    const product = await ProductsTest.findOne({ where: { productId: id } });

    if (!stock || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (stock.quantite < decreaseAmount) {
      return res.status(400).json({ error: 'Not enough stock' });
    }

    stock.quantite -= Number(decreaseAmount);
    product.stock -= Number(decreaseAmount);

    await stock.save();
    await product.save();

    res.status(200).json({ msg: 'Stock decreased successfully', stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const increaseProductStock = async (req, res) => {
  const { id, increaseAmount } = req.body;

  try {
    const stock = await StocksTest.findOne({ where: { productId: id } });
    const product = await ProductsTest.findOne({ where: { productId: id } });

    if (!stock || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    stock.quantite += Number(increaseAmount)  ;
    product.stock += Number(increaseAmount);

    await stock.save();
    await product.save();

    res.status(200).json({ msg: 'Stock increased successfully', stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

  

module.exports = { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct, decreaseProductStock, increaseProductStock}