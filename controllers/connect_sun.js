const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");
const Users = require("../models/BDD/Users");

const SUN_KEY = process.env.SUN_KEY;


// Fonction pour valider le format de l'email
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// je recois le message
const receiveMsg = async (req, res) => {
  // if (!req.body.message) {
  //     return res.status(400).send({ status: 'Erreur', message: 'Un message est requis.' });
  // }
  // const { message } = req.body;
  // console.log(`Message reçu:`,  message);
  // res.status(200).send({ status: 'Succès', message: 'Message reçu avec succès.' });

  console.log("req", req.body.data);
  try {
    const data = req.body.data; 
    const email = data.email;
    const idSUN = data.id

    // Validation du format de l'email
    if (!validateEmail(email)) {
      return res.status(400).send({ status: "Erreur", message: "Le format de l'email est invalide." });
    }

    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Erreur", message: "Utilisateur non trouvé." });
    }

    // si un user a deja un statusSun renseigné, je veux envoyé une reponse le precisant
    if (user.statusSUN) {
      return res.status(409).send({ // Utilisation du code 409 pour indiquer un conflit
        status: "Conflit",
        message: `L'utilisateur est déja connecté à un compte pdj ou en attente de l'être.`
      });
    }

    await user.update({
      statusSUN: "en attente",
      idSUN: idSUN 
    });
    console.log(`Utilisateur trouvé:`, user);
    res
      .status(200)
      .send({
        status: "Succès",
        message: "Message reçu et utilisateur trouvé avec succès.",
        user,
      });
  } catch (error) {
    console.error("Erreur:", error);
    return res
      .status(500)
      .send({
        status: "Erreur",
        message: "Erreur lors du traitement de la requête.",
      });
  }
};

// envoi vers sun
const sendMessageToExternalAPI = async (message) => {
  try {
    const apiUrl = process.env.API_SUN;
    const response = await axios.post(apiUrl, {
      message: message,
    });
    console.log("Réponse de l'API externe:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du message à l'API externe:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// j'envoi le message
const sendMsg = async (req, res) => {
  const { message } = req.body;
  const result = await sendMessageToExternalAPI(message);
  if (result) {
    res.status(200).send({
      status: "Message envoyé avec succès à l'API externe",
      message: message,
      response: result,
    });
  } else {
    res
      .status(500)
      .send({ error: "Échec de l'envoi du message à l'API externe" });
  }
};

module.exports = {
  sendMsg,
  receiveMsg,
};
