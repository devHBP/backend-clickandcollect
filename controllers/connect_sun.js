const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
const crypto = require("crypto");


const SUN_KEY = process.env.SUN_KEY;

/**
 * Fonction pour déchiffrer un message chiffré avec AES-256-CBC.
 *
 * @param {Object} encryptedMessage - Un objet contenant l'IV et les données chiffrées.
 * @param {string} secretKey - La clé secrète utilisée pour le déchiffrement.
 * @returns {string} Le message déchiffré.
 */
function decryptMessage(encryptedData) {
  const key = Buffer.from(SUN_KEY, 'base64'); // Assurez-vous que SUN_KEY est correctement formaté
  
  // Laravel encode le résultat en Base64, donc décodez-le d'abord
  const dataBuffer = Buffer.from(encryptedData, 'base64');
  
  // Laravel utilise également un IV, qui est typiquement au début du payload chiffré
  // La taille de l'IV pour AES-256-CBC est toujours de 16 octets
  let iv = dataBuffer.slice(0, 16);
  let encryptedText = dataBuffer.slice(16);
  
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encryptedText);
  
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// je recois le message
const receiveMsg = (req, res) => {

  // if (!req.body.message) {
  //     return res.status(400).send({ status: 'Erreur', message: 'Un message est requis.' });
  // }
  // const { message } = req.body;
  // console.log(`Message reçu:`,  message);
  // res.status(200).send({ status: 'Succès', message: 'Message reçu avec succès.' });

 console.log(`Req.body:`, req.body);



  // Tente de déchiffrer le message
  try {
    const decryptedMessage = decryptMessage(req.body.encryptedData);
    console.log(`Message déchiffré:`, decryptedMessage);

    res
      .status(200)
      .send({
        status: "Succès",
        message: "Message reçu et déchiffré avec succès.",
        decryptedData: decryptedMessage
      });
  } catch (error) {
    console.error("Erreur:", error);
    console.error("Erreur lors du déchiffrement du message:", error.message);
    return res
      .status(500)
      .send({
        status: "Erreur",
        message: "Erreur lors du déchiffrement du message.",
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
