//penser à enlever commentaire dans modèle

const TestStore = require('../models/testStore.js')

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
        }
    
        const store = await TestStore.create(magasin)
    
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

    TestStore.findAll({
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
    TestStore.findByPk(id)
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