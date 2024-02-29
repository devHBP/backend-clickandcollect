const nodemailer = require("nodemailer");

require("dotenv").config();

const PASSWORD = process.env.PASSWORD;
const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const USERNAME = process.env.USERNAME;

const refundArticle = async (req, res) => {
  try {
    const { orderId, client, date, articles } = req.body;
    const lienRGPD = "https://www.lepaindujour.io/page-de-confidentialite/";
    const desabonnement =
      "https://www.lepaindujour.io/formulaire-de-suppression-des-donnees-personnelles/";
    const paiement = "https://preprod.lepaindujour.io/paiement.png";
    const sav = "https://preprod.lepaindujour.io/sav.png";
    const location = "https://preprod.lepaindujour.io/location.png";
    const lien_application_android =
      "https://play.google.com/store/apps/details?id=com.myappreactnative&pli=1";
    const lien_application_ios =
      "https://apps.apple.com/fr/app/le-pain-du-jour-click-collect/id6464316999";

    let transporter = nodemailer.createTransport({
      host: HOSTNAME,
      port: PORT,
      secure: true,
      auth: {
        user: USERNAME,
        pass: PASSWORD,
      },
    });

    // Générez la liste des produits
    let productListHtml = articles.map(article => 
        `<li>${article.qty} x ${article.libelle} au prix de ${article.prix_unitaire} euros</li>`
      ).join('');

    const mailOptions = {
      from: USERNAME,
      // remettre ici le mail 2
      to: [
        process.env.EMAIL1,
        process.env.EMAIL1
    ],
      subject: "Demande de remboursement",
      html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Le Pain du Jour - Remboursement à effectuer sur Stripe </title>
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
                            <p style="margin: 10px 0; font-size: 14px;"> Ceci est un test - Ne pas en tenir compte</p>
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #fff; border-radius: 8px; overflow: hidden;">
                                <tr>
                                    <td  style="padding: 40px;">
                                        <p style="margin: 10px 0; font-size: 14px;"> Client à rembourser : ${client}</p>
                                        <p style="margin: 10px 0; font-size: 14px;">Numéro de commande à rembourser : commande N° ${orderId}</p>
                                        <p style="margin: 10px 0; font-size: 14px;"> Date de la commande : ${date}</p>
                                        <p style="margin: 10px 0; font-size: 14px;"> Produits à rembourser :</p>
                                        <ul>${productListHtml}</ul>
                                    </td>
                                </tr>
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
                        </td>
                    </tr>
                </table>
            </body>
            </html>
            `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
    });

    return res.status(200).send("E-mail envoyé avec succès");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erreur du serveur");
  }
};

module.exports = { refundArticle };
