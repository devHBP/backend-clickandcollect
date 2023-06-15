//appel du model
const Product = require('../models/testProduct.js')

//import multer
const multer = require('multer')
const path = require('path')

//creation des routes

//créer un produit
const addProduct = async (req, res) => {
try {


    let produit = {
        //verifier infos
        // a completer avec tous les champs
        image: req.file.path,
        // image: req.files.path for multiple images
        libelle: req.body.libelle,
        prix: req.body.prix,
        categorie: req.body.categorie,
        description: req.body.description,
    }

    const product = await Product.create(produit)

    const produits = await Product.findAll()

    res.status(201).json({ msg: "produit créé", produits: produits })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })

}
}

//modifier un produit
const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updates = req.body;
  
    try {
      const product = await Product.findOne({ where: { id_produit: productId } });
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Mettez à jour uniquement les champs spécifiés dans les mises à jour
      await Product.update(updates, { where: { id_produit: productId } });
      console.log(product)
      return res.status(200).json({ msg: 'Product updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update product' });
    }
  };
  



//lister tous les produits
const getAllProducts = (req, res) =>
    {
        Product.findAll({
            attributes : {exclude: ['createdAt', 'updatedAt']}
        })
        .then((products) => {
            res.status(200).json(products)
            
        })
        .catch(error => res.statut(500).json(error))
    }

//lister un produit par id
const getOneProduct = ( req, res) => {
    const { id } = req.params
    //findbyprimarykey
    User.findByPk(id)
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
      const product = await Product.findByPk(productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      await product.destroy();
      return res.status(200).json({ msg: 'Product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete product' });
    }
  };
  

module.exports = { addProduct, getAllProducts, getOneProduct, uploadImage, updateProduct, deleteProduct}