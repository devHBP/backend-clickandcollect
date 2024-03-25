const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");


const SUN_KEY = process.env.SUN_KEY;



// je recois le message
const receiveMsg = (req, res) => {

  // if (!req.body.message) {
  //     return res.status(400).send({ status: 'Erreur', message: 'Un message est requis.' });
  // }
  // const { message } = req.body;
  // console.log(`Message reçu:`,  message);
  // res.status(200).send({ status: 'Succès', message: 'Message reçu avec succès.' });

 console.log(`Req.body:`, req.body);




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
