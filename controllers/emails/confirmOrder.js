const sgMail = require('@sendgrid/mail'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const Users = require('../../models/BDD/Users')



const confirmOrder = async (req, res) => {

    try {
        const { email, firstname , numero_commande, date} = req.body;

        // Conversion de la chaîne date en objet Date
        const dateObj = new Date(date);

        // Vérification de la validité de la date
        if (isNaN(dateObj.getTime())) {
            console.error('Invalid date received:', date);
            res.status(400).send('Invalid date format received');
            return;
        }

        // Extraction des composants de la date
        const day = String(dateObj.getUTCDate()).padStart(2, '0'); 
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
        const year = dateObj.getUTCFullYear(); 

        // Concaténation sous le format JJ-MM-AAAA
        const formattedDate = `${day}-${month}-${year}`;
        console.log(formattedDate); 

        //pour l'instant le numero_commande est sous ce format
        //magasin_001_05102023_00041
        //il faudra reformater le format pour avoir un numero exploitable

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
             <p>Date souhaitée: ${formattedDate}</p>
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
