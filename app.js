
const express = require("express");
const routes = require("./routes/routes");
const db = require("./db/db");
const cors = require("cors");
const path = require("path");
const auth = require("./middleware/auth");
const NODEJS_PORT = process.env.NODEJS_PORT;
const NODEJS_URL = process.env.NODEJS_URL;
const bodyParser = require("body-parser");
const admin = require('firebase-admin');
const stripeWebhook = require('./controllers/payment_ctrl').stripeWebhook;

const app = express();
require('./services/cronTasks')


//Chemin vers votre fichier de configuration Firebase
// const serviceAccount = require('./firebase.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

app.use(cors());

// route stripe avant les middlewares suivants pour etre bien pris en compte par Stripe
app.post('/stripeWebhook', express.raw({ type: 'application/json' }), stripeWebhook);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
// console.log(path.join(__dirname, 'public'))

// Ici j'utilise un server Static pour les images (en local)
//a voir par la suite en réel avec peut etre une dropbox ?
// je pars des Images en local /Images vers =>
app.use("/Images", express.static(path.join(__dirname, "./Images")));
// console.log('dirname', __dirname)
// const chemin = path.join(__dirname, './Images')
// console.log('test chemin',chemin )

app.get("/resetPassword/:token", (req, res) => {
  //console.log("Route resetPassword appelée avec le token:", req.params.token);
  res.sendFile(path.join(__dirname, "./fonctions/resetpassword.html"));
});

//telechargement du catalogue
app.get("/download", (req, res) => {
  const file = path.resolve(__dirname, "./public/Catalogue.pdf");
  res.download(file);
});
app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.use(routes);


db.sync()
  .then(console.log("connexion à la base de données"))
  .catch((error) => console.log(error));

app.listen(NODEJS_PORT, () => {
  console.log(`Lancement serveur ${NODEJS_URL}:${NODEJS_PORT}`);
}); 

