const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const Users = require('../../models/BDD/Users');
const Products = require('../../models/BDD/Produits');


const PASSWORD = process.env.PASSWORD;
const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const USERNAME = process.env.USERNAME;
const CONTACT_EMAILS = process.env.CONTACT_EMAILS;

const sendPreparationAlert = async (order, orderProducts) => {
    try{
        const anticipationProducts = await Products.findAll({
            where: {
                productId: orderProducts.map((p) => p.productId),
                gere_a_lentrepot: true
            },
            attributes: ["libelle", "productId"]
        });

        const dateOrder = new Date(order.date);
        const day = String(dateOrder.getUTCDate()).padStart(2, '0'); 
        const month = String(dateOrder.getUTCMonth() + 1).padStart(2, '0'); 
        const year = dateOrder.getUTCFullYear();

        const formattedDateOrder = `${day}-${month}-${year}`;


        if (anticipationProducts.length === 0) {
            console.log("Aucun produit nécessitant une anticipation.");
            return;
        }

        const productsTableRows = anticipationProducts.map(p =>
            `<tr>
                <td style="padding: 8px; border: 1px solid #ddd;">${p.libelle}</td>
                <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${orderProducts.find(op => op.productId === p.productId).quantity}</td>
            </tr>`
        ).join('');


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
            subject: `⚠️ Préparation Anticipée - Commande #${order.orderId}`,
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
                            <img src="https://www.lepaindujour.io/wp-content/uploads/2023/10/logo.png" 
                                alt="Le Pain du Jour" 
                                style="display: block; width: 100%; max-width: 600px; height: auto;">
                        </td>
                    </tr>
                    <td align="center" style="padding: 20px;">
                        <td align="center" style="padding: 20px;">
                            <h2>Commande urgente à anticiper</h2>
                            <p><strong>Numéro de commande :</strong> #${order.orderId}</p>
                            <p>Doit être prête pour le : ${formattedDateOrder}</p>
                            <h3>🛠 Produits à anticiper :</h3>
                            <table>
                                <tr>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                </tr>
                                ${productsTableRows}
                            </table>
                        </td>
                    </tr>
            </table>
    
            </body>
            </html>
            `
        };

        transporter.verify(function(error, success){
            if(error){
                console.log("Erreur Smtp");
            }else {
                console.log("SMTP prêt à envoyer des emails");
            }
        })

        if(!CONTACT_EMAILS){
            console.error('MAILS_CONTACT is not set');
            return 'Configuration error: MAILS_CONTACT missing';
        }
        const contacts = CONTACT_EMAILS.split(',').map(email => email.trim());

        for (const contactEmail of contacts){
            await transporter.sendMail({ ...mailOptions, to: contactEmail });
            console.log(`Email envoyé à ${contactEmail}`);
        }
        return 'Emails envoyés avec succès.';
    } catch (error){
        console.error("Erreur lors de l'envoi de l'email: " , error);
        return "Erreur interne";
    }
}

module.exports = { sendPreparationAlert }