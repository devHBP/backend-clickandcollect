const sgMail = require('@sendgrid/mail'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const Users = require('../../models/BDD/Users')



const confirmOrder = async (req, res) => {

    try {
        const { email, firstname , numero_commande, date, point_de_vente} = req.body;
        const numero_service_client = "04 68 84 46 01"
        const numeroCommande = numero_commande.substring(numero_commande.length - 5);
        const paiement = "https://preprod.lepaindujour.io/paiement.png"
        const sav = "https://preprod.lepaindujour.io/sav.png"
        const location = "https://preprod.lepaindujour.io/location.png"
        const lien_application_android = "https://play.google.com/store/apps/details?id=com.myappreactnative&pli=1";
        const lien_application_ios = "https://apps.apple.com/fr/app/le-pain-du-jour-click-collect/id6464316999";
        const lienRGPD = "https://www.lepaindujour.io/page-de-confidentialite/";
        const desabonnement = "https://www.lepaindujour.io/formulaire-de-suppression-des-donnees-personnelles/"

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
            subject: 'Confirmation de ta commande',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Le Pain du Jour - Confirmation de commande</title>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Montserrat:wght@400&display=swap" rel="stylesheet">
                <style>
                    body {
                        font-family: 'Montserrat', sans-serif;
                        color: #273545;
                    }
                    h1, h2 {
                        font-family: 'Poppins', sans-serif;
                        color: #E9520E;
                    }
                    a {
                        color: #273545;
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body style="margin: 0; padding: 0; box-sizing: border-box; background-color: #ECECEC;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="center" style="padding: 20px 0; background-color: #273545;">
                            <!-- Logo -->
                            <img src="https://www.lepaindujour.io/wp-content/uploads/2023/10/logo.png" alt="Le Pain du Jour" style="width: 100px; height: auto;">
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 20px;">
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td align="center" style="padding: 40px;">
                                        <h1 style="font-size: 24px; margin-bottom: 20px;">Bonjour ${firstname},</h1>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Merci pour ta commande <strong>${numeroCommande}</strong> !</p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Nos équipes vont la préparer pour <strong>${formattedDate}</strong>, nous te tiendrons informé de sa disponibilité de retrait au <strong>${point_de_vente}</strong>.</p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Si tu as des questions ou des demandes spécifiques concernant ta commande, n'hésites pas à nous contacter en répondant à cet e-mail ou en appelant notre service clientèle au <strong>${numero_service_client}</strong>.</p>
                                        <h2 style="font-size: 18px; margin-bottom: 10px;">Comment retirer ta commande ?</h2>
                                        <ol style="font-size: 16px; margin-bottom: 20px; padding-left: 0; list-style-position: inside;">
                                            <li>Se munir de l'application Click and Collect Pain du Jour</li>
                                            <li>Se rendre au point de retrait</li>
                                            <li>Présenter le bon de commande</li>
                                        </ol>

                                        <p style="font-size: 16px; margin-bottom: 20px;">Merci pour ta confiance et à très vite !</p>
                                        <!-- Add more content as per your requirement -->
                                    </td>
                                </tr>
                                <!-- Add more sections as per your requirement -->
            <!-- New Bandeau -->
            <!-- New Bandeau -->
            <tr>
                <td align="center" style="padding: 20px; background-color: #273545; background-image: url('https://www.lepaindujour.io/wp-content/uploads/2023/10/Group-2.png'); background-size: contain; background-position: center; background-repeat: no-repeat;">
                    <table width="80%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <!-- Icon 1: Paiement Sécurisé -->
                            <td align="center" style="padding: 10px;">
                                <img src=${paiement} alt="Paiement Sécurisé" style="width: 40px; height: auto;">
                                <p style="margin: 10px 0; font-size: 14px; color: #FFFFFF;">Paiement Sécurisé</p>
                            </td>
                            <!-- Icon 2: Service Client -->
                            <td align="center" style="padding: 10px;">
                                <img src=${sav} alt="Service Client" style="width: 40px; height: auto;">
                                <p style="margin: 10px 0; font-size: 14px; color: #FFFFFF;">Service Client 8H-20H</p>
                            </td>
                            <!-- Icon 3: Localisation -->
                            <td align="center" style="padding: 10px;">
                                <img src=${location} alt="Localisation" style="width: 40px; height: auto;">
                                <p style="margin: 10px 0; font-size: 14px; color: #FFFFFF;">Localisation</p>
                            </td>
                        </tr>
                    </table>
                    <p style="margin: 20px 0; font-size: 14px;">
                        <a href=${lien_application_ios} target="_blank" style="color: #FFFFFF; text-decoration: underline;">Télécharger dans l'App Store</a> | 
                        <a href=${lien_application_android} target="_blank" style="color: #FFFFFF; text-decoration: underline;">Disponible sur Google Play</a>
                    </p>
                </td>
            </tr>
            <!-- Footer -->
            <tr>
                <td align="center" style="padding: 20px; background-color: #D9D9D9; color: #273545;">
                    <p style="margin: 0;">START FOOD - LE PAIN DU JOUR - MAS GUERIDO</p>
                    <p style="margin: 0;">Numéro de téléphone : 04 68 84 46 01</p>
                    <p style="margin: 0;">Adresse e-mail de Contact : <a href="mailto:contact@lepaindujour.io">contact@lepaindujour.io</a></p>
                    <p style="margin: 0;">Capital : 00000 €</p>
                    <p style="margin: 0;">SIRET 919 823 054 00011</p>
                    <p style="margin: 10px 0;"><a href=${lienRGPD} target="_blank">RGPD</a> | <a href=${desabonnement} target="_blank">Se désabonner</a></p>
                </td>
            </tr>
            </table>
    
            </body>
            </html>

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
