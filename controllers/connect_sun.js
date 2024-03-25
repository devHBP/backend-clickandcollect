const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");
const Users = require("../models/BDD/Users");

const SUN_KEY = process.env.SUN_KEY;

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
    const data = JSON.parse(req.body.data); 

    console.log('data', data)
    const email = data.email;
    const idSUN = data.id

    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Erreur", message: "Utilisateur non trouvé." });
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
        error: error.message,
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
