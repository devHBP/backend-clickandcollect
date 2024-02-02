const TestPaymentsV2 = require("../models/BDD/Payments");
require("dotenv").config();
const bodyParser = require("body-parser");
const { confirmOrder, confirmOrderMail } = require("../controllers/emails/confirmOrder");
const {
  createPaiementId,
  updateOrderService,
  getOneStoreName,
} = require("../services/services");

const stripe = require("stripe")(process.env.STRIPE_KEY_PRIVATE);

const createSession = async (req, res) => {
  // console.log("Info reçue pour Stripe:", req.body);
  console.log("orderInfo coté backend", req.body.orderInfo);

  try {
    // Valider les entrées
    if (!req.body.orderInfo || !req.body.orderInfo.cart) {
      return res
        .status(400)
        .json({ error: "Informations de commande manquantes." });
    }

    const role = req.body.orderInfo.userRole;
    // console.log("req", req.body.orderInfo.cart);
    const lineItems = req.body.orderInfo.cart.map((item) => {
      const { libelle, prix, qty, prix_unitaire, antigaspi } = item;
      let adjustedPrice = prix || prix_unitaire;
      // console.log("item", item);
      // console.log("libelle", libelle);
      // console.log("prix", adjustedPrice);

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

    // console.log("lineItems", lineItems);

    let success_url = `${process.env.ADRESS_PREPROD}/success/`;
    let cancel_url = `${process.env.ADRESS_PREPROD}/cancel/`;


    const orderId = req.body.orderInfo.orderId;
    // const numero_commande = req.body.orderInfo.numero_commande;
    const firstname = req.body.orderInfo.user.firstname;
    const email = req.body.orderInfo.user.email;
    const date = req.body.orderInfo.dateForDatabase;
    const store = req.body.orderInfo.selectStore;

    // je recupère le nom_magasin via le storeID
    const point_de_vente = await getOneStoreName(store);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: success_url,
      cancel_url: cancel_url,

      metadata: {
        orderId,
        firstname,
        email,
        date,
        point_de_vente,
      },
    });

    // ajouter le console response
    console.log("Session Stripe créée:", {
      id: session.id,
      session: session.url,
      lineItems,
    });

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
      text-align: center;
      background-image: url('patern.jpg'); 
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: cover;
    }
    .container {
      display: flex;
      flex-direction: column;
      gap: 2vw;
      width: 90vw;
      background-color: #fff;
      padding: 4vw;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    h1 {
      font-size: 6vw;
      color: #34AA55;
    }
    p {
      font-size: 4vw;
    }
    .success-message {
      color: #273545;
      font-weight:bold;
    }
    .btn-retour {
      font-size: 4vw;
      text-decoration: none;
      color: white;
      background-color: #34AA55;
      padding: 4vw 8vw;
      margin-top: 4vw;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Commande réussie !</h1>
    <p class="success-message">Ta commande est passée avec succès. Un e-mail de confirmation t'a été envoyé.
    </p>
    <a href="clickandcollect://success" class="btn-retour">Retourner sur l'application</a>
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
    console.log("sessionId coté back", sessionId);
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
    const orderID = session.metadata.orderId;
    console.log("orderID", orderID);

    res.json({
      status: paymentStatus,
      transactionId: paymentId,
      method: method,
      orderID: orderID,
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
    console.log("req createPaiement", req.body);
    // Créer le code promo dans la base de données
    const paiement = await TestPaymentsV2.create({
      method,
      transactionId,
      status,
    });
    console.log("paiement", paiement);
    res.status(201).json(paiement);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création du paiement",
    });
  }
};

//webhook stripe
const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_LOCAL
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object;
      console.log("Session de paiement complétée");

      const paymentIntentId = checkoutSession.payment_intent;
      const paymentStatus = checkoutSession.payment_status;
      const paymentMethod = checkoutSession.payment_method_types[0];
      const email = checkoutSession.metadata.email;
      const firstname = checkoutSession.metadata.firstname;
      const orderId = checkoutSession.metadata.orderId;
      // const numero_commande = checkoutSession.metadata.numero_commande;
      const date = checkoutSession.metadata.date;
      const point_de_vente = checkoutSession.metadata.point_de_vente;

      console.log("paymentIntentId", paymentIntentId);
      console.log("paymentStatus", paymentStatus);
      console.log("paymentMethod", paymentMethod);
      console.log("email", email);
      console.log("firstname", firstname);
      console.log("orderId", orderId);
      console.log("date", date);
      console.log("point_de_vente", point_de_vente);
      // console.log("numero_commande", numero_commande);


      try {
        // Appel du service createPaiementId
        const paiement = await createPaiementId(
          paymentMethod,
          paymentIntentId,
          paymentStatus
        );

        // Utiliser l'ID de paiement pour d'autres opérations
        const paymentId = paiement;

        if (paymentId) {
          console.log("Metadata:", checkoutSession.metadata);
          try {
            const orderId = parseInt(checkoutSession.metadata.orderId, 10);
            console.log('orderId metadat', orderId)
            console.log('orderId type',typeof orderId)

            // Appel de la requete updateOrder - j'ajoute le paymentID à la commande
            const update = await updateOrderService(orderId, paymentId);

            // envoi de l'email
            const fakeReq = {
              body: {
                email: email,
                firstname: firstname,
                orderId: orderId,
                date: date,
                point_de_vente: point_de_vente,
              },
            };
            const fakeRes = {
              status: () => ({ send: () => {} }),
            };
            const emailResponse = await confirmOrderMail(fakeReq, fakeRes);
          } catch (error) {
            console.error(
              "Erreur lors de la modification de la commande avec paymentId et orderId",
              error
            );
            res.status(500).send(error.message);
            return;
          }
        }
      } catch (error) {
        console.error("Erreur lors de la création du paiement", error);
        res.status(500).send(error.message);
        return;
      }

      break;

    //4. vider le panier (quand il sera coté back)

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

module.exports = {
  createSession,
  success,
  paiementStatus,
  createPaiement,
  cancel,
  back,
  stripeWebhook,
};
