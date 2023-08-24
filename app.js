const express = require('express')
const routes = require('./routes/routes')
const db = require('./db/db')
var cors = require('cors')
const path = require('path')
const auth = require("./middleware/auth");
const WebSocket = require('ws')
const NODEJS_PORT = process.env.NODEJS_PORT;
const NODEJS_URL = process.env.NODEJS_URL;

const bodyParser = require('body-parser');

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes)


app.use(express.static(path.join(__dirname, 'public')));


// Ici j'utilise un server Static pour les images (en local)
//a voir par la suite en réel avec peut etre une dropbox ?
// je pars des Images en local /Images vers => 
app.use('/Images', express.static(path.join(__dirname, './Images')));
console.log('dirname', __dirname)
// const chemin = path.join(__dirname, './Images')
// console.log('test chemin',chemin )

app.get('/resetPassword/:token', (req, res) => {
  //console.log("Route resetPassword appelée avec le token:", req.params.token);
  res.sendFile(path.join(__dirname, './fonctions/resetpassword.html'));
});

//telechargement du catalogue
app.get('/download', (req, res) => {
  const file = path.resolve(__dirname, './public/Catalogue.pdf');
  res.download(file);  
});


db.sync()
    .then(
        console.log('connexion à la base de données'),
        )
    .catch(error => console.log(error))


app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

//app.listen(8080, () => console.log('connexion !!'))

// let NODEJS_URL = "localhost";
// let NODEJS_PORT;

// if (process.env.NODE_ENV === 'preprod') {
//   NODEJS_PORT = "8090"
// } else {
//   NODEJS_PORT = "8080"
// }

const server = app.listen(NODEJS_PORT, () => {
  console.log(`Lancement serveur ${NODEJS_URL}:${NODEJS_PORT}`);
});

const wss = new WebSocket.Server({server})
const { updateStatus, allOrders}  = require('./controllers/order_ctrl.js')

wss.on('connection', socket => {
  console.log('WebSocket connection established.');

  socket.on('message', async message => {
    console.log('Received WebSocket message:', message);

    try {
      const { type, data } = JSON.parse(message);
      
      // Vérifiez que le type de message est correct
      if (type === 'updatedOrder') {
        const { orderId, status } = data;
        
        // Appeler la fonction updateOrderStatus
        const updatedOrder = await updateStatus(orderId, status);
        
        // Créez un message à envoyer aux autres clients
        const updatedOrderMessage = JSON.stringify({
          type: 'updatedOrder',
          data: updatedOrder,
        });

        // Envoyer le message à tous les autres clients
        wss.clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(updatedOrderMessage);
          }
        });
      }

      if (type === 'newOrder'){
        // Call allOrders function
        const newOrders = await allOrders();

        // Create a message to send to other clients
        const newOrderMessage = JSON.stringify({
          type: 'newOrder',
          data: newOrders,
        });

        // Send message to all other clients
        wss.clients.forEach(client => {
          if (client !== socket && client.readyState === WebSocket.OPEN) {
            client.send(newOrderMessage);
          }
        });
      }

    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut de la commande:', error);
    }
  });

  socket.on('close', (code, reason) => {
    console.log('WebSocket connection closed:', code, reason);
  });
});
