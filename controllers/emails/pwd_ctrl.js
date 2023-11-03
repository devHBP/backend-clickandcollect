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


const forgotPassword = async (req, res) => {
    try {
        const { email: userEmail, firstname: userFirstname } = req.body;
        const lien_application_android = "https://play.google.com/store/apps/details?id=com.myappreactnative&pli=1";
        const lien_application_ios = "https://apps.apple.com/fr/app/le-pain-du-jour-click-collect/id6464316999"
        const paiement = "https://preprod.lepaindujour.io/paiement.png"
        const sav = "https://preprod.lepaindujour.io/sav.png"
        const location = "https://preprod.lepaindujour.io/location.png"
        const lienRGPD = "https://www.lepaindujour.io/page-de-confidentialite/";
        const desabonnement = "https://www.lepaindujour.io/formulaire-de-suppression-des-donnees-personnelles/"

        // 1. Vérifiez si l'utilisateur existe
        const user = await Users.findOne({ where: { email: userEmail } });
  
        if (!user) {
            return res.status(404).send('Aucun utilisateur trouvé avec cette adresse e-mail.');
        }

        // 2. Générer un token JWT
        const token = jwt.sign({ id: user.userId }, SECRET, { expiresIn: '1h' });
        
        // 3. Envoyer l'e-mail avec SendGrid
        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        // const msg = {
        //     to: userEmail,
        //     from: 'resetpwdapp@gmail.com',
        //     subject: 'Réinitialisation de votre mot de passe',
        //     html: `
        //         <p>Vous avez demandé la réinitialisation du mot de passe pour votre compte.</p>
        //         <p>Veuillez cliquer sur le lien suivant ou copiez-le dans votre navigateur pour compléter le processus :</p>
        //         <br>
        //         <a href="http://${NODEJS_URL}:${NODEJS_PORT}/resetPassword/${token}">Réinitialiser le mot de passe</a>
        //         <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet e-mail et votre mot de passe restera inchangé.</p>
        //     `
        // };


        const msg = {
            to: userEmail,
            from: 'contact@lepaindujour.io',
            subject: 'Réinitialisation de votre mot de passe',
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Le Pain du Jour - Réinitialisation du Mot de Passe</title>
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
                    .button {
                        display: inline-block;
                        background-color: #E9520E;
                        color: #FFFFFF;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                        text-decoration: none;
                        margin-top: 10px;
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
                                        <h1 style="font-size: 24px; margin-bottom: 20px;">Bonjour ${userFirstname},</h1>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Nous avons reçu une demande de réinitialisation du mot de passe pour ton compte sur l'application Click & Collect Pain du Jour.</p>
                                        <h2 style="font-size: 18px; margin-bottom: 10px;">Instructions pour Réinitialiser Ton Mot de Passe :</h2>
                                        <p style="font-size: 16px; margin-bottom: 10px;">
                                            Clique sur le lien ci-dessous pour accéder à la page de réinitialisation du mot de passe :
                                        </p>
                                        <a href="https://preprod.lepaindujour.io/resetPassword/${token}" class="button" target="_blank">Réinitialiser le mot de passe</a>

                                        <p style="font-size: 16px; margin-top: 20px;">
                                            ou utilise le code : https://preprod.lepaindujour.io/resetPassword/${token}
                                        </p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            Sur la page de réinitialisation du mot de passe, suit les instructions pour créer un nouveau mot de passe sécurisé.<br>
                                            Assures-toi que ton nouveau mot de passe soit suffisamment fort en utilisant une combinaison de lettres majuscules, de lettres minuscules, de chiffres et de caractères spéciaux.
                                        </p>
                                        <h2 style="font-size: 18px; margin-bottom: 10px;">Pourquoi Tu Dois Réinitialiser Ton Mot de Passe :</h2>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            La sécurité de ton compte est une priorité pour nous, et la réinitialisation du mot de passe est une mesure de sécurité essentielle pour protéger tes informations personnelles.<br>
                                            En réinitialisant ton mot de passe, tu assures la confidentialité et la sécurité de ton compte.
                                        </p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                           <i> Si tu n'as pas demandé la réinitialisation du mot de passe ou si tu rencontres des problèmes avec cette procédure, n'hésites pas à nous contacter immédiatement en répondant à cet e-mail ou en utilisant nos informations de contact ci-dessous.<br>
                                            Nous sommes là pour t'aider.
                                            </i>
                                        </p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">
                                            Nous espérons que tu pourras rapidement retrouver l'accès à ton compte et continuer à profiter de notre application Click & Collect Pain du Jour.
                                        </p>
                                        <p style="font-size: 16px; margin-bottom: 20px;">Merci pour ta confiance et nous aider à préserver la sécurité de ton compte !</p>
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
            `
        };
        
        await sgMail.send(msg);
        return res.status(200).send("E-mail envoyé avec succès");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur du serveur");
    }
}


const resetPassword = async (req, res) => {

    try {
        const token = req.params.token;
        let decoded;
        try {
            decoded = jwt.verify(token, SECRET);
        } catch (err) {
            console.error("Erreur JWT:", err.message);
            return res.status(400).send('Token invalide ou expiré.');
        }
        
        const userId = decoded.id;
        
        // Trouvez l'utilisateur par son ID
        const user = await Users.findOne({ where: { userId: userId } });
        if (!user) {
            return res.status(400).send('Utilisateur introuvable.');
        }
        
        if (!req.body.newPassword) {
            return res.status(400).send('Le nouveau mot de passe est requis.');
        }
        // Mettre à jour le mot de passe de l'utilisateur
        const hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        // return res.status(200).send("Mot de passe mis à jour avec succès");
        return res.redirect('/redirect.html');
    } catch (error) {
        console.log(error);
        return res.status(500).send("Erreur du serveur");
    }
}

const updatePassword = async (req, res) => {
    try {
        const { body } = req;
        const { userId, newPassword } = body;
  
        const { error } = passwordUpdateValidation(body);
  
        if (error) {
            throw { status: 400, message: "Validation error", details: error.details };
        }
  
        // Trouvez l'utilisateur par son ID
        const user = await Users.findByPk(userId);
  
        if (!user) {
            throw { status: 404, message: "User not found" };
        }
  
        // Hasher le nouveau mot de passe et mettre à jour dans la base de données
        const passwordHash = await bcrypt.hash(newPassword, 12);
        user.password = passwordHash;
  
        await user.save();
  
        res.status(200).json({ message: "Password updated successfully" });
  
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message: err.message, details: err.details || undefined });
    }
  };
  

module.exports = {forgotPassword, resetPassword , updatePassword}

