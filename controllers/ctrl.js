const Users = require('../models/BDD/Users')

const {userValidation} = require('../validation/uservalidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/db')
require('dotenv').config();
const moment = require('moment');


const signup = async (req, res) => {
  try {
      const { body } = req;
      console.log('req', req)
      const { error } = userValidation(body);


      if (error) {
        console.error("Erreur de validation :", error.details);
        throw { status: 400, message: "Validation error", details: error.details };
    }

      const passwordHash = await bcrypt.hash(body.password, 12);

      const userData = { ...body, password: passwordHash };

      if (body.storeId) {
          userData.storeId = body.storeId;
      }

      if (body.cp === '') {
        userData.cp = null;
    } else {
        userData.cp = body.cp;
    }

      if (body.idSUN === '') {
          userData.idSUN = null;
      } else {
          userData.idSUN = body.idSUN;
      }

      if (body.genre === '') {
        userData.genre = null;
    } else {
        userData.genre = body.genre;
    }

      const formattedDate = moment(body.date_naissance, "YYYY-MM-DD").toISOString();
    console.log('formateedDate', formattedDate)
      userData.date_naissance = body.date_naissance === '' ? null : formattedDate;

      const user = await Users.create(userData);
      const userId = user.userId;
      res.status(201).json({ id: userId, message: "User created" });

    } catch (err) {
      const status = err.status || 500;
      console.error("Erreur de signup :", err.message);
      console.error("Détails :", err.details);
      console.error("Erreur complète :", err); //erreur complète
      console.error("Stack Trace:", err.stack); //stack trace
      res.status(status).json({ message: err.message, details: err.details || undefined });
  }
  
};

const login = async (req, res) => {
  try {
      const dbUser = await Users.findOne({ where: { email: req.body.email } });
      
      if (!dbUser) {
          return res.status(404).json({ message: "user not found (login)" });
      }

      const isValidPassword = await bcrypt.compare(req.body.password, dbUser.password);
      
      if (!isValidPassword) {
          return res.status(401).json({ msg: "invalid credentials" });
      }

      const token = jwt.sign({ email: req.body.email }, process.env.SECRET, { expiresIn: '1m' });
      const refreshToken = jwt.sign({ email: req.body.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
      
      const user = {
          userId: dbUser.userId,
          storeId: dbUser.storeId,
          firstname: dbUser.firstname,
          lastname: dbUser.lastname,
          email: dbUser.email,
          role: dbUser.role
      };

      res.status(200).json({ message: "Utilisateur connecté", token: token,refreshToken: refreshToken, user: user });

  } catch (err) {
      console.error(err);
      res.status(500).json({ msg: "Internal server error" });
  }
};
//refresh token
// const refreshToken  = (req, res) => {
//   const { refreshToken } = req.body;

//   // Vérifier si le refresh token est valide et n'a pas expiré
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) {
//       return res.sendStatus(403); 
//     }

//     // Le refresh token est valide, émettre un nouvel access token
//     const newAccessToken = jwt.sign({ username: user.name, role: user.role }, process.env.SECRET, { expiresIn: '15m' });
//     res.json({ newAccessToken });
//   });
// }


//lister tous les users
const getAll = (req, res) => {
  Users.findAll({
        attributes : {exclude: ['createdAt', "updatedAt", "password"]}
    })
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(error => res.status(500).json(error))
}

//lister par id
const getOne = ( req, res) => {
    const { id} = req.params
    //findbyprimarykey
    Users.findByPk(id)
        .then( user => {
            if(!user) return res.status(404).json({msg:"user not found"})
            res.status(200).json(user)
        })
        .catch(error => {
          console.error(error); 
          res.status(500).json(error)
        })
          
}

//supprimer un user
const deleteOne = (req, res) => {
    const { id} = req.params
    Users.destroy({where : {id : id}})
    .then( user => {
        if(user === 0) return res.status(404).json({msg:"not found"})
        res.status(200).json({msg:"User deleted"})
    })
    .catch(error => res.status(500).json(error))
}

//update le magasin rattaché au user
const updateOneUser = (req, res) => {
    const { id } = req.params;
    const { storeId } = req.body;
  
    Users.findByPk(id)
      .then((user) => {
        console.log('User found !!')
        if (!user) {
          console.log('error')
          return res.status(404).json({ msg: "User not found (updateone)" });
        }
  
        user
          .update({ storeId })
          .then(() => {
            res.status(200).json({ msg: "Magasin modifié"});
          })
          .catch((error) => {
            res.status(500).json({ error: "Error updating user" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error finding user" });
      });
  };

// Modifier le rôle d'un utilisateur
const updateRole = (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    Users.findByPk(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }

        user
          .update({ role }) // Mettez à jour uniquement la propriété "role"
          .then(() => {
            res.status(200).json({ msg: "Rôle modifié" });
          })
          .catch((error) => {
            res.status(500).json({ error: "Error updating user" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error finding user" });
      });
};


const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;

    // call next to pass control to the next middleware/function
    next();
  });
};


//modification du user
const modifyUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateData = req.body;

    // Recherche de l'utilisateur dans la base de données
    const user = await Users.findOne({ where: { userId: userId } });

    if (user) {
      // Mise à jour des champs de l'utilisateur avec les données de mise à jour
      await user.update(updateData);

      // Récupération de l'utilisateur mis à jour
      const updatedUser = await Users.findOne({ where: { userId: userId } });

      return res.status(200).json({ message: 'Utilisateur mis à jour', user: updatedUser });
    } else {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
}
//supprimer un compte
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; 

    // Trouvez l'utilisateur par son ID
    const user = await Users.findByPk(userId);

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    // Supprimez l'utilisateur
    await user.destroy();

    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ message: err.message, details: err.details || undefined });
  }
};

//Récupérer l'email via le UserId
const getEmailByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
      // Récupérer l'utilisateur par userId
      const user = await Users.findByPk(userId, {
          attributes: ['email'] 
      });

      if (!user) {
          return res.status(404).json({ msg: "User not found" });
      }

      res.status(200).json({ email: user.email });
      
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "An error occurred", error });
  }
}
//recuperer le firstname via l'email
const getUserByEmail = async (req, res) => {
  try {

    const { email } = req.params;
    if (!email) {
      return res.status(400).json({ error: 'Email parameter is required' });
  }
    // Trouver l'utilisateur avec l'e-mail spécifié
    const user = await Users.findOne({
        where: {email},
        attributes: ['firstname'] 
    });

    // Vérifier si l'utilisateur a été trouvé
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ firstname: user.firstname });

} catch (error) {
    console.error('Error fetching user:', error);
    return null;
}
}

  
module.exports = { signup, login, getAll, getOne, deleteOne, updateOneUser, updateRole, verifyToken, modifyUser , deleteUser, getEmailByUserId, getUserByEmail};
  