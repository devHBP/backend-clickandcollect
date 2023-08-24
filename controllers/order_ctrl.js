const moment = require('moment');
const TestOrdersV6 = require('../models/TestBDD/_______orders')
const Orders = require('../models/TestBDD/Orders')
const TestPaymentsV2 = require('../models/TestBDD/__payments')
const ProductsTest = require('../models/TestBDD/Products')
const Products = require('../models/TestBDD/_Products')
//const OrderProducts = require('../models/TestBDD/OrderProducts.js')
//const Ordersproducts = require('../models/TestBDD/__orderproducts')
const TableOrderProduct = require('../models/TestBDD/___orderproducts')
const StocksTest = require('../models/TestBDD/Stocks.js')
const { Op } = require('sequelize');



//creation commande (sans le paiement, par exemple pour prendre en compte le paiement sur place plus tard)
const createOrder = async (req, res) => {
    try {
      // Récupérer les données du corps de la requête
      const {
        userRole,
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
        //chaine de caractère
        //productIdsString 
        products
        // [
        //   { productId: 1, quantity: 2 },
        //   { productId: 2, quantity: 1 },
        //   { productId: 3, quantity: 5 },
        //   // etc.
        // ]
    } = req.body;
    console.log(req.body)
    console.log('products', products)
    console.log('prix total', prix_total)

    const aggregatedProducts = products.reduce((accumulator, currentProduct) => {
      const existingProduct = accumulator.find(p => p.productId === currentProduct.productId);
  
      if (existingProduct) {
        existingProduct.quantity += currentProduct.quantity;
      } else {
        accumulator.push({ ...currentProduct });
      }
  
      return accumulator;
    }, []);

    //console.log('aggregatedProducts', aggregatedProducts)
    //mise en tableau
    //const productIds = productIdsString.split(",");
    //console.log('prod2', productIds)

      // Validation de la date avec moment
      // const dateIsValid = moment(date, 'YYYY-MM-DD HH:mm:ss', true).isValid();
      // if (!dateIsValid) {
      //   console.log('date invalide')
      //   return res.status(400).json({ message: 'La date fournie est invalide.' });
      // }
      // if (dateIsValid){
      //   console.log('date valide')
      // }
    // console.log('test2')
      // const dateIsValid = moment(date, 'YYYY-MM-DD', true).isValid();
      // const dateIsValid = moment(date, 'DD/MM/YYYY', true).isValid();
      //  console.log(date)
      // if (!dateIsValid) {
      //    console.log('invalide date')
    // return res.status(400).json({ message: 'La date fournie est invalide.' });
    // }
    // console.log('test3')
    // Par défaut, le statut est "en attente" et paid est false
    const status = 'en attente';
    const paid = false;
    // console.log('test1')
      const order = await Orders.create({
            userRole,
            firstname_client,
            lastname_client,
            prix_total,
            date,
            status,
            delivery:false,
            heure,
            paymentMethod,
            paid,
            userId,
            storeId,
            slotId,
            paymentId,
            promotionId,
            //productIds:productIdsString,
            // productIds: products.map(product => product.productId).join(","),
            productIds: aggregatedProducts.map(product => product.productId).join(","),

    
      });
       console.log('order', order)


      // const orderProducts = products.map(product => ({
        const orderProducts = aggregatedProducts.map(product => ({
          orderId: order.orderId,
          productId: product.productId,
          quantity: product.quantity,
          offre: product.offre,
          formule: product.formule,
          category: product.category
      }));
     //console.log('orderProducts', orderProducts)

    await TableOrderProduct.bulkCreate(orderProducts);

    // Mettre à jour le stock des produits
    for (let product of products) {
      // Récupérer le produit de la base de données
      const dbProduct = await Products.findByPk(product.productId);
      const stock = await StocksTest.findOne({ where: { productId: product.productId } });

       // Vérifier si le stock est suffisant
    if (dbProduct.stock < product.quantity) {
      return res.status(400).json({ message: `Le stock du produit ${dbProduct.libelle} n'est pas suffisant pour la quantité commandée.` });
    }

      // Soustraire la quantité commandée du stock actuel
      const newStock = dbProduct.stock - product.quantity;

      // Mettre à jour le produit dans la base de données avec le nouveau stock
      await dbProduct.update({ stock: newStock });
      await stock.update({ quantite: newStock });
    }
      
      res.status(201).json(order); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'ICI, Une erreur est survenue lors de la création de la commande' });
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
    // console.log('orderId', orderId)
    // console.log('status', status)
  
    if (!status) {
      return res.status(400).json({ error: 'You must provide a status to update.' });
    }
  
    try {
      const order = await Orders.findByPk(orderId);
  
      if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
      }
  
      order.status = status;
  
      // If status is set to "delivered", also set delivery to true.
      if (status.toLowerCase() === 'livree') {
        order.delivery = true;
      }
  
      await order.save();
  
      res.json({ message: 'Order status updated successfully.', order });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while updating the order status.' });
    }
  }

  //updatestatus pour websocket
  const updateStatus = async (orderId, status) => {
    if (!status) {
      throw new Error('You must provide a status to update.');
    }
  
    const order = await Orders.findByPk(orderId);
  
    if (!order) {
      throw new Error('Order not found.');
    }
  
    order.status = status;
  
    // If status is set to "delivered", also set delivery to true.
    if (status.toLowerCase() === 'livree') {
      order.delivery = true;
    }
  
    await order.save();
  
    return order;
  };

  //lister toutes les commandes
  const allOrders = async (req, res) => {
    try {
      const orders = await Orders.findAll();
  
      if (!orders || orders.length === 0) {
        return res.status(404).json({ error: 'No orders found.' });
      }
  
      res.json({ orders });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving the orders.' });
    }
  }

  //suppression d'une commande
  // const deleteOneOrder = async (req, res) => {
  //   try {
  //     const orderId = req.params.id;
  //     const order = await TestOrdersV6.findOne({ where: { orderId: orderId }});
  
  //     if (!order) {
  //       return res.status(404).json({ error: 'No order found with the specified ID.' });
  //     }
  
  //     await order.destroy();
  //     res.json({ message: `Order with id ${orderId} has been deleted.` });
  
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'An error occurred while trying to delete the order.' });
  //   }
  // }
//test suppression commande - stock
// Suppression d'une commande
const deleteOneOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Orders.findOne({ where: { orderId: orderId }});

    if (!order) {
      return res.status(404).json({ error: 'No order found with the specified ID.' });
    }

    // Récupérer les produits de la commande
    const orderProducts = await TableOrderProduct.findAll({ where: { orderId: orderId } });

    // Réintégrer les produits commandés dans le stock
    for (let orderProduct of orderProducts) {
      await orderProduct.destroy();
      
      // Récupérer le produit de la base de données
      const product = await Products.findByPk(orderProduct.productId);
      const stock = await StocksTest.findOne({ where: { productId: orderProduct.productId } });

      // Ajouter la quantité commandée au stock actuel
      const newStock = product.stock + orderProduct.quantity;

      // Mettre à jour le produit et le stock dans la base de données avec le nouveau stock
      await product.update({ stock: newStock });
      await stock.update({ quantite: newStock });
     
    }

    await order.destroy();
    res.json({ message: `Order with id ${orderId} has been deleted and the products have been reintegrated into the stock.` });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while trying to delete the order.' });
  }
}


  //lister les commandes d'un utilisateur
  const ordersOfUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const orders = await Orders.findAll({ where: { userId: userId }});
  
      if (orders.length === 0) {
        return res.json([]);
        // return res.status(404).json({ error: 'No orders found for the specified user.' });
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
        const order = await Orders.findOne({ where: { numero_commande: numero_commande } });

        // Si aucune commande n'est trouvée, renvoyez une erreur
        if (!order) {
            return res.status(404).json({ message: 'Commande non trouvée' });
        }

        // Mettez à jour le statut de la commande et l'ID du paiement
        order.status = 'en attente';
        order.paymentId = paymentId;
        order.paid = true;
        await order.save();

        res.status(200).json(order); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la mise à jour du statut de la commande' });
    }
}

const getOrderProducts = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Orders.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'La commande spécifiée est introuvable.' });
    }

    const orderProducts = await TableOrderProduct.findAll({
      where: { orderId },
    });

    const products = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const product = await Products.findByPk(orderProduct.productId);
        return {
          ...product.get(),
          //on rajoute dans l'objet product la quantité 
          quantity: orderProduct.quantity,
        };
      })
    );
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des produits de la commande.' });
  }
}

// Annuler une commande
const cancelOrder = async (req, res) => {
  try {
    // Récupérer l'ID de la commande du corps de la requête
    const { orderId } = req.body;

    // Récupérer la commande de la base de données
    const order = await Orders.findByPk(orderId);

    // Vérifier si la commande existe
    if (!order) {
      return res.status(404).json({ message: 'Commande non trouvée' });
    }

    // Récupérer les produits de la commande
    const orderProducts = await TableOrderProduct.findAll({ where: { orderId: orderId } });

    // Réintégrer les produits commandés dans le stock
    for (let orderProduct of orderProducts) {
      // Récupérer le produit de la base de données
      const product = await Products.findByPk(orderProduct.productId);
      const stock = await StocksTest.findOne({ where: { productId: orderProduct.productId } });

      // Ajouter la quantité commandée au stock actuel
      const newStock = product.stock + orderProduct.quantity;

      // Mettre à jour le produit dans la base de données avec le nouveau stock
      await product.update({ stock: newStock });
      await stock.update({ quantite: newStock });
    }

    // Annuler la commande
    await order.update({ status: 'annulee' });

    res.json({ message: 'La commande a été annulée et les produits ont été réintégrés dans le stock.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'annulation de la commande' });
  }
};


//trouver si produits presents dans la commande est pris dans une formule
const productsWithFormuleForOrder = async (req, res) => {
  try {
      const orderId = req.params.id;
      const order = await Orders.findOne({ where: { orderId: orderId }});

      if (!order) {
          return res.status(404).json({ error: 'No order found with the specified ID.' });
      }

      // Récupérez les produits de la commande qui ont un champ 'formule'
      const products = await TableOrderProduct.findAll({
          where: {
              orderId: orderId,
              formule: { [Op.ne]: null }
          }
      });

      if (products.length === 0) {
          return res.status(404).json({ error: 'No products with formule found for the specified order.' });
      }

      // Regrouper les produits par formule
      const groupedByFormule = {};

      for (const product of products) {
          if (!groupedByFormule[product.formule]) {
              groupedByFormule[product.formule] = [];
          }
          groupedByFormule[product.formule].push(product);
      }

      res.json(groupedByFormule);

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while trying to fetch the products.' });
  }
}




  module.exports = { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder, getOrderProducts, updateStatus, cancelOrder, productsWithFormuleForOrder }