const Users = require('../models/BDD/Users')
const Token = require('../models/BDD/Token')



const saveToken = async (req, res) => {
    const { userId, fcmToken } = req.body;
  
    try {
      // Vérifier si un token existe déjà pour cet utilisateur
      const existingToken = await Token.findOne({ where: { userId: userId } });
  
      if (existingToken) {
        // Mise à jour du token existant
        await existingToken.update({ fcmToken });
      } else {
        // Création d'un nouveau token
        await Token.create({ userId, fcmToken });
      }
  
      res.send('Token enregistré avec succès.');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du token', error);
      res.status(500).send('Erreur interne du serveur');
    }
  }
  

module.exports = { saveToken  }