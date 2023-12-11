const APP_VERSION = process.env.VERSION_STORE


const versionApp = async (req, res) => {
  res.json({ version: APP_VERSION });
}

module.exports = { versionApp}