const TestOrders = require('../models/TestBDD/__orders')
const TestOrdersV2 = require('../models/TestBDD/___orders')

const createOrder = async (req, res) => {
    try {
      // Récupérer les données du corps de la requête
      const {
        numero_commande,
        firstname_client,
        lastname_client,
        prix_total,
        date,
        status,
        delivery,
        heure,
        userId,
        storeId,
        slotId,
        paymentId,
        promotionId,
    } = req.body;

  
      // Créer le code promo dans la base de données
      const order = await TestOrdersV2.create({
       
            numero_commande,
            firstname_client,
            lastname_client,
            prix_total,
            date,
            status,
            delivery,
            heure,
            userId,
            storeId,
            slotId,
            paymentId,
            promotionId,
    
      });
  
      res.status(201).json(order); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de la commande' });
    }
  }

  //modification du status de la commande
  //si status= livrée, delivery=true
  const updateStatusOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ error: 'You must provide a status to update.' });
    }
  
    try {
      const order = await TestOrdersV2.findByPk(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      order.status = status;
  
      // If status is set to "delivered", also set delivery to true.
      if (status.toLowerCase() === 'livrée') {
        order.delivery = true;
      }
  
      await order.save();
  
      res.json({ message: 'Order status updated successfully.', order });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the order status.' });
    }
  }

  //lister toutes les commandes
  const allOrders = async (req, res) => {
    try {
      const orders = await TestOrdersV2.findAll();
  
      if (!orders) {
        return res.status(404).json({ error: 'No orders found.' });
      }
  
      res.json({ orders });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the orders.' });
    }
  }

  //suppression d'une commande
  const deleteOneOrder = async (req, res) => {
    try {
      const orderId = req.params.id;
      const order = await TestOrdersV2.findOne({ where: { orderId: orderId }});
  
      if (!order) {
        return res.status(404).json({ error: 'No order found with the specified ID.' });
      }
  
      await order.destroy();
      res.json({ message: `Order with id ${orderId} has been deleted.` });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while trying to delete the order.' });
    }
  }

  module.exports = { createOrder, updateStatusOrder, allOrders, deleteOneOrder }