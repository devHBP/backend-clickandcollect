const TestOrders = require('../models/TestBDD/__orders')
const TestOrdersV2 = require('../models/TestBDD/___orders')
const TestOrdersV3 = require('../models/TestBDD/____orders')
const TestOrdersV4 = require('../models/TestBDD/_____orders')
//const TestOrdersV5 = require('../models/TestBDD/______orders')
const TestOrdersV6 = require('../models/TestBDD/_______orders')
const TestPaymentsV2 = require('../models/TestBDD/__payments')
const ProductsTest = require('../models/TestBDD/Products')
//const TestOrderProductsV2 = require('../models/TestBDD/__orderproducts')
const TestOrderProductsV3 = require('../models/TestBDD/___orderproducts')
const TestOrderProductsV4 = require('../models/TestBDD/____orderproducts')
const TestOrderProductsV5 = require('../models/TestBDD/_____orderproducts')
const TestOrderProductsV6 = require('../models/TestBDD/______orderproducts')
const OrderProducts = require('../models/TestBDD/OrderProducts.js')
const ProductsTests = require('../models/TestBDD/Products')


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

    console.log('products', products)
    //mise en tableau
    //const productIds = productIdsString.split(",");
    //console.log('prod2', productIds)

    // Par défaut, le statut est "en attente" et paid est false
    const status = 'en attente';
    const paid = false;

      const order = await TestOrdersV6.create({
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
            productIds: products.map(product => product.productId).join(","),
    
      });

      const orderProducts = products.map(product => ({
        orderId: order.orderId,
        productId: product.productId,
        quantity: product.quantity
      }));
    console.log(orderProducts)

    await OrderProducts.bulkCreate(orderProducts);
  
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
    // console.log('orderId', orderId)
    // console.log('status', status)
  
    if (!status) {
      return res.status(400).json({ error: 'You must provide a status to update.' });
    }
  
    try {
      const order = await TestOrdersV6.findByPk(orderId);
  
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
  
    const order = await TestOrdersV6.findByPk(orderId);
  
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
      const orders = await TestOrdersV6.findAll();
  
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
      const order = await TestOrdersV6.findOne({ where: { orderId: orderId }});
  
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
      const orders = await TestOrdersV6.findAll({ where: { userId: userId }});
  
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
        const order = await TestOrdersV6.findOne({ where: { numero_commande: numero_commande } });

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

//lister les produits d'une commande
//l'association ProductsTest et TestOrders ne fonctionnent pas (comme avec les stock et les produits)
// const getOrderProducts = async (req, res, next) => {

//   const orderId = req.params.orderId;

//   let order = await TestOrdersV4.findOne({ where: { orderId: orderId } });

//   console.log('order', order);

//   TestOrdersV4.findByPk(orderId, { include: [ 'ProductsTest' ] })
//     .then(order => {
//       return order.getProductsTests();
//     })
//     .then(products => {
//       res.render('order', { 
//         products: products, 
//         orderId: orderId 
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

//non utilisé
// const insertProduct = async (req, res) => {
//   try {
//     // Récupérer les informations de la commande depuis la requête (par exemple : orderId, productIds)
//     const { orderId, productIds } = req.body;

//     // Insérer les associations produit-commande dans la table TestOrderProductsV3
//     for (const productId of productIds) {
//       await TestOrderProductsV6.create({
//         orderId: orderId,
//         productId: productId
//       });
//     }

//     // Autres étapes de traitement de la création de la commande...

//     res.status(201).json({ message: 'Commande créée avec succès.' });
//   } catch (error) {
//     console.error('Erreur lors de la création de la commande :', error);
//     res.status(500).json({ error: 'Une erreur est survenue lors de la création de la commande.' });
//   }
// }


//non utilisé
// const getOrderProducts = async (req, res, next) => {
//   const orderId = req.params.orderId;

//   console.log('orderId', orderId);


//   // Step 1: Fetch the TestOrderProducts for a specific order
//   let orderProductEntries = await TestOrderProductsV6.findAll({
//     where: { orderId: orderId }
//   });

//   console.log('order-product', orderProductEntries);
// };

// const getOrderProducts = async (req, res) => {
//   const { orderId } = req.params;

//   try {
//     const order = await TestOrdersV6.findByPk(orderId);
//     if (!order) {
//       return res.status(404).json({ message: 'La commande spécifiée est introuvable.' });
//     }

//     const productIds = order.productIds.split(',');

//     const products = await Promise.all(
//       productIds.map(async (productId) => {
//         const product = await ProductsTests.findByPk(productId);
//         return product;
//       })
//     );

//     console.log('products', products)

//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des produits de la commande.' });
//   }
// }
const getOrderProducts = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await TestOrdersV6.findByPk(orderId);
    if (!order) {
      return res.status(404).json({ message: 'La commande spécifiée est introuvable.' });
    }

    const orderProducts = await OrderProducts.findAll({
      where: { orderId },
    });

    const products = await Promise.all(
      orderProducts.map(async (orderProduct) => {
        const product = await ProductsTests.findByPk(orderProduct.productId);
        return {
          ...product.get(),
          //on rajoute dans l'objet product la quantité 
          quantity: orderProduct.quantity,
        };
      })
    );

    //console.log('products', products)

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des produits de la commande.' });
  }
}





  module.exports = { createOrder, updateStatusOrder, allOrders, deleteOneOrder, ordersOfUser, updateOrder, getOrderProducts, updateStatus }