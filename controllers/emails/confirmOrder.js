const sgMail = require('@sendgrid/mail'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const Users = require('../../models/BDD/Users')



const confirmOrder = async (req, res) => {

    try {
        const { email, firstname , numero_commande} = req.body;

        // 1. Vérifiez si l'utilisateur existe
        //const user = await Users.findOne({ where: { email: userEmail } });   

        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const msg = {
            to: email,
            from: 'contact@lepaindujour.io',
            subject: 'Confirmation de votre commande',
            html: `
             <h1>Bienvenue, ${firstname}!</h1>
             <p>Nous sommes ravis que vous nous ayez rejoints sur Le Pain du Jour.</p>
             <p>Commencez à explorer dès maintenant et découvrez toutes les fonctionnalités disponibles pour vous.</p>
             <br>
             <p>Amusez-vous bien,</p>
             <p>Votre numero de commande ${numero_commande}</p>
             <p>L'équipe du Pain du Jour</p>
            `
        };
       
        await sgMail.send(msg);
        return res.status(200).send("E-mail envoyé avec succès");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur du serveur");
    }
}

module.exports = {confirmOrder}
