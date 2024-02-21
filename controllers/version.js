const APP_VERSION = process.env.VERSION_STORE;

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
  console.log('now', now)
  const hour = now.getHours();

  // L'offre est accessible à partir de 21h
  if (hour >= 21 && hour < 24) {
    res.json({ accessible: true });
  } else {
    res.json({
      accessible: false,
      message: "L'offre n'est pas encore disponible",
    });
  }
};

module.exports = { versionApp, status, checkAntiGaspi };
