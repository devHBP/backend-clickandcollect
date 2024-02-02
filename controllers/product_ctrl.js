//appel du model
const StocksTest = require("../models/BDD/Stocks.js");
const Products = require("../models/BDD/Produits.js");
const TableOrderProduct = require("../models/BDD/Orderproducts.js");
const FamillyProducts = require("../models/BDD/Familles.js");
const ProductDetail = require("../models/BDD/ProductDetails.js");
const Formule = require("../models/BDD/Formules.js");
const FormuleProduct = require("../models/BDD/FormuleProduct.js");
const db = require("../db/db.js");
const fs = require("fs");

//import multer
const multer = require("multer");
const path = require("path");

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
    const familleProduit = await FamillyProducts.findOne({
      where: { nom_famille_produit: req.body.categorie },
    });

    // Vérifier si la famille de produits existe
    if (!familleProduit) {
      return res.status(400).json({ error: "Famille de produit non trouvée" });
    }

    const allergenes = req.body.allergenes === '' ? null : req.body.allergenes;

    let product = {
      // Vérifier si req.file existe et contient les informations sur le fichier
      image: req.file ? req.file.path : "",
      libelle: req.body.libelle,
      prix_unitaire: req.body.prix_unitaire,
      categorie: req.body.categorie,
      description: req.body.description,
      prix_remise_collaborateur: req.body.prix_remise_collaborateur,
      disponibilite: req.body.disponibilite,
      stock: req.body.stock,
      id_famille_produit: familleProduit.id_famille_produit, // Utiliser l'ID de la famille de produits trouvée
      offre: req.body.offre,
      reference_fournisseur: req.body.reference_fournisseur,
      clickandcollect: req.body.clickandcollect,
      antigaspi: req.body.antigaspi,
      stockantigaspi: req.body.stockantigaspi,
      allergenes: allergenes
    };
    // console.log('product', product)

    const createdProduct = await Products.create(product);

    console.log("createdProduct", createdProduct);

    const productId = createdProduct.productId; // Récupérer l'ID du produit créé

    const productStock = await StocksTest.create({
      productId: productId,
      quantite: product.stock,
    });
    console.log("productStock", productStock);

    //console.log(createdProduct);
    // console.log(productStock);

    //table produtDetails
    let productDetails = {
      productId: createdProduct.productId,
      descriptionProduit: req.body.descriptionProduit,
      ingredients: req.body.ingredients,
    };
    console.log("req body", req.body);
    console.log("productDetails", productDetails);
    const createdProductDetails = await ProductDetail.create(productDetails);

    res
      .status(201)
      .json({ msg: "produit créé", createdProduct, createdProductDetails });
  } catch (error) {
    console.error("erreur", error);
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
  console.log('req file', req.file)
  // Convertissez les chaînes vides en null pour les champs allergenes / ingredients
  if (updates.allergenes === "") {
    updates.allergenes = null;
  }
  if (updates.ingredients === "") {
    updates.descriptionProduit = null;
  }

  try {
    const product = await Products.findOne({ where: { productId: productId } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Vérification du téléchargement d'une nouvelle image
    if (req.file) {
      // Si une ancienne image existe et est présente sur le disque, la supprimer
      if (product.image && fs.existsSync(product.image)) {
        fs.unlinkSync(product.image);
        console.log("Ancienne image supprimée");
      }

      // Ajout du nouveau chemin de l'image au produit
      product.image = req.file.path;
    }

    // Si une nouvelle catégorie est spécifiée, vérifiez qu'elle correspond à la famille de produits
    if (updates.categorie) {
      const familleProduit = await FamillyProducts.findOne({
        where: { nom_famille_produit: updates.categorie },
      });

      // Vérifier si la famille de produits existe
      if (!familleProduit) {
        return res
          .status(400)
          .json({ error: "Famille de produit non trouvée" });
      }

      // Mettre à jour l'ID de la famille de produits
      updates.id_famille_produit = familleProduit.id_famille_produit;
    }



    // Mettez à jour uniquement les champs spécifiés dans les mises à jour
    // await Products.update(updates, { where: { productId: productId } });
    await Products.update({
      ...updates,
      // Ne mettez à jour l'image que si un nouveau fichier a été téléchargé
      ...(req.file && { image: req.file.path }),
    }, {
      where: { productId: productId }
    });
    await product.save();

    // Mise à jour des détails du produit
    const productDetails = await ProductDetail.findOne({
      where: { productId: productId },
    });
    if (productDetails) {
      // Si les détails du produit existent, mettez-les à jour
      await ProductDetail.update(
        {
          descriptionProduit: req.body.descriptionProduit,
          ingredients: req.body.ingredients,
        },
        { where: { productId: productId } }
      );
    } else {
      // Sinon, créez une nouvelle entrée dans la table ProductDetail
      await ProductDetail.create({
        productId: productId,
        descriptionProduit: req.body.descriptionProduit,
        ingredients: req.body.ingredients,
      });
    }

    const response = {
      msg: "Product updated successfully",
      image: req.file ? req.file.path : product.image,
      // image: req.file.path,
      // ...(req.file && { image: req.file.path }), // Inclure l'image seulement si elle est présente
    };
    return res.status(200).json(response);

    // return res.status(200).json({
    //   msg: 'Product updated successfully',
    //   image: req.file.path
    // });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update product" });
  }
};

//clickandcollect et antigaspi
// Dans votre fichier de contrôleurs (par exemple, productController.js)

const updateStatusProduct = async (req, res) => {
  const productId = req.params.id;
  const updates = req.body;

  try {
    // Trouver le produit par ID
    const product = await Products.findOne({ where: { productId: productId } });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Mettez à jour uniquement les champs spécifiés dans les mises à jour
    await Products.update(updates, { where: { productId: productId } });
    await product.save();

    // Renvoyer une réponse de succès
    res.status(200).json({ msg: "Product status updated successfully" });
  } catch (error) {
    // Gérer les erreurs potentielles
    res.status(500).json({ error: "Failed to update product status" });
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
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    const productDetails = await ProductDetail.findAll();

    // Combiner les produits et leurs détails
    const combined = products.map((product) => {
      const details = productDetails.find(
        (detail) => detail.productId === product.productId
      );
      return {
        ...product.dataValues,
        descriptionProduit: details ? details.descriptionProduit : null,
        ingredients: details ? details.ingredients : null,
      };
    });
    // console.log("combined", combined)

    res.status(200).json(combined);
  } catch (error) {
    // console.log("combined", combined)
    res.status(500).json(error);
  }
};
const getAllProductsClickandCollect = async (req, res) => {
  try {
    // Récupérer tous les produits où clickandcollect est vrai
    const products = await Products.findAll({
      where: {
        clickandcollect: true,
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    // Récupérer tous les détails des produits
    const productDetails = await ProductDetail.findAll();

    // Combiner les produits et leurs détails
    const combined = products.map((product) => {
      const details = productDetails.find(
        (detail) => detail.productId === product.productId
      );
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
// const getOneProduct =  ( req, res) => {
//     const { id } = req.params
//     Products.findByPk(id)
//         .then( product => {
//             if(!product) return res.status(404).json({msg:"product not found"})
//             res.status(200).json(product)
//         })
//         .catch(error => res.statut(500).json(error))
// }
const getOneProduct = (req, res) => {
  const { id } = req.params;

  // Récupérez le produit par son ID
  Products.findByPk(id)
    .then((product) => {
      if (!product) return res.status(404).json({ msg: "product not found" });

      // Récupérez les détails du produit
      ProductDetail.findOne({ where: { productId: product.productId } })
        .then((detail) => {
          // Si les détails existent, combinez-les avec le produit
          if (detail) {
            res.status(200).json({
              ...product.dataValues,
              descriptionProduit: detail.descriptionProduit,
              ingredients: detail.ingredients,
            });
          } else {
            res.status(200).json(product);
          }
        })
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};

//lister les produits d'une catégorie
const getProductsofOneCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Products.findAll({
      where: { categorie: category },
    });
    res.json(products);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la récupération des produits par catégorie:",
      error
    );
    res
      .status(500)
      .json({
        message:
          "Une erreur s'est produite lors de la récupération des produits par catégorie",
      });
  }
};

//upload une image
const storage = multer.diskStorage({
  //where  the image will go
  destination: (req, file, cb) => {
    //callback func
    cb(null, "Images");
    // format
    //25/05/2023.png
  },
  //the name
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

//upload one single image
const uploadImage = multer({
  storage: storage,
  limits: { fileSize: "10000000" }, //10Mb pour une photo
  fileFilter: (req, file, cb) => {
    //types de fichier acceptés
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extname) {
      return cb(null, true);
    }
    cb(`Mauvais format d'image`);
  },
}).single("image");
//pour plusieurs images
// .array('images', 3) ici 3 nombre d'images

//"supprimer" - rendre indisponible un produit
const desactiveProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Products.findByPk(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Désactiver le produit
    await product.update({ disponibilite: false });
    await product.save();

    return res.status(200).json({ msg: "Product disabled successfully" });
  } catch (error) {
    console.error("Error:", error); // Ajout de log d'erreur
    return res.status(500).json({ error: "Failed to disable product" });
  }
};

//supprimer un produit
// A NE PAS FAIRE POUR RAISONS DE SECURITE = PLUTOT DESACTIVER UN PRODUIT
  const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
      const product = await Products.findByPk(productId);

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Supprimer les associations avec les commandes
      await TableOrderProduct.destroy({ where: { productId: productId } });

      // Supprimer le stock associé
      const stock = await StocksTest.findOne({ where: { productId: productId } });
      if (stock) {
        await stock.destroy();
      }

      // Supprimer le produit
      await ProductDetail.destroy({ where: { productId: productId } });
      await product.destroy();

      return res.status(200).json({ msg: 'Product and associated entries deleted successfully' });
    } catch (error) {
      console.error('Error:', error);  // Ajout de log d'erreur
      return res.status(500).json({ error: 'Failed to delete product and associated entries' });
    }
};

//diminuer un stock
const decreaseProductStock = async (req, res) => {
  const { id } = req.params;
  const { decreaseAmount } = req.body;

  try {
    const stock = await StocksTest.findOne({ where: { productId: id } });
    const product = await Products.findOne({ where: { productId: id } });

    if (!stock || !product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (stock.quantite < decreaseAmount) {
      return res.status(400).json({ error: "Not enough stock" });
    }

    stock.quantite -= Number(decreaseAmount);
    product.stock -= Number(decreaseAmount);

    await stock.save();
    await product.save();

    res.status(200).json({ msg: "Stock decreased successfully", stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const increaseProductStock = async (req, res) => {
  const { id } = req.params;
  const { increaseAmount } = req.body;

  try {
    const stock = await StocksTest.findOne({ where: { productId: id } });
    const product = await Products.findOne({ where: { productId: id } });

    if (!stock || !product) {
      return res.status(404).json({ error: "Product not found" });
    }

    stock.quantite += Number(increaseAmount);
    product.stock += Number(increaseAmount);

    await stock.save();
    await product.save();

    res.status(200).json({ msg: "Stock increased successfully", stock });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//connaitre la famille - categorie
const getFamillyOfProduct = (req, res) => {
  const { id } = req.params;
  Products.findByPk(id, {
    attributes: ["id_famille_produit"],
    include: [
      {
        model: FamillyProducts,
        attributes: ["nom_famille_produit"],
      },
    ],
  })
    .then((product) => {
      if (!product) return res.status(404).json({ msg: "product not found" });
      // The response will contain id_famille_produit and the associated nom_famille_produit.
      res.status(200).json(product);
    })
    .catch((error) => res.status(500).json(error));
};

//creation formule
const createFormule = async (req, res) => {
  try {
    const formuleData = req.body;
    const formule = await Formule.create(formuleData);
    console.log("review", formuleData);
    res
      .status(201)
      .json({ message: "Formule enregistrée avec succès.", formule });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la Formule" });
  }
};
//toutes les formules
const getAllFormules = (req, res) => {
  Formule.findAll({
    attributes: { exclude: ["createdAt", "updatedAt"] },
  })
    .then((formule) => {
      res.status(200).json(formule);
    })
    .catch((error) => res.statut(500).json(error));
};

//créer la liste des desserts pour les formules
const addDessertIds = async (req, res) => {
  try {
    const { ids: newIds } = req.body;

    // Convertir les ids en chaîne
    const newIdsString = newIds.join(",");

    // Vérifier si un enregistrement existe
    let record = await FormuleProduct.findOne();

    if (record) {
      // Mettre à jour l'enregistrement existant
      record.dessert = newIdsString;
      await record.save();
    } else {
      // Créer un nouvel enregistrement
      await FormuleProduct.create({ dessert: newIdsString });
    }

    res.status(200).json(newIds);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

//afficher la liste des desserts
const getDessertIds = async (req, res) => {
  try {
    // Ici, j'assume que vous avez un seul enregistrement pour les desserts. Si ce n'est pas le cas, ajustez en conséquence
    const record = await FormuleProduct.findOne();

    if (!record) {
      return res.status(404).json({ message: "Pas d'IDs trouvés" });
    }

    // Convertissez la chaîne en tableau
    const idsArray = record.dessert.split(",").map(Number);

    res.json(idsArray);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

//reset la liste
const resetDessertIds = async (req, res) => {
  try {
    // Ici, j'assume que vous mettez à jour un enregistrement existant. Si ce n'est pas le cas, ajustez en conséquence
    const record = await FormuleProduct.findOne();

    if (!record) {
      return res
        .status(404)
        .json({ message: "Pas d'IDs trouvés à réinitialiser" });
    }

    record.dessert = "";
    await record.save();

    res
      .status(200)
      .json({ message: "La liste des desserts a été réinitialisée." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

//créer la liste des boissons pour les formules
const addBoissonIds = async (req, res) => {
  try {
    const { ids: newIds } = req.body;

    // Convertir les ids en chaîne
    const newIdsString = newIds.join(",");

    // Vérifier si un enregistrement existe
    let record = await FormuleProduct.findOne();

    if (record) {
      // Mettre à jour l'enregistrement existant
      record.boisson = newIdsString;
      await record.save();
    } else {
      // Créer un nouvel enregistrement
      await FormuleProduct.create({ boisson: newIdsString });
    }

    res.status(200).json(newIds);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

//afficher la liste des desserts
const getBoissonIds = async (req, res) => {
  const record = await FormuleProduct.findOne();

  if (!record) {
    return res.status(404).json({ message: "Pas d'IDs trouvés" });
  }

  // Convertissez la chaîne en tableau
  const idsArray = record.boisson.split(",").map(Number);

  res.json(idsArray);
};

//reset la liste
const resetBoissonIds = async (req, res) => {
  try {
    // Ici, j'assume que vous mettez à jour un enregistrement existant. Si ce n'est pas le cas, ajustez en conséquence
    const record = await FormuleProduct.findOne();

    if (!record) {
      return res
        .status(404)
        .json({ message: "Pas d'IDs trouvés à réinitialiser" });
    }

    record.boisson = "";
    await record.save();

    res
      .status(200)
      .json({ message: "La liste des desserts a été réinitialisée." });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getOneProduct,
  uploadImage,
  getAllProductsClickandCollect,
  addDessertIds,
  getDessertIds,
  resetDessertIds,
  addBoissonIds,
  getBoissonIds,
  resetBoissonIds,
  updateProduct,
  deleteProduct,
  desactiveProduct,
  decreaseProductStock,
  increaseProductStock,
  getProductsofOneCategory,
  getFamillyOfProduct,
  createFormule,
  getAllFormules,
  updateStatusProduct,
};
