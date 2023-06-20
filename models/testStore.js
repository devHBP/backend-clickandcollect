const { DataTypes } = require('sequelize')
const db = require('../db/db')
// const TestOrder = require('./testOrder')

const TestStore = db.define('Magasins', {
      id_magasin: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        //pdj001 par exemple
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
      
})

TestStore.beforeValidate((store, options) => {
  if (!store.reference_magasin) {
    let lastStoreId;
    return Store.max('id_magasin')
      .then((maxId) => {
        lastStoreId = maxId || 0;
        const reference_magasin = `pdj_00${lastStoreId + 1}`;
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

/**
 * TestStore.hasMany(TestOrder, { foreignKey: 'id_magasin' }); //storeId (id)
 */



module.exports = TestStore