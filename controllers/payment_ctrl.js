const TestPaymentsV2 = require("../models/BDD/Payments");
require("dotenv").config();
const bodyParser = require("body-parser");


const stripe = require("stripe")(process.env.STRIPE_KEY_PRIVATE);

const createSession = async (req, res) => {
  console.log('Info reçue pour Stripe:', req.body);
  console.log("orderInfo coté backend", req.body.orderInfo)

  try {
    // Valider les entrées
    if (!req.body.orderInfo || !req.body.orderInfo.cart) {
      return res
        .status(400)
        .json({ error: "Informations de commande manquantes." });
    }

    const role = req.body.orderInfo.userRole;
    console.log("req", req.body.orderInfo.cart);
    const lineItems = req.body.orderInfo.cart.map((item) => {
      const { libelle, prix, qty, prix_unitaire, antigaspi } = item;
      let adjustedPrice = prix || prix_unitaire;
      console.log("item", item);
      console.log("libelle", libelle);
      console.log("prix", adjustedPrice);

      if (role === "SUNcollaborateur" && !antigaspi) {
        adjustedPrice *= 0.8;
      }
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: libelle,
          },
          unit_amount: Math.round(parseFloat(adjustedPrice * 100)),
        },
        quantity: qty,
      };
    });

    console.log("lineItems", lineItems);

    //let success_url = `http://127.0.0.1:8080/success/`;
    let success_url = `${process.env.ADRESS_PREPROD}/success/`;x
    let cancel_url = `${process.env.ADRESS_PREPROD}/cancel/`;

    // if (req.body.platform === 'android' && req.body.isDev) {
    //     success_url = 'http://10.0.2.2:8080/success';
    //     cancel_url = 'http://10.0.2.2:8080/cancel';
    // } else if (req.body.platform === 'ios' && req.body.isDev) {
    //     success_url = 'http://192.168.1.16:8080/success';
    //     cancel_url = 'http://localhost:8080/cancel';
    // }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: success_url,
      cancel_url: cancel_url,
    });

    // ajouter le console response
    console.log("Session Stripe créée:", { id: session.id, session: session.url, lineItems });

    res.json({ id: session.id, session: session.url, lineItems });
  } catch (error) {
    console.error("Erreur lors de la création de la session:", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la session." });
  }
};

// const success = (req, res) => {
//   console.log("paiement  success - ok");
//   res.send(`
//    <html>
//      <body>
//       <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
//         <div style="text-align: center;display:flex; flex-direction: column; gap:15px; width: 70%">
//           <h1 style="font-size: 42px">Paiement réussi !</h1>
//           <p style="font-size: 36px">Merci d'avoir effectué votre paiement avec Stripe.</p>
//           <p style="font-size: 36px">Vous pouvez revenir sur votre application</p>
//           <a href="clickandcollect://success" style="font-size: 36px; text-decoration:none; color: white; background-color:green; padding: 20px 45px; margin-top:20px; border-radius: 10px">Retour</a>
//         </div>
//       </div>
//      </body>
//    </html>
//  `);
// };

const success = (req, res) => {
  console.log("paiement success - ok");
  res.send(`
  <!DOCTYPE html>
  <html>
<head>
  <title>Finaliser votre paiement</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: Arial, sans-serif;
      margin: 0;
      background-color: #f7f7f7;
      text-align: center;
    }
    .container {
      display: flex;
      flex-direction: column;
      gap: 2vw;
      max-width: 90%;
      background-color: #fff;
      padding: 4vw;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    h1 {
      font-size: 6vw;
    }
    p {
      font-size: 4vw;
    }
    .success-message {
      font-style: italic;
      color: green;
    }
    .btn-retour {
      font-size: 4vw;
      text-decoration: none;
      color: white;
      background-color: orange; /* Orange */
      padding: 4vw 8vw;
      margin-top: 4vw;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .btn-retour:hover {
      background-color: darkorange;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Finaliser votre paiement</h1>
    <p class="success-message">Votre paiement a été traité avec succès.</p>
    <p><strong>Il est essentiel de revenir à l'application pour finaliser la création de votre commande.</strong></p>
    <a href="clickandcollect://success" class="btn-retour">Retourner à l'application</a>
  </div>
</body>
</html>
  
  `);
};


const cancel = (req, res) => {
  console.log("paiement annulé backend");
  res.send(`
 <html>
   <body>
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
      <div style="text-align: center;display:flex; flex-direction: column; gap:15px; width: 70%">
        <h1 style="font-size: 42px">Paiement annulé !</h1>
        <p style="font-size: 36px">Annulation du paiement</p>
        <a href="clickandcollect://cancel" style="font-size: 36px; text-decoration:none; color: white; background-color:orange; padding: 20px 45px; margin-top:20px; border-radius: 10px">Retour</a>
      </div>
    </div>
   </body>
 </html>
`);
};

const back = (req, res) => {
  console.log("paiement annulé");
  res.send(`
 <html>
   <body>
    <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
      <div style="text-align: center;display:flex; flex-direction: column; gap:15px; width: 70%">
        <h1 style="font-size: 42px">Paiement annulé !</h1>
        <p style="font-size: 36px">Retour en arriere</p>
        <a href="clickandcollect://cancel" style="font-size: 36px; text-decoration:none; color: white; background-color:orange; padding: 20px 45px; margin-top:20px; border-radius: 10px">Retour</a>
      </div>
    </div>
   </body>
 </html>
`);
};

const paiementStatus = async (req, res) => {
  try {
    // console.log('check paiement', req)
    const sessionId = req.query.sessionId;
    console.log('sessionId coté back', sessionId)
    // Obtenez la session de paiement à partir de l'ID de session
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("session", session);
    // Vérifiez l'état du paiement dans la session
    const paymentStatus = session.payment_status;
    console.log("paiment status", paymentStatus);
    const paymentId = session.payment_intent;
    console.log("paiment id", paymentId);
    const method = session.payment_method_types[0];
    console.log("méthode de paiement", method);

    res.json({
      status: paymentStatus,
      transactionId: paymentId,
      method: method,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la vérification de l'état du paiement - erreur ici :",
      error
    );
    res.status(500).json({
      error: "Erreur lors de la vérification de l'état du paiement- ICI",
    });
  }
};

const createPaiement = async (req, res) => {
  try {
    // Récupérer les données du corps de la requête
    const { method, transactionId, status } = req.body;
    console.log('req createPaiement', req.body)
    // Créer le code promo dans la base de données
    const paiement = await TestPaymentsV2.create({
      method,
      transactionId,
      status,
    });
    console.log('paiement', paiement)
    res.status(201).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du paiement",
    });
  }
};

//webhook stripe
// const stripeWebhook = async (req, res) => {
//   const sig = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

//     // Gérez l'événement
//     switch (event.type) {
//       case 'checkout.session.completed':
//         const session = event.data.object;
//         console.log('Session de paiement complétée', session);
//         // Ici, vous pouvez effectuer des actions supplémentaires basées sur la session complétée
//         break;
//       // Ajoutez d'autres cas d'événements si nécessaire
//       default:
//         console.log(`Événement non géré de type: ${event.type}`);
//     }

//     res.status(200).json({received: true});
//   } catch (err) {
//     console.error(`Erreur dans le Webhook Stripe: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// };


module.exports = {
  createSession,
  success,
  paiementStatus,
  createPaiement,
  cancel,
  back,
  // stripeWebhook
};
