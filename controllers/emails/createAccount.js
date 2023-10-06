const crypto = require('crypto');
const bcrypt = require('bcrypt')
const Users = require('../../models/BDD/Users')

const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const NODEJS_URL = process.env.NODEJS_URL;
const NODEJS_PORT = process.env.NODEJS_PORT;
const { passwordUpdateValidation } = require('../../validation/uservalidation');


const createAccountEmail = async (req, res) => {
    try {
        const { email, firstname, date } = req.body;
        const nom_application = "Le Pain du Jour - ClickAndCollect"
        const lien_application_android = "https://play.google.com/store/apps/details?id=com.myappreactnative&pli=1";
        const lien_application_ios = "https://apps.apple.com/fr/app/le-pain-du-jour-click-collect/id6464316999"

        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const msg = {
            to: email,
            from: 'contact@lepaindujour.io',
            subject: `Bienvenue chez ${nom_application}`,
            html: `
                        <!DOCTYPE html>
            <html>
            <head>
                <title>Bienvenue chez [Nom de Votre Application]</title>
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
                    ul {
                        list-style-type: none;
                        padding: 0;
                    }
                    li {
                        margin-bottom: 10px;
                        font-size: 16px;
                    }
                    li::before {
                        content: "${'\u2022'}";
                        color: #E9520E;
                        display: inline-block;
                        width: 1em;
                        margin-left: -1em;
                    }
                    .button {
                        background-color: #E9520E;
                        color: #FFFFFF;
                        padding: 10px 20px;
                        border-radius: 5px;
                        text-decoration: none;
                        font-weight: bold;
                    }
                    .thank-you {
                        font-style: italic;
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
                                        <h1 style="font-size: 24px; margin-bottom: 20px;">Bienvenue ${firstname},</h1>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Nous sommes ravis de vous accueillir sur ${nom_application} ! Ton compte a été créé avec succès, et nous sommes impatients de t'offrir une expérience exceptionnelle.</p>
                                        <h2 style="font-size: 18px; margin-bottom: 10px;">Détails de Ton Compte :</h2>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            <strong>Nom d'Utilisateur :</strong> ${email}<br>
                                            <strong>Date de Création du Compte :</strong> ${date}
                                        </p>
                                        <h2 style="font-size: 18px; margin-bottom: 10px;">Les Avantages de ton Compte :</h2>
                                        <ul>
                                            <li>Facilité de Commande : Avec ton compte, tu peux passer des commandes en quelques clics, enregistrer tes informations de paiement et de livraison pour gagner du temps.</li>
                                            <li>Suivi de Commande : tu pourras suivre l'état de tes commandes en temps réel.</li>
                                            <li>Personnalisation : Nous adaptons nos offres et nos recommandations en fonction de tes préférences pour t'offrir une expérience sur mesure.</li>
                                        </ul>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                        <p>Téléchargez notre application: </p>
                                        <a href=${lien_application_android} target="_blank" class="button">Sur Android</a>
                                        <a href=${lien_application_ios} target="_blank" class="button">Sur iOS</a>                       
                                        </p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            Connectez-vous à votre compte en utilisant les informations d'identification que vous avez fournies lors de la création de votre compte.
                                        </p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            Parcourez notre gamme de produits/services et commencez à profiter de tout ce que ${nom_application} a à offrir !
                                        </p>
                                        <p class="thank-you" style="font-size: 16px; margin-bottom: 20px;">Merci pour ta confiance et nous sommes impatients de pouvoir te régaler !</p>
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

module.exports = { createAccountEmail }
