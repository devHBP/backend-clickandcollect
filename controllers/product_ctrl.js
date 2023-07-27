//appel du model
const StocksTest = require('../models/TestBDD/Stocks.js')
const ProductsTest = require('../models/TestBDD/Products.js')
const Products = require('../models/TestBDD/_Products.js')
const OrdersProducts = require('../models/TestBDD/__orderproducts.js')
const FamillyProducts = require('../models/TestBDD/_famille.js')
const ProductDetail = require('../models/TestBDD/___productDetail.js')

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


//test categorie _ nom famille produit 
const addProduct = async (req, res) => {
  try {
    // Récupérer la famille de produits associée
    const familleProduit = await FamillyProducts.findOne({ where: { nom_famille_produit: req.body.categorie } });

    // Vérifier si la famille de produits existe
    if (!familleProduit) {
      return res.status(400).json({ error: "Famille de produit non trouvée" });
    }

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
      id_famille_produit: familleProduit.id_famille_produit, // Utiliser l'ID de la famille de produits trouvée
    };
    console.log('product', product)

    const createdProduct = await Products.create(product);

    console.log('createdProduct', createdProduct)

    const productId = createdProduct.productId; // Récupérer l'ID du produit créé

    const productStock = await StocksTest.create({
      productId: productId,
      quantite: product.stock,
    });
    console.log('productStock', productStock)

    console.log(createdProduct);
    console.log(productStock);

    //table produtDetails
    let productDetails = {
      productId: createdProduct.productId, 
      descriptionProduit: req.body.descriptionProduit,
      ingredients: req.body.ingredients,
    };
    console.log('req body', req.body)
    console.log('productDetails', productDetails)
    const createdProductDetails = await ProductDetail.create(productDetails);


    res.status(201).json({ msg: "produit créé", createdProduct, createdProductDetails });
  } catch (error) {
    console.error('erreur', error);
    res.status(500).json({ error: "Internal server error" });
  }
};



//modifier un produit
// const updateProduct = async (req, res) => {
//     const productId = req.params.id;
//     const updates = req.body;
  
//     try {
//       const product = await Products.findOne({ where: { productId: productId } });
  
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
  
//       // Mettez à jour uniquement les champs spécifiés dans les mises à jour
//       await Products.update(updates, { where: { productId: productId } });
//       console.log(product)
//       return res.status(200).json({ msg: 'Product updated successfully' });
//     } catch (error) {
//       return res.status(500).json({ error: 'Failed to update product' });
//     }
//   };
  //modifier un produit - verif categorie / nom_famille_produit
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    const product = await Products.findOne({ where: { productId: productId } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Si une nouvelle catégorie est spécifiée, vérifiez qu'elle correspond à la famille de produits
    if (updates.categorie) {
      const familleProduit = await FamillyProducts.findOne({ where: { nom_famille_produit: updates.categorie } });

      // Vérifier si la famille de produits existe
      if (!familleProduit) {
        return res.status(400).json({ error: "Famille de produit non trouvée" });
      }

      // Mettre à jour l'ID de la famille de produits
      updates.id_famille_produit = familleProduit.id_famille_produit;
    }

    // Mettez à jour uniquement les champs spécifiés dans les mises à jour
    await Products.update(updates, { where: { productId: productId } });
    console.log(product)
    return res.status(200).json({ msg: 'Product updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update product' });
  }
};




//lister tous les produits
// const getAllProducts = (req, res) =>
//     {
//       Products.findAll({
//             attributes : {exclude: ['createdAt', 'updatedAt']}
//         })
//         .then((products) => {
//             res.status(200).json(products)
            
//         })
//         .catch(error => res.status(500).json(error))
//     }

//test productdetails
    const getAllProducts = async (req, res) => {
      try {
        // Récupérer tous les produits
        const products = await Products.findAll({
          attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
    
        // Récupérer tous les détails des produits
        const productDetails = await ProductDetail.findAll();
    
        // Combiner les produits et leurs détails
        const combined = products.map(product => {
          const details = productDetails.find(detail => detail.productId === product.productId);
          return {
            ...product.dataValues,
            descriptionProduit: details ? details.descriptionProduit : null,
            ingredients: details ? details.ingredients : null,
          };
        });
    
        res.status(200).json(combined);
      } catch (error) {
        res.status(500).json(error);
      }
    };
    
//lister un produit par id
// ?? User ?
const getOneProduct =  ( req, res) => {
    const { id } = req.params
    //findbyprimarykey
    // User.findByPk
    Products.findByPk(id)
        .then( product => {
            if(!product) return res.status(404).json({msg:"product not found"})
            res.status(200).json(product)
        })
        .catch(error => res.statut(500).json(error))
}

//lister les produits d'une catégorie
const getProductsofOneCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Products.findAll({
      where: { categorie: category },
    });
    res.json(products);
  } catch (error) {
    console.error('Une erreur s\'est produite lors de la récupération des produits par catégorie:', error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des produits par catégorie' });
  }
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

//"supprimer" - rendre indisponible un produit
const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Désactiver le produit
    await product.update({ disponibilite: false });
    await product.save();

    return res.status(200).json({ msg: 'Product disabled successfully' });
  } catch (error) {
    console.error('Error:', error);  // Ajout de log d'erreur
    return res.status(500).json({ error: 'Failed to disable product' });
  }
}

//supprimer un produit
// A NE PAS FAIRE POUR RAISONS DE SECURITE = PLUTOT DESACTIVER UN PRODUIT
//   const deleteProduct = async (req, res) => {
//     const productId = req.params.id;

//     try {
//       const product = await Products.findByPk(productId);
  
//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }
  
//       // Supprimer les associations avec les commandes
//       await OrdersProducts.destroy({ where: { productId: productId } });
  
//       // Supprimer le stock associé
//       const stock = await StocksTest.findOne({ where: { productId: productId } });
//       if (stock) {
//         await stock.destroy();
//       }
  
//       // Supprimer le produit
//       await product.destroy();
  
//       return res.status(200).json({ msg: 'Product and associated entries deleted successfully' });
//     } catch (error) {
//       console.error('Error:', error);  // Ajout de log d'erreur
//       return res.status(500).json({ error: 'Failed to delete product and associated entries' });
//     }
// };




  //diminuer un stock
  const decreaseProductStock = async (req, res) => {
    const { id } = req.params;
    const { decreaseAmount } = req.body;

  try {
    const stock = await StocksTest.findOne({ where: { productId: id } });
    const product = await Products.findOne({ where: { productId: id } });

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
  const { id } = req.params;
  const { increaseAmount } = req.body;

  try {
    const stock = await StocksTest.findOne({ where: { productId: id } });
    const product = await Products.findOne({ where: { productId: id } });

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


  

module.exports = { addProduct, getAllProducts, getOneProduct, uploadImage,
updateProduct, deleteProduct, decreaseProductStock, increaseProductStock, getProductsofOneCategory}