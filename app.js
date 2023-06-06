const express = require('express')
const routes = require('./routes/routes')
const db = require('./db/db')
var cors = require('cors')
const path = require('path')
const auth = require("./middleware/auth");

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)


// Ici j'utilise un server Static pour les images (en local)
//a voir par la suite en réel avec peut etre une dropbox ?
// je pars des Images en local /Images vers => 
app.use('/Images', express.static(path.join(__dirname, './Images')));
console.log('dirname', __dirname)
// const chemin = path.join(__dirname, './Images')
// console.log('test chemin',chemin )

db.sync()
    .then(
        console.log('connexion à la base de données'),
        )
    .catch(error => console.log(error))


app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.listen(8080, () => console.log('connexion !!'))