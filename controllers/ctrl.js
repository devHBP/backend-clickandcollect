const User = require('../models/users')
const userValidation = require('../validation/uservalidation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/db')

//enregistrer un user
// const signup = (req, res) => {

//     const { body} = req
//     console.log(req.body)
 
//     const { error } = userValidation(body)
//     if (error) return res.status(401).json({mssg:"erreur ici"})


//     bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
//         if(err){
//             return res.status(500).json({msg:"couldnt hash the password"})
//         } else if( passwordHash){
//             return User.create({...body, password:passwordHash})
//                     .then(() => {
//                     res.status(201).json({ msg: "user created"})
//                     console.log({...body, password:passwordHash})
//                     })
//                     .catch(error => res.status(500).json(error))
//         }
//     })
    
// }

const signup = (req, res) => {
    const { body } = req;
    console.log(req.body);
  
    const { error } = userValidation(body);
    if (error) {
      return res.status(400).json({ message: "Validation error", error: error.details });
    }
  
    bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
      if (err) {
        return res.status(500).json({ message: "Could not hash the password", error: err });
      }
  
      const userData = { ...body, password: passwordHash };
      if (req.body.id_magasin) {
        userData.id_magasin = req.body.id_magasin;
      }
  
      User.create(userData)
        .then((user) => {
          const userId = user.id;
        //   console.log('verif id', userData);
          res.status(201).json({ id: userId, message: "User created" });
          
        })
        .catch((error) => {
          res.status(500).json({ message: "Error creating user", error });
        });
    });
  };
  
  
  

//login d'un user
const login = (req, res) => {
    User.findOne({where: {email: req.body.email}})
        .then(dbUser => {
            if(!dbUser){
                return res.status(404).json({message:"user not found"})
            }
            else {
                bcrypt.compare(req.body.password, dbUser.password, (err, compaRes) => {
                    if (err){
                        return res.status(202).json({ msg : "error while checkin user password"})
                    } else if (compaRes) {
                        const token = jwt.sign({email: req.body.email}, 'secret', { expiresIn: '1h'})
                        //save user token
                        dbUser.token = token
                        const user = {
                          id: dbUser.id,
                          id_magasin: dbUser.id_magasin,
                          firstname: dbUser.firstname
                        };
                        // res.status(200).json({msg : "user logged in", "token": token, "user": dbUser.firstname})
                        res.status(200).json({ message: "Utilisateur connecté", token:token, user: user });
                    } else {
                        res.status(401).json({msg : "invalid credentials"})
                    }
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}

//lister tous les users
const getAll = (req, res) => {
    User.findAll({
        attributes : {exclude: ['createdAt', "updatedAt"]}
    })
    .then((users) => {
        res.status(200).json(users)
    })
    .catch(error => res.statut(500).json(error))
}

//lister par id
const getOne = ( req, res) => {
    const { id} = req.params
    //findbyprimarykey
    User.findByPk(id)
        .then( user => {
            if(!user) return res.status(404).json({msg:"user not found"})
            res.status(200).json(user)
        })
        .catch(error => res.statut(500).json(error))
}

//supprimer un user
const deleteOne = (req, res) => {
    const { id} = req.params
    User.destroy({where : {id : id}})
    .then( user => {
        if(user === 0) return res.status(404).json({msg:"not found"})
        res.status(200).json({msg:"User deleted"})
    })
    .catch(error => res.statut(500).json(error))
}

//update un user
const updateOneUser = (req, res) => {
    const { id } = req.params;
    const { id_magasin } = req.body;
  
    User.findByPk(id)
      .then((user) => {
        console.log('user not found !!')
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
  
        user
          .update({ id_magasin })
          .then(() => {
            res.status(200).json({ msg: "Magasin ajouté"});
          })
          .catch((error) => {
            res.status(500).json({ error: "Error updating user" });
          });
      })
      .catch((error) => {
        res.status(500).json({ error: "Error finding user" });
      });
  };
  
  module.exports = { signup, login, getAll, getOne, deleteOne, updateOneUser };
  


module.exports =  { signup,login,  getAll, getOne, deleteOne, updateOneUser }