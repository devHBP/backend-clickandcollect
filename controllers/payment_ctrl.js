const stripe = require('stripe')(
    'secret')

const createSession = async (req, res) => {
    // const session = await stripe.checkout.sessions.create({
    //     payment_method_types: ['card'],
    //     line_items: [
    //       {
    //         price_data: {
    //           currency: 'eur',
    //           product_data: {
    //             name: 'T-shirt',
    //           },
    //           unit_amount: 4000,
    //         },
    //         quantity: 1,
    //       },
    //     ],
    //     mode: 'payment',
    //     success_url: 'http://localhost:8080/success',
    //     cancel_url: 'http://localhost:8080/cancel',
    //   });

    // const { orderInfo } = req.body;
    // console.log('orderInfo', orderInfo)
    const lineItems = req.body.map((item) => {
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
      res.json({ id: session.id, session: session.url, lineItems });
}


module.exports = { createSession }