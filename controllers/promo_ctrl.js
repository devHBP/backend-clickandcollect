const TestPromotions = require("../models/BDD/Promotions");
// const TestPromo = require("../models/BDD/TestPromo");

const addPromo = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { code, percentage, durationInDays, active } = req.body;

    // Créer le code promo dans la base de données
    const promoCode = await TestPromotions.create({
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

// const addPromo = async (req, res) => {
//   try {
//     // Récupérer les données du corps de la requête
//     const { code, percentage, fixedAmount, durationInDays, active } = req.body;

//     // Valider que soit 'percentage' soit 'fixedAmount' est fourni, mais pas les deux
//     if (percentage != null && fixedAmount != null) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Veuillez fournir soit un 'percentage', soit un 'fixedAmount', mais pas les deux.",
//         });
//     }

//     // Créer le code promo dans la base de données
//     const promoCode = await TestPromo.create({
//       code,
//       percentage,
//       fixedAmount,
//       durationInDays,
//       active,
//     });

//     res.status(201).json(promoCode); // Envoyer la réponse avec le code promo créé
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({
//         message: "Une erreur est survenue lors de la création du code promo.",
//       });
//   }
// };

const handleApplyDiscount = async (req, res) => {
    try {
        const code = req.params.code;

        // Recherche du code promo dans la base de données
        const promoCode = await TestPromotions.findOne({
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
// const handleApplyDiscount = async (req, res) => {
//   const { promoCode, cartItems } = req.body;
//   console.log('cartItems', cartItems)

//   try {
//     const promo = await TestPromo.findOne({ where: { code: promoCode } });

//     if (!promo || !promo.active) {
//       return res
//         .status(400)
//         .json({ message: "Code promo invalide ou non actif." });
//     }

//     const updatedCart = cartItems.map((item) => {
//       let reducedPrice = item.prix_unitaire;

//       if (promo.percentage) {
//         reducedPrice -= (reducedPrice * promo.percentage) / 100;
//         console.log("code promo pourcentage");
//       } else if (promo.fixedAmount) {
//         reducedPrice -= promo.fixedAmount;
//         console.log("code promo montant fixe");
//       }

//       return {
//         ...item,
//         prix_unitaire: reducedPrice > 0 ? reducedPrice : 0,
//       };
//     });

//     res.json(updatedCart);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Erreur lors de l’application du code promo." });
//   }
// };

//lister toutes les promos
const allDiscounts = async (req, res) => {
  try {
    // Récupérer tous les codes promo de la base de données
    const promoCodes = await TestPromotions.findAll();

    res.json(promoCodes); // Envoyer la réponse avec tous les codes promo
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          "Une erreur est survenue lors de la récupération des codes promo.",
      });
  }
};
//lister toutes les promos
// const allDiscounts = async (req, res) => {
//   try {
//     // Récupérer tous les codes promo de la base de données
//     const promoCodes = await TestPromo.findAll();

//     res.json(promoCodes); // Envoyer la réponse avec tous les codes promo
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({
//         message:
//           "Une erreur est survenue lors de la récupération des codes promo.",
//       });
//   }
// };

//lister une promo
/**
 * router.get('/:code', async (req, res) => {
  const promoCode = req.params.code;

  try {
    // Récupérer la promotion spécifique à partir du code
    const promo = await PromoCode.findOne({ where: { code: promoCode } });

    if (!promo) {
      return res.status(404).json({ message: 'La promotion spécifiée n\'existe pas.' });
    }

    res.json(promo); // Envoyer la réponse avec les détails de la promotion
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération de la promotion.' });
  }
});
 */

//supprimer une promo
const deletePromo = async (req, res) => {
  const promoCode = req.params.id;

  try {
    const promo = await TestPromotions.findByPk(promoCode);

    if (!promo) {
      return res.status(404).json({ error: "Promo not found" });
    }

    await promo.destroy();
    return res.status(200).json({ msg: "Promo deleted with success" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete promo" });
  }
};

module.exports = { addPromo, handleApplyDiscount, allDiscounts, deletePromo };
