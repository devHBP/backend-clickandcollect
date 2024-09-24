const TestStoresV2 = require('../models/BDD/Stores')
const { Op } = require('sequelize'); 


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
//! Ajout de Point de livraison, penser à ajouter l'ID ici correspondant à celui du "storeV2" en DB.
const ROLE_STORES = {
    SUNcollaborateur: [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    client: [1],
    invite:[1],  
};

// Lister tous les magasins en fonction du rôle
const getStoresByRole = ( req, res ) => {
    const role = req.body.role; // obtenir le rôle depuis le corps de la requête

    if (!role || !ROLE_STORES[role]) {
        role = 'client';
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

// combinaison
const getStore = (req, res) => {
    const { role, storeId } = req.body; 

    const roleQuery = (!role || !ROLE_STORES[role]) ? 'client' : ROLE_STORES[role];

    TestStoresV2.findAll({
        where: { storeId: roleQuery },
        attributes : { exclude: ['createdAt', 'updatedAt'] }
    })
    .then((stores) => {
        if (storeId) {
            TestStoresV2.findByPk(storeId)
            .then(store => {
                if (!store) return res.status(404).json({stores, msg: "Store not found"});
                res.status(200).json({stores, selectedStore: store});
            })
            .catch(error => res.status(500).json({error}));
        } else {
            res.status(200).json({stores});
        }
    })
    .catch(error => res.status(500).json({error}));
};


const getOneStoreName = ( req, res ) => {
    const { id} = req.params
    //findbyprimarykey
    TestStoresV2.findByPk(id)
        .then( store => {
            if(!store) return res.status(404).json({msg:"store not found"})
            res.status(200).json({ nom_magasin: store.nom_magasin });
        })
        .catch(error => res.statut(500).json(error))
}

// faire ressortir les nom_magasin d'un tableau de storeId
// const getStores = (req, res) => {
//     let { ids } = req.query;
//     ids = ids.split(',').map(id => parseInt(id));

//     TestStoresV2.findAll({
//         attributes: ['nom_magasin'], 
//         where: {
//             storeId: {
//                 [Op.in]: ids
//             }
//         }
//     })
//     .then(stores => {
//         if (!stores || stores.length === 0) return res.status(404).json({ msg: "Stores not found" });
//         // Simplifier la sortie pour ne renvoyer qu'un tableau de noms de magasins
//         const storeNames = stores.map(store => store.nom_magasin);
//         res.status(200).json(storeNames);
//     })
//     .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: "An error occurred while retrieving the stores." });
//     });
// };

const getStores = (req, res) => {
    let { ids } = req.query;
    if (!ids) {
        return res.status(200).json({}); // objet vide si aucun ID n'est fourni
    }
    ids = ids.split(',').map(id => parseInt(id));

    if (ids.length === 0) {
        return res.status(200).json({}); // objet vide si aucun ID n'est fourni
    }

    TestStoresV2.findAll({
        attributes: ['storeId', 'nom_magasin'], // Inclure 'storeId' dans les attributs sélectionnés
        where: {
            storeId: {
                [Op.in]: ids
            }
        }
    })
    .then(stores => {
        
        if (!stores || stores.length === 0) return res.status(404).json({ msg: "Stores not found" });
        
        // Créer un objet qui mappe chaque storeId à son nom_magasin
        const storeNamesById = stores.reduce((acc, store) => {
            acc[store.storeId] = store.nom_magasin;
            return acc;
        }, {});

        res.status(200).json(storeNamesById); // Renvoyer l'objet modifié
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving the stores." });
    });
};



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


module.exports = { addStore, updateStore, getOneStore, getAllStores, deleteStore, getStoresByRole, getStores, getOneStoreName, getStore }