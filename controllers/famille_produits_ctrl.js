const FamillyProducts = require('../models/BDD/Familles')

const addFamillyProduct = async (req, res) => {
    try {
      let familleProduit = {
        nom_famille_produit: req.body.nom_famille_produit,
      };
      console.log('familleProduit', familleProduit)
  
      const createdFamilleProduit = await FamillyProducts.create(familleProduit);
      console.log('createdFamilleProduit', createdFamilleProduit)
  
      res.status(201).json({ msg: "Famille de produit créée", createdFamilleProduit });
    } catch (error) {
      console.error('erreur', error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //lister toutes les categories
  const getAllFamillyProducts = async (req, res) => {
    try {
      const famillesProduit = await FamillyProducts.findAll();
      res.status(200).json({ famillesProduit });
    } catch (error) {
      console.error('erreur', error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  //lister une famille

const getOneFamillyProduct = async (req, res) => {
    try {
      const id = req.params.id; // Récupérer l'ID de la famille de produits à partir des paramètres de la requête
      const familleProduit = await FamillyProducts.findByPk(id);
      if (familleProduit) {
        res.status(200).json({ familleProduit });
      } else {
        res.status(404).json({ error: "Famille de produit non trouvée" });
      }
    } catch (error) {
      console.error('erreur', error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  const deleteFamillyProduct = async (req, res) => {
    try {
      const id = req.params.id; // Récupérer l'ID de la famille de produits à partir des paramètres de la requête
      const familleProduit = await FamillyProducts.findByPk(id);
      if (familleProduit) {
        await familleProduit.destroy();
        res.status(200).json({ msg: "Famille de produit supprimée avec succès" });
      } else {
        res.status(404).json({ error: "Famille de produit non trouvée" });
      }
    } catch (error) {
      console.error('erreur', error);
      res.status(500).json({ error: "Internal server error" });
    }
};

  module.exports = { addFamillyProduct, getAllFamillyProducts, getOneFamillyProduct, deleteFamillyProduct}