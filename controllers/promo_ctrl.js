const PromoCode = require('../models/codepromo.js');


const addPromo = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { code, percentage, durationInDays, active } = req.body;

    // Créer le code promo dans la base de données
    const promoCode = await PromoCode.create({
      code,
      percentage,
      durationInDays,
      active,
    });

    res.status(201).json(promoCode); // Envoyer la réponse avec le code promo créé
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du code promo.' });
  }
}

const handleApplyDiscount = async (req, res) => {
    try {
        const code = req.params.code;
    
        // Recherche du code promo dans la base de données
        const promoCode = await PromoCode.findOne({
          where: { code: code.toUpperCase() }
        });
    
        if (promoCode) {
          res.json(promoCode);
        } else {
          res.status(404).json({ error: 'Code promo introuvable' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du code promo' });
      }
};

//lister toutes les promos
const allDiscounts = async (req, res) => {
  try {
    // Récupérer tous les codes promo de la base de données
    const promoCodes = await PromoCode.findAll();

    res.json(promoCodes); // Envoyer la réponse avec tous les codes promo
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des codes promo.' });
  }
}

module.exports = { addPromo, handleApplyDiscount, allDiscounts}
