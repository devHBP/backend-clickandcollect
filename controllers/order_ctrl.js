const TestOrders = require('../models/TestBDD/__orders')
const TestOrdersV2 = require('../models/TestBDD/___orders')
const TestOrdersV3 = require('../models/TestBDD/____orders')
const TestOrdersV4 = require('../models/TestBDD/_____orders')
const TestPaymentsV2 = require('../models/TestBDD/__payments')

//creation commande (sans le paiement, par exemple pour prendre en compte le paiement sur place plus tard)
const createOrder = async (req, res) => {
    try {
      // Récupérer les données du corps de la requête
      const {
        firstname_client,
        lastname_client,
        prix_total,
        paymentId,
        date,
        delivery,
        heure,
        userId,
        storeId,
        slotId,
        promotionId,
        paymentMethod,
    } = req.body;

    // Par défaut, le statut est "en attente" et paid est false
    const status = 'en attente';
    const paid = false;

      const order = await TestOrdersV4.create({
            firstname_client,
            lastname_client,
            prix_total,
            date,
            status,
            delivery,
            heure,
            paymentMethod,
            paid,
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

  //creation d'une commande avec paiement en une seule fonction
//   const createOrderAndPayment = async (req, res) => {
//     try {
//         // Créez d'abord le paiement
//         const { method, transactionId, status } = req.body.payment;
//         const payment = await TestPaymentsV2.create({ method, transactionId, status });

//         console.log(payment.toJSON());

//         // Ensuite, créez la commande avec l'ID du paiement que vous venez de créer
//         const {
//             firstname_client,
//             lastname_client,
//             prix_total,
//             date,
//             status: orderStatus,
//             // status: en attente par defaut ?
//             heure,
//             userId,
//             storeId,
//             slotId,
//             promotionId,
//         } = req.body.order;

//         const order = await TestOrdersV2.create({
//             firstname_client,
//             lastname_client,
//             prix_total,
//             date,
//             status: orderStatus, //en attente par defaut ?
//             delivery:false,
//             heure,
//             userId,
//             storeId,
//             slotId,
//             paymentId: payment.paymentId, // Utilisez l'ID du paiement que vous venez de créer
//             promotionId,
//         });

//         console.log(order.toJSON());

//         res.status(201).json({ order, payment });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Une erreur est survenue lors de la création de la commande et du paiement' });
//     }
// };
  //modification du status de la commande
  //si status= livrée, delivery=true
  const updateStatusOrder = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;
  
    if (!status) {
      return res.status(400).json({ error: 'You must provide a status to update.' });
    }
  
    try {
      const order = await TestOrdersV4.findByPk(orderId);
  
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
      const orders = await TestOrdersV4.findAll();
  
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
      const order = await TestOrdersV4.findOne({ where: { orderId: orderId }});
  
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

  //lister les commandes d'un utilisateur
  const ordersOfUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await TestOrdersV4.findAll({ where: { userId: userId }});
  
      if (orders.length === 0) {
        return res.status(404).json({ error: 'No orders found for the specified user.' });
      }
  
      res.json(orders);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while trying to fetch the orders.' });
    }
  }
  const updateOrder = async (req, res) => {
    try {
        // Récupérez le numéro de commande, le nouveau statut et l'ID du paiement à partir du corps de la requête
        const { numero_commande, status, paymentId } = req.body;

        // Trouvez la commande correspondante dans la base de données
        const order = await TestOrdersV4.findOne({ where: { numero_commande: numero_commande } });

        // Si aucune commande n'est trouvée, renvoyez une erreur
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Mettez à jour le statut de la commande et l'ID du paiement
        order.status = status;
        order.paymentId = paymentId;
        order.paid = true;
        await order.save();

        res.status(200).json(order); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du statut de la commande' });
    }
}



  module.exports = { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder }