const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY_SUN;
let storedMessage = ""; 


// j'envoi le message
const sendMsg = (req, res) => {
    const { message } = req.body;
    storedMessage = message; 
    console.log(`Message reçu et stocké: ${message}`);
    res.status(200).send({ status: 'Message reçu et stocké avec succès' });
};

// je recois le message
const receiveMsg = (req, res) => {
    if (storedMessage === "") {
        res.status(404).send({ error: 'Aucun message stocké' });
    } else {
        console.log(`Envoi du message stocké: ${storedMessage}`);
        res.status(200).send({ message: storedMessage });
    }
};


module.exports = {
    sendMsg,
    receiveMsg
  };
  