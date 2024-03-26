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

// verification du statusSUN
const getStatusSun = async (req, res) => {

  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).send({ message: "Le paramètre userId est requis." });
  }

  try {
    const user = await Users.findOne({ where: { userId: userId } });

    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    const statusSUN = user.statusSUN;

    res.send({ statusSUN: statusSUN });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du statusSUN",
      error
    );
    res
      .status(500)
      .send({
        message:
          "Erreur lors de la vérification.",
      });
  }
};

// envoi vers sun
const sendMsgToSun = async (req, res) => {

  const { userId, idSUN } = req.body;

  try {
    const apiUrl = process.env.API_SUN;
    const response = await axios.post(apiUrl, {
      userId, 
      idSUN
    });

    const user = await Users.findOne({ where: { userId: userId } });

    if (response.data.status === 'success') { 
      console.log("Confirmé");
      
      await user.update({
        statusSUN: "confirmé",
      });
    }
    if (response.data.status === 'error') { 
      console.log("erreur de data");
    }

    // res.status(200).send({
    //   status: 'success',
    //   message: 'Message bien reçu par l\'API externe',
    //   data: response.data
    // });
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du message à l'API externe:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};


// je vide le statusSUN et idSun de ma table User
const clearStatusSun = async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).send({ message: "Le paramètre userId est requis." });
  }

  try {
    const user = await Users.findOne({ where: { userId: userId } });

    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    await user.update({
      statusSUN: null,
      idSUN: null
    });

    res.send({ message: "Le statusSUN et l'idSUN ont été réinitialisés avec succès." });
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du statusSUN et de l'idSUN", error);
    res.status(500).send({
      message: "Erreur lors de la réinitialisation."
    });
  }
};


module.exports = {
  sendMsgToSun,
  receiveMsg,
  getStatusSun,
  clearStatusSun
};
