const jwt = require("jsonwebtoken");
require("dotenv").config();
const axios = require("axios");
const Users = require("../models/BDD/Users");

// Fonction pour valider le format de l'email
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}

// je recois la demande de connexion de SUN
const receiveSunConnection = async (req, res) => {
  console.log("req", req.body.data);
  try {
    const data = req.body.data;
    const emailSun = data.email;
    const idSUN = data.id;

    // Validation du format de l'email
    if (!validateEmail(emailSun)) {
      return res.status(400).send({
        status: "Erreur",
        message: "Le format de l'email est invalide.",
      });
    }

    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ where: { email: emailSun } });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Erreur", message: "Utilisateur non trouvé." });
    }

    // si un user a deja un statusSun renseigné, je veux envoyé une reponse le precisant
    if (user.statusSUN) {
      return res.status(409).send({
        // Utilisation du code 409 pour indiquer un conflit
        status: "Conflit",
        message: `L'utilisateur est déja connecté à un compte pdj ou en attente de l'être.`,
      });
    }

    await user.update({
      statusSUN: "en attente",
      idSUN: idSUN,
      emailSun: emailSun
    });
    // console.log(`Utilisateur trouvé:`, user);
    res.status(200).send({
      status: "Succès",
      message: "Message reçu et utilisateur trouvé avec succès.",
      user,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).send({
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
    console.error("Erreur lors de la récupération du statusSUN", error);
    res.status(500).send({
      message: "Erreur lors de la vérification.",
    });
  }
};

// envoi la confirmation de link vers sun (sun -> pdj)
const sendConfirmLink = async (req, res) => {
  const { userId, idSUN } = req.body;

  try {
    const apiUrl = process.env.CONFIRM_LINK_FROM_SUN;
    const response = await axios.post(apiUrl, {
      userId,
      idSUN,
    });

    const user = await Users.findOne({ where: { userId: userId } });

    if (response.data.status === "success") {
      console.log("Confirmé");

      await user.update({
        statusSUN: "confirmé",
      });

      res.status(200).send({
        status: "success",
        message: "confirmation avec succes.",
        user,
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du message à l'API externe:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// Refus du link sun
const sendCancelLink = async (req, res) => {
  const { idSUN, userId } = req.body;

  try {
    const apiUrl = process.env.CANCEL_LINK_FROM_SUN;
    const response = await axios.post(apiUrl, {
      idSUN,
    });

    const user = await Users.findOne({ where: { userId: userId } });

    console.log("Réponse de l'API Sun:", response.data);

    if (response.data.status === "success") {
      await user.update({
        statusSUN: null,
        idSUN: null,
      });

      console.log("Confirmé");

      res.status(200).send({
        status: "success",
        message: "annulation avec succes.",
        user,
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du message à l'API externe:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};

// Annulation de la demande en cours de link Sun

// Demande de link PDJ -> SUN
const sendConnexionRequest = async (req, res) => {
  const { userId, email } = req.body;

  // console.log('req', req.body)
  try {
    const apiUrl = process.env.DEMAND_LINK_TO_SUN;
    const response = await axios.post(apiUrl, {
      userId,
      email,
    });

    const user = await Users.findOne({ where: { userId: userId } });

    if (response.data.status === "success") {
      console.log("Demande En attente");

      await user.update({
        statusSUN: "en attente",
        emailSun: email,
      });
      res.status(200).send({
        status: "success",
        message: "Data envoyé avec succes.",
        user,
      });
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du message à l'API externe:",
      error.response ? error.response.data : error.message
    );
    res.status(500).send({
      message: "Erreur lors de l'envoi.",
    });
  }
};

// confirmation de link pdj -> sun
const receiveConfirmationFromSun = async (req, res) => {
  // console.log("req", req.body.data);

  const data = req.body.data;
  const userId = data.idPdj;
  const idSUN = data.idSun;

  try {
    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ where: { userId: userId } });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Erreur", message: "Utilisateur non trouvé." });
    }

    await user.update({
      statusSUN: "confirmé",
      idSUN: idSUN,
    });
    res.status(200).send({
      status: "success",
      message: "Confirmation de sun.",
      user,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).send({
      status: "error",
      message: "Erreur lors du traitement de la requête.",
    });
  }
};

//annulation de Sun suite à la demande de connexion de Pdj
const receiveCancellationFromSun = async (req, res) => {
  // console.log("req", req.body.data);

  const data = req.body.data;
  const userId = data.idPdj;

  try {
    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ where: { userId: userId } });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Erreur", message: "Utilisateur non trouvé." });
    }

    await user.update({
      statusSUN: null,
      emailSun: null,
    });
    res.status(200).send({
      status: "success",
      message: "Annulation de sun.",
      user,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).send({
      status: "Erreur",
      message: "Erreur lors du traitement de la requête.",
    });
  }
};

// annulation de sun suite à la demande de connexion coté SUN
const receiveDenialFromSun = async (req, res) => {
  // console.log("req", req.body.data);

  const data = req.body.data;
  const idSUN = data.idSun;

  try {
    // Recherche de l'utilisateur par email
    const user = await Users.findOne({ where: { idSUN: idSUN } });
    if (!user) {
      return res
        .status(404)
        .send({ status: "Erreur", message: "Utilisateur non trouvé." });
    }

    await user.update({
      statusSUN: null,
      idSUN: null,
      emailSun: null
    });
    res.status(200).send({
      status: "success",
      message: "Annulation de sun.",
      user,
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).send({
      status: "Erreur",
      message: "Erreur lors du traitement de la requête.",
    });
  }
};
module.exports = {
  sendConfirmLink,
  receiveSunConnection,
  getStatusSun,
  sendCancelLink,
  sendConnexionRequest,
  receiveConfirmationFromSun,
  receiveCancellationFromSun,
  receiveDenialFromSun
};
