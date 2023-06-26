const stripe = require('stripe')(
    'secret')

const createSession = async (req, res) => {
   
    console.log('req', req.body.orderInfo.cartItems)
    const lineItems = req.body.orderInfo.cartItems.map((item) => {
      const { libelle, prix_unitaire, qty } = item;
      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: libelle,
          },
          unit_amount: parseFloat(prix_unitaire) * 100, // Assurez-vous de convertir le prix en centimes
        },
        quantity: qty,
      };
    });
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cancel',
    });
    //  console.log(res)
      res.json({ id: session.id, session: session.url, lineItems });
      
}

const success = (req, res) => {
  // Vous pouvez envoyer une réponse JSON indiquant le succès du paiement
  // res.json({ message: 'Payment successful' });
  // res.send(`
  //   <html>
  //     <body>
  //       <h1>Paiement réussi !</h1>
  //       <p>Merci d'avoir effectué votre paiement.</p>
  //       <a href="http://localhost:8080/success">Revenir à l'application</a>
  //     </body>
  //   </html>
  // `);
  res.redirect(`http://localhost:8080/success`);
}


module.exports = { createSession , success}