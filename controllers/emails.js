const sgMail = require('@sendgrid/mail'); // N'oubliez pas d'inclure la bibliothèque SendGrid.
const jwt = require('jsonwebtoken'); // Pour générer un token JWT si nécessaire.
require('dotenv').config();
const SECRET = process.env.SECRET;
const NODEJS_URL = process.env.NODEJS_URL;
const NODEJS_PORT = process.env.NODEJS_PORT;

const sendWelcomeEmail = async (req, res) => {
    try {
        const { email, firstname } = req.body;
        console.log('email',email)
        console.log('fistname',firstname)
        // Configurez SendGrid.
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        // Message de bienvenue
        const msg = {
            to: email, 
            from: 'contact@lepaindujour.io', 
            subject: `Bienvenue sur l'application Le Pain du Jour ClickandCollect!`, 
            html: `
                <h1>Bienvenue, ${firstname}!</h1>
                <p>Nous sommes ravis que vous nous ayez rejoints sur [VotreApp].</p>
                <p>Commencez à explorer dès maintenant et découvrez toutes les fonctionnalités disponibles pour vous.</p>
                <br>
                <p>Amusez-vous bien,</p>
                <p>L'équipe de [VotreApp]</p>
            `
        };

        // Envoyez l'e-mail
        await sgMail.send(msg);

        return res.status(200).send("E-mail de bienvenue envoyé avec succès");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur du serveur lors de l'envoi de l'e-mail de bienvenue");
    }
}
module.exports = {sendWelcomeEmail}
