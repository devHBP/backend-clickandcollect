const TestStoresV2 = require('../models/BDD/Stores')


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
const updateStore = async (req, res ) => {
    console.log('test')
    try {
        // récupérer l'ID du magasin et les nouvelles données du corps de la demande
        let storeId = req.params.id;
        let updateData = req.body;
        console.log('updateData', updateData)
        const store = await TestStoresV2.findOne({ where: { storeId: storeId } });
        console.log('store', store)
        if (!store) {
            return res.status(404).json({ error: 'Store not found' });
        }
        
        // Mettez à jour uniquement les champs spécifiés dans les mises à jour
        await store.update(updateData);
        return res.status(200).json({ msg: 'Store updated successfully', store: store });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update store' });
    }
}

//lister tous les magasins
const getAllStores = ( req, res ) => {

    TestStoresV2.findAll({
        attributes : {exclude: ['createdAt', 'updatedAt']}
    })
    .then((stores) => {
        res.status(200).json(stores)
        //console.log(stores)
    })
    .catch(error => res.statut(500).json(error))
}

//Stocker les magasins par rôle
const ROLE_STORES = {
    SUNcollaborateur: [1],  
    client: [2],
    invite:[2]      
};

// Lister tous les magasins en fonction du rôle
const getStoresByRole = ( req, res ) => {
    const role = req.body.role; // obtenir le rôle depuis le corps de la requête

    if (!ROLE_STORES[role]) {
        return res.status(400).json({ error: 'Role not found' });
    }

    TestStoresV2.findAll({
        where: { storeId: ROLE_STORES[role] },
        attributes : { exclude: ['createdAt', 'updatedAt'] }
    })
    .then((stores) => {
        res.status(200).json(stores);
    })
    .catch(error => res.status(500).json(error));
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

//attribuer des magasins aux rôles

//je definis les magasins ici
// const ROLE_STORES = {
//     SUNcollaborateur: [3,4,5],
//     client: [1, 2]
// };

// const getStoresByRole = (req, res) => {
//     const roleName = req.params.roleName;

//     if (!ROLE_STORES[roleName]) {
//         return res.status(404).json({ error: 'Role not found' });
//     }

//     res.json({
//         role: roleName,
//         storeIds: ROLE_STORES[roleName]
//     });
// };


module.exports = { addStore, updateStore, getOneStore, getAllStores, deleteStore, getStoresByRole }