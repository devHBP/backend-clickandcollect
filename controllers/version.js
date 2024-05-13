const APP_VERSION = process.env.VERSION_STORE;
const Users = require("../models/BDD/Users.js");

const versionApp = async (req, res) => {
  res.json({ version: APP_VERSION });
};

const status = (req, res) => {
  let maintenanceMode = process.env.MODE_MAINTENANCE;
  res.json({ maintenanceMode });
};

const checkAntiGaspi = (req, res) => {
  let now;
  // Vérifier si un paramètre de requête `testTime` est fourni et l'utiliser comme heure actuelle pour le test
  // heure simulée pour le test Jest
  if (req.query.testTime) {
    now = new Date(req.query.testTime);
  } else {
    now = new Date();
  }
  // console.log("now", now);
  const hour = now.getHours();

  // L'offre est accessible à partir de 21h
  if (hour >=11 && hour < 24) {
    res.json({ accessible: true });
  } else {
    res.json({
      accessible: false,
      message: "L'offre n'est pas encore disponible",
    });
  }
};
const getUserVersion = async (req, res) => {
  // console.log(req.query);

  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).send({ message: "Le paramètre userId est requis." });
  }

  try {
    const user = await Users.findOne({ where: { userId: userId } });

    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    const versionApp = user.versionApp;

    res.send({ versionApp: versionApp });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de la version de l'application pour l'utilisateur:",
      error
    );
    res
      .status(500)
      .send({
        message:
          "Erreur lors de la récupération de la version de l'application.",
      });
  }
};

const updateVersion = async (req, res) => {
  // console.log(req.body);

  const userId = req.body.userId;
  const versionApp = req.body.versionApp;

  if (!userId) {
    return res
      .status(400)
      .send({ message: "Les données userId et versionApp sont requises." });
  }

  try {
    const user = await Users.findOne({ where: { userId: userId } });

    if (!user) {
      return res.status(404).send({ message: "Utilisateur non trouvé." });
    }

    await user.update({ versionApp: versionApp });

    res.send({
      message: `Version de l'application mise à jour avec succès: ${versionApp}. pour le user ${userId}`,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour de la version de l'application:",
      error
    );
    res
      .status(500)
      .send({
        message:
          "Erreur lors de la mise à jour de la version de l'application.",
      });
  }
};

module.exports = {
  versionApp,
  status,
  checkAntiGaspi,
  updateVersion,
  getUserVersion,
};
