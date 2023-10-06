const sgMail = require('@sendgrid/mail'); 
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const Users = require('../../models/BDD/Users')



const orderStatusReady = async (req, res) => {

    try {
        const { email, firstname, numero_commande, date, point_de_vente } = req.body;

        // Conversion de la chaîne date en objet Date
        // const dateObj = new Date(date);

        // // Vérification de la validité de la date
        // if (isNaN(dateObj.getTime())) {
        //     console.error('Invalid date received:', date);
        //     res.status(400).send('Invalid date format received');
        //     return;
        // }

        // // Extraction des composants de la date
        // const day = String(dateObj.getUTCDate()).padStart(2, '0'); 
        // const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); 
        // const year = dateObj.getUTCFullYear(); 

        // // Concaténation sous le format JJ-MM-AAAA
        // const formattedDate = `${day}-${month}-${year}`;
        // console.log(formattedDate); 

        //pour l'instant le numero_commande est sous ce format
        //magasin_001_05102023_00041
        //il faudra reformater le format pour avoir un numero exploitable

        // 1. Vérifiez si l'utilisateur existe
        //const user = await Users.findOne({ where: { email: userEmail } });   

        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const msg = {
            to: email,
            from: 'contact@lepaindujour.io',
            subject: 'Votre commande est prête',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Le Pain du Jour - Notification de Disponibilité</title>
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
                    a:visited {
                        color: #273545
                    }
                    a:link {
                        color: #273545
                    }
                    a:active {
                        color: #273545;
                    }
                    .ii a[href] {
                        color: #273545;
                    }
                    .button {
                        background-color: #E9520E;
                        color: #FFFFFF;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        text-decoration: none;
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
                                        <p style="font-size: 16px; margin-bottom: 20px;">Nous avons une super nouvelle... Ta commande <strong>${numero_commande}</strong> est prête !</p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Nos équipes se tiennent à ta disposition <strong>${date}</strong> pour récupérer ta commande au <strong>${point_de_vente}</strong>.</p>
                                        <!-- Button Y Aller -->
                                        <a href="https://maps.app.goo.gl/PV6tgGWPnaNPnodq7" class="button" target="_blank">Y Aller</a>
                                        <p style="font-size: 16px; margin-top: 20px;">Si vous avez des questions ou des demandes spécifiques concernant votre commande, n'hésitez pas à nous contacter en répondant à cet e-mail ou en appelant notre service clientèle au <strong>04 68 84 46 01</strong>.</p>
                                        <h2 style="font-size: 18px; margin-bottom: 10px;">Comment retirer votre commande ?</h2>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            1. Se munir de l'application Click and Collect Pain du Jour<br>
                                            2. Se rendre au point de retrait<br>
                                            3. Présenter le bon de commande
                                        </p>
                                        <!-- Bon de Commande Link -->
                                        <a href="[LIEN_VERS_BON_DE_COMMANDE]" class="button" target="_blank">Bon de Commande</a>
                                        <p style="font-size: 16px; margin-top: 20px;">Merci pour votre confiance et à très vite !</p>
                                    </td>
                                </tr>
                                <!-- New Bandeau -->
                                <tr>
                                    <td align="center" style="padding: 20px; background-color: #273545; background-image: url('https://www.lepaindujour.io/wp-content/uploads/2023/10/Group-2.png'); background-size: contain; background-position: center; background-repeat: no-repeat;">
                                        <table width="80%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <!-- Icon 1: Paiement Sécurisé -->
                                                <td align="center" style="padding: 10px;">
                                                    <img src="[URL_ICONE_PAIEMENT_PNG]" alt="Paiement Sécurisé" style="width: 40px; height: auto;">
                                                    <p style="margin: 10px 0; font-size: 14px; color: #FFFFFF;">Paiement Sécurisé</p>
                                                </td>
                                                <!-- Icon 2: Service Client -->
                                                <td align="center" style="padding: 10px;">
                                                    <img src="[URL_ICONE_SERVICE_CLIENT_PNG]" alt="Service Client" style="width: 40px; height: auto;">
                                                    <p style="margin: 10px 0; font-size: 14px; color: #FFFFFF;">Service Client 8H-20H</p>
                                                </td>
                                                <!-- Icon 3: Localisation -->
                                                <td align="center" style="padding: 10px;">
                                                    <img src="[URL_ICONE_LOCALISATION_PNG]" alt="Localisation" style="width: 40px; height: auto;">
                                                    <p style="margin: 10px 0; font-size: 14px; color: #FFFFFF;">Localisation</p>
                                                </td>
                                            </tr>
                                        </table>
                                        <p style="margin: 20px 0; font-size: 14px;">
                                            <a href="https://apps.apple.com/app/idXXXXXXXXX" target="_blank" style="color: #FFFFFF; text-decoration: underline;">Télécharger dans l'App Store</a> | 
                                            <a href="https://play.google.com/store/apps/details?id=com.example" target="_blank" style="color: #FFFFFF; text-decoration: underline;">Disponible sur Google Play</a>
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
                                        <p style="margin: 10px 0;"><a href="[LIEN_RGPD]" target="_blank">RGPD</a> | <a href="[LIEN_DESABONNEMENT]" target="_blank">Se désabonner</a></p>
                                    </td>
                                </tr>
                            </table>
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

module.exports = {orderStatusReady}
