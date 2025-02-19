const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const Users = require('../../models/BDD/Users');

const PASSWORD = process.env.PASSWORD;
const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const USERNAME = process.env.USERNAME;
const CONTACTS_EMAIL = process.env.CONTACTS_EMAIL;

const orderAnticipation = async (req, res) => {
    try{
        const { email, firstname , lastname, numero_commande, date, point_de_vente} = req.body;
        const numeroCommande = numero_commande.substring(numero_commande.length - 5);

        const dateObj = new Date(date);
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

        let transporter = nodemailer.createTransport({
            host: HOSTNAME,
            port: PORT,
            secure: true,
            auth: {
                user: USERNAME,
                pass: PASSWORD
            },
        });

        const mailOptions = {
            from: USERNAME,
            subject: 'Commande à Anticiper',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Le Pain du Jour - Commande à anticiper</title>
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
                                <h2 style="font-size: 24px; margin-bottom: 20px;">Une commande importante à été passée par : ${firstname} ${lastname},</h2>
                                <p style="font-size: 16px; margin-bottom: 20px;">N° de Commande: <strong>${numeroCommande}</strong> !</p>
                                <p style="font-size: 16px; margin-bottom: 20px;">Point de Livraison: <strong>${point_de_vente}</strong> !</p>
                            </td>
                        </tr>
                    </tr>
            </table>
    
            </body>
            </html>
            `
        };
        if(!CONTACTS_EMAIL){
            console.error('MAILS_CONTACT is not set');
            return res.status(500).send('Configuration error: MAILS_CONTACT missing')
        }
        const contacts = CONTACTS_EMAIL.split(',').map(email => email.trim());

        for (const contactEmail of contacts){
            await transporter.sendMail({ ...mailOptions, to: contactEmail });
            console.log(`Email envoyé à ${contactEmail}`);
        }
        return res.status(200).send('Emails envoyés avec succès.');
    } catch (error){
        console.error("Erreur lors de l'envoi de l'email: " , error);
        return res.status(500).send("Erreur interne");
    }
}

module.exports = { orderAnticipation }