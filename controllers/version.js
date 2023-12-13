const APP_VERSION = process.env.VERSION_STORE


const versionApp = async (req, res) => {
  res.json({ version: APP_VERSION });
}

const status = (req, res) => {
  res.status(200).send({ status: 'OK' });
}

module.exports = { versionApp, status}