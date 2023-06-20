//penser à enlever commentaire dans modèle

//const TestStore = require('../models/testStore.js')
//const TestStores = require('../models/TestBDD/_stores')
const TestStoresV2 = require('../models/TestBDD/__stores')


//Créer un magasin
const addStore = async (req, res ) => {
    try {

        let magasin = {
            //verifier infos
            nom_magasin: req.body.nom_magasin,
            adresse_magasin: req.body.adresse_magasin,
            ville_magasin: req.body.ville_magasin,
            cp_magasin: req.body.cp_magasin,
            nom_gestionnaire: req.body.nom_gestionnaire,
            heure_ouverture: req.body.heure_ouverture,
            heure_fermeture: req.body.heure_fermeture
        }
    
        const store = await TestStoresV2.create(magasin)
    
        res.status(201).json({ msg: "magasin créé", stores: store })
        console.log('store', store)
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    
    }
}

//Modifier un magasin
const updateStore = ( req, res ) => {

}

//lister tous les magasins
const getAllStores = ( req, res ) => {

    TestStoresV2.findAll({
        attributes : {exclude: ['createdAt', 'updatedAt']}
    })
    .then((stores) => {
        res.status(200).json(stores)
        console.log(stores)
    })
    .catch(error => res.statut(500).json(error))
}


//Chercher un magasin
const getOneStore = ( req, res ) => {
    const { id} = req.params
    //findbyprimarykey
    TestStoresV2.findByPk(id)
        .then( store => {
            if(!store) return res.status(404).json({msg:"store not found"})
            res.status(200).json(store)
        })
        .catch(error => res.statut(500).json(error))
}


//Supprimer un magasin
const deleteStore = ( req, res ) => {

}



module.exports = { addStore, updateStore, getOneStore, getAllStores, deleteStore }