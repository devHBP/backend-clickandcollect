//const TestPromotions = require("../models/BDD/Promotions");
const Promos = require("../models/BDD/Promos");

// const addPromo = async (req, res) => {
//   try {
//     // Récupérer les données du corps de la requête
//     const { code, percentage, durationInDays, active } = req.body;

//     // Créer le code promo dans la base de données
//     const promoCode = await TestPromotions.create({
//       code,
//       percentage,
//       durationInDays,
//       active,
//     });

//     res.status(201).json(promoCode); // Envoyer la réponse avec le code promo créé
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur est survenue lors de la création du code promo.' });
//   }
// }

const addPromo = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { code, percentage, fixedAmount, durationInDays, active } = req.body;

    // Valider que soit 'percentage' soit 'fixedAmount' est fourni, mais pas les deux
    if (percentage != null && fixedAmount != null) {
      return res
        .status(400)
        .json({
          message:
            "Veuillez fournir soit un 'percentage', soit un 'fixedAmount', mais pas les deux.",
        });
    }

    // Créer le code promo dans la base de données
    const promoCode = await Promos.create({
      code,
      percentage,
      fixedAmount,
      durationInDays,
      active,
    });

    res.status(201).json(promoCode); // Envoyer la réponse avec le code promo créé
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: "Une erreur est survenue lors de la création du code promo.",
      });
  }
};

// const handleApplyDiscount = async (req, res) => {
//     try {
//         const code = req.params.code;

//         // Recherche du code promo dans la base de données
//         const promoCode = await TestPromotions.findOne({
//           where: { code: code.toUpperCase() }
//         });

//         if (promoCode) {
//           res.json(promoCode);
//         } else {
//           res.status(404).json({ error: 'Code promo introuvable' });
//         }
//       } catch (error) {
//         res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du code promo' });
//       }
// };

const handleApplyDiscount = async (req, res) => {
  const { promoCode, cartItems } = req.body;

  try {
    const promo = await Promos.findOne({ where: { code: promoCode } });
    if (!promo || !promo.active) {
      return res
        .status(400)
        .json({ message: "Code promo invalide ou non actif." });
    }

    // Calculer le total du panier
    const totalCart = cartItems.reduce((total, item) => total + item.prix_unitaire * item.qty, 0);
    let discountRemaining = promo.fixedAmount;
    // console.log('totalCart', totalCart)
    // console.log('discountRemaining', discountRemaining)

    const updatedCart = cartItems.map((item) => {
      let reducedPrice = item.prix_unitaire;

      if (promo.percentage) {
        reducedPrice -= (reducedPrice * promo.percentage) / 100;
        // console.log("code promo pourcentage");
        // console.log('reducedPrice', reducedPrice)
      } else if (promo.fixedAmount) {
        let discountShare = (item.prix_unitaire * item.qty / totalCart) * promo.fixedAmount;

        // Réduire le prix de l'article par sa part de la réduction
        reducedPrice -= discountShare / item.qty;

        // Assurer que le prix ne devienne pas négatif
        reducedPrice = Math.max(reducedPrice, 0);

        // Mettre à jour le montant restant de la réduction
        discountRemaining -= discountShare;
      }

      return {
        ...item,
        originalPrice: item.prix_unitaire,
        prix_unitaire: reducedPrice,
        promo
      };
    });

    // console.log('updatedCart', updatedCart)

    res.json(updatedCart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l’application du code promo." });
  }
};

// ICI - modif à faire une fois le front mis à jour 
// const handleApplyDiscount = async (req, res) => {
//   const { promoCode, cartItems } = req.body;
//   try {
//     const promo = await Promos.findOne({ where: { code: promoCode } });
//     if (!promo || !promo.active) {
//       return res
//         .status(400)
//         .json({ message: "Code promo invalide ou non actif." });
//     }

//     // Calculer le total du panier
//     const totalCart = cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
//     // console.log('totalCart', totalCart)
//     let discountRemaining = promo.fixedAmount;
//     // console.log('totalCart', totalCart)
//     // console.log('discountRemaining', discountRemaining)

//     const updatedCart = cartItems.map((item) => {
//       // console.log('item', item)
//       let reducedPrice = item.unitPrice;

//       if (promo.percentage) {
//         // reducedPrice -= (reducedPrice * promo.percentage) / 100;
//         reducedPrice -= parseFloat((reducedPrice * promo.percentage / 100).toFixed(2));

//         // console.log("code promo pourcentage");
//         // console.log('reducedPrice', reducedPrice)
//       } else if (promo.fixedAmount) {
//         let discountShare = (item.unitPrice * item.quantity / totalCart) * promo.fixedAmount;

//         // Réduire le prix de l'article par sa part de la réduction
//         reducedPrice -= discountShare / item.quantity;

//         // Assurer que le prix ne devienne pas négatif
//         reducedPrice = Math.max(reducedPrice, 0);

//         // Mettre à jour le montant restant de la réduction
//         discountRemaining -= discountShare;
//       }
//       let totalPrice = reducedPrice * (item.quantity)
//       // console.log('totalPrice', totalPrice)

//       return {
//         ...item,
//         originalPrice: item.unitPrice,
//         unitPrice: reducedPrice,
//         totalPrice,
//         promo
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
// const allDiscounts = async (req, res) => {
//   try {
//     // Récupérer tous les codes promo de la base de données
//     const promoCodes = await TestPromotions.findAll();

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

//lister toutes les promos
const allDiscounts = async (req, res) => {
  try {
    // Récupérer tous les codes promo de la base de données
    const promoCodes = await Promos.findAll();

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
    const promo = await Promos.findByPk(promoCode);

    if (!promo) {
      return res.status(404).json({ error: "Promo not found" });
    }

    await promo.destroy();
    return res.status(200).json({ msg: "Promo deleted with success" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete promo" });
  }
};

const updateStatusPromo = async (req, res) => {
  try {
    // Récupérer l'identifiant du code promo et le nouvel état 'active' du corps de la requête
    const { promotionId, active } = req.body;

    // Trouver et mettre à jour le code promo
    const promoCode = await Promos.findByPk(promotionId);
    if (!promoCode) {
      return res.status(404).json({ message: "Code promo non trouvé." });
    }

    promoCode.active = active;
    await promoCode.save();

    res.status(200).json({ message: "Le statut du code promo a été mis à jour.", promoCode });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du code promo." });
  }
};

module.exports = { addPromo, handleApplyDiscount, allDiscounts, deletePromo, updateStatusPromo };
