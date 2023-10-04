const crypto = require('crypto');
const bcrypt = require('bcrypt')
const Users = require('../models/BDD/Users')

const sgMail = require('@sendgrid/mail');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;
const NODEJS_URL = process.env.NODEJS_URL;
const NODEJS_PORT = process.env.NODEJS_PORT;
const { passwordUpdateValidation } = require('../validation/uservalidation');


const forgotPassword = async (req, res) => {
    try {
        const userEmail = req.body.email;

        // 1. Vérifiez si l'utilisateur existe
        const user = await Users.findOne({ where: { email: userEmail } });
        console.log(user)
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
            from: 'resetpwdapp@gmail.com',
            subject: 'Réinitialisation de votre mot de passe',
            html: `
                <p>Vous avez demandé la réinitialisation du mot de passe pour votre compte.</p>
                <p>Veuillez cliquer sur le lien suivant ou copiez-le dans votre navigateur pour compléter le processus :</p>
                <br>
                <a href="http://127.0.0.1:8080/resetPassword/${token}">Réinitialiser le mot de passe</a>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet e-mail et votre mot de passe restera inchangé.</p>
            `
        };
        //Attention ici configuré pour android : 10.0.2.2
        // <a href="http://10.0.2.2:8080/resetPassword/${token}">Réinitialiser le mot de passe</a>

        
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

