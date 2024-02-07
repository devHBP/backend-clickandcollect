const APP_VERSION = process.env.VERSION_STORE;

const versionApp = async (req, res) => {
  res.json({ version: APP_VERSION });
};

const status = (req, res) => {
  let maintenanceMode = process.env.MODE_MAINTENANCE;
  res.json({ maintenanceMode });
};

module.exports = { versionApp, status };
