const { DataTypes } = require('sequelize')
const db = require('../../db/db')
require('dotenv').config();


const Products = db.define('Products', {
    
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    id_famille_produit: {
        //foreign key
        type: DataTypes.INTEGER,
    },
    id_marque: {
        //foreign key
        type: DataTypes.INTEGER,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    prix_unitaire:{
      //donne un string - penser à 
      //convertir en nombre si utilisé dans le code
        type: DataTypes.DECIMAL(10,2),
        allowNull:false,
    },
    prix_formule: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    formuleId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    prix_remise_collaborateur: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    prix_remise_client: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull:true,
    },
    categorie:{
      type: DataTypes.STRING,
      allowNull:true,
    },
    type_produit: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    type_assemblage: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    menu_avec_remise: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    poids_net: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    poids_brut: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    commercialise: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    vente_a_distance: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    elligible_titre_repas: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    bio: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    gere_a_lentrepot: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    reference_fournisseur: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    produit_a_peser: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
    },
    jours_dlc: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    domaine: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    millesime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    chateau: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    cuvee: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    appellation: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    id_rayon: {
        //foreign key
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    libelle_rayon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    allergenes: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_derniere_mise_a_jour: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    disponibilite: {
        type: DataTypes.BOOLEAN,
        allowNull: false, 
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cuisson: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    offre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    clickandcollect: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
    },
    antigaspi: {
        type: DataTypes.BOOLEAN,
        allowNull: true, 
    },
    stockantigaspi: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
})


// relation
// a rajouter
// Un produit (Products) peut être inclus dans plusieurs commandes (Orders) via la table OrderProducts.


//MODIFIER ICI
Products.associate = function(models) {
    Products.belongsToMany(models.Orders, {
      through: 'OrdersProducts',
      foreignKey: 'productId',
      otherKey: 'orderId'
    });
  };

  


module.exports = Products

