const TestPaymentsV2 = require('../models/TestBDD/__payments')

const stripe = require('stripe')(
    '')

const createSession = async (req, res) => {
   
    const role = req.body.orderInfo.userRole;
    console.log('req', req.body.orderInfo.cart)
    const lineItems = req.body.orderInfo.cart.map((item) => {
      const { libelle, prix, qty, prix_unitaire } = item;
      let adjustedPrice = prix || prix_unitaire;
      console.log('item', item)
      console.log('libelle', libelle)
      console.log('prix', adjustedPrice)

      if (role === 'SUNcollaborateur') {
        adjustedPrice *= 0.80;
     }
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: libelle,
          },
          unit_amount: Math.round(parseFloat(adjustedPrice * 100)),
          //unit_amount: parseFloat(prix_unitaire) * 100, // Assurez-vous de convertir le prix en centimes
        },
        quantity: qty,
      };
    });
    console.log('lineItems', lineItems)

    // adresses pour ios ou android
    let success_url = 'http://localhost:8080/success';
    let cancel_url = 'http://localhost:8080/cancel';
    
    if (req.body.platform === 'android' && req.body.isDev) {
        success_url = 'http://10.0.2.2:8080/success';
        cancel_url = 'http://10.0.2.2:8080/cancel';
    } else if (req.body.platform === 'ios' && req.body.isDev) {
      //test sur iphone
        success_url = 'http://192.168.1.16:8080/success';
        cancel_url = 'http://localhost:8080/cancel';
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      //adresse URL deepLinkg
      success_url: success_url,
      cancel_url: cancel_url,
    });
     //console.log('response',res)
    const sessionId = session.id;
    //console.log("sessionId", sessionId)
    //  console.log(res)
      res.json({ id: session.id, session: session.url, lineItems });
      
}


const success = (req, res) => {
    // res.json({ message: 'Payment successful' });
    // console.log('req', req)
   console.log('paiement ok')
   res.send(`
   <html>
     <body>
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
        <div style="text-align: center;display:flex; flex-direction: column; gap:15px; width: 70%">
          <h1 style="font-size: 42px">Paiement réussi !</h1>
          <p style="font-size: 36px">Merci d'avoir effectué votre paiement avec Stripe.</p>
          <p style="font-size: 36px">Vous pouvez revenir sur votre application</p>
          <a href="clickandcollect://success" style="font-size: 36px; text-decoration:none; color: white; background-color:green; padding: 20px 45px; margin-top:20px; border-radius: 10px">Retour</a>
        </div>
      </div>
     </body>
   </html>
 `);
// res.json({
//   message: 'Payment successful',
//   deepLink: 'clickandcollect://success',
// });
}

const paiementStatus = async (req, res) => {
  try {
    const sessionId = req.query.sessionId;

    // Obtenez la session de paiement à partir de l'ID de session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log('session', session)
    // Vérifiez l'état du paiement dans la session
    const paymentStatus = session.payment_status;
    console.log('paiment status', paymentStatus)
    const paymentId = session.payment_intent;
    console.log('paiment id', paymentId)
    const method = session.payment_method_types[0];
    console.log('méthode de paiement', method); 
    res.json({ status: paymentStatus, transactionId: paymentId, method: method });
    //rajouter l'idpaiement
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'état du paiement - erreur ici :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification de l\'état du paiement- ICI' });
  }
}


const createPaiement = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { method, transactionId, status} = req.body;

    // Créer le code promo dans la base de données
    const paiement = await TestPaymentsV2.create({
      method,
      transactionId,
      status
    });

    res.status(201).json(paiement); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la création du paiement' });
  }
}


module.exports = { createSession, success, paiementStatus, createPaiement }