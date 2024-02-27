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
function decryptMessage(encryptedMessage, secretKey) {
  // Convertit la clé secrète et l'IV de la représentation hexadécimale à un Buffer

  const iv = Buffer.from(encryptedMessage.iv, 'base64');
  const encryptedText = Buffer.from(encryptedMessage.encryptedData, 'base64');
  console.log('iv fonction', iv)
  // Crée un déchiffreur avec l'algorithme AES-256-CBC, la clé secrète et l'IV
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "hex"),
    iv
  );

  let decrypted;
  try {
    decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
  } catch (error) {
    console.error("Erreur lors du déchiffrement du message dans la fonction:", error);
    throw error; // Pour propager l'erreur et permettre son traitement ultérieur
  }
  // Convertit le Buffer déchiffré en chaîne de caractères et le retourne
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

  // Assurez-vous que le corps de la requête contient les données nécessaires pour le déchiffrement
  if (!req.body.iv || !req.body.encryptedData) {
    return res
      .status(400)
      .send({
        status: "Erreur",
        message: "Le message chiffré et l'IV sont requis.",
      });
  }

  // Extrait les données chiffrées et l'IV du corps de la requête
  const encryptedMessage = {
    // iv: Buffer.from(req.body.iv, 'base64'),
    iv: req.body.iv,
    encryptedData: req.body.encryptedData,
  };

  console.log("iv receivedMsg", encryptedMessage.iv)

  // Tente de déchiffrer le message
  try {
    const decryptedMessage = decryptMessage(encryptedMessage, SUN_KEY);
    console.log(`Message déchiffré:`, decryptedMessage);

    res
      .status(200)
      .send({
        status: "Succès",
        message: "Message reçu et déchiffré avec succès.",
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
