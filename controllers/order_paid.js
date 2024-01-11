
const Orders = require("../models/BDD/Orders");

// Modifier le statut "paid" d'une commande
const updateOrderPaidStatus = async (req, res) => {
    try {
      const { orderId, paid } = req.body;
  
      const order = await Orders.findByPk(orderId);
      if (!order) {
        return res.status(404).json({ message: "Commande non trouvée" });
      }
  
      order.paid = paid;
      await order.save();
  
      res.status(200).json({ message: "Le statut de paiement de la commande a été mis à jour", order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour du statut de paiement de la commande" });
    }
  };
  
  // Ajouter cette route à votre application (dans votre fichier de routes)
  // Exemple : app.patch('/updateOrderPaidStatus', updateOrderPaidStatus);
  
  module.exports = {
    updateOrderPaidStatus
  };