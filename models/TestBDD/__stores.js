const { DataTypes } = require('sequelize')
const db = require('../../db/db')

const TestStoresV2 = db.define('TestStoresV2', {
      storeId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        //pdj_001 par exemple
      reference_magasin: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      nom_magasin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      adresse_magasin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cp_magasin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ville_magasin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nom_gestionnaire: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      heure_ouverture: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      heure_fermeture: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      
})

TestStoresV2.beforeValidate((store, options) => {
  if (!store.reference_magasin) {
    let lastStoreId;
    return TestStoresV2.max('storeId')
      .then((maxId) => {
        lastStoreId = maxId || 0;
        const reference_magasin = `magasin_00${lastStoreId + 1}`;
        store.reference_magasin = reference_magasin;
      })
      .catch((error) => {
        throw new Error('Erreur lors de la génération de la référence magasin');
      });
  }
});

//relation
//a rajouter
// Une commande (Orders) peut être passée dans un magasin (Stores).

 // TestStores.hasMany(TestOrders, { foreignKey: 'storeId' }); 

module.exports = TestStoresV2