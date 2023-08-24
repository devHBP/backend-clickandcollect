const Joi = require('joi')

const userValidation = ( body) => {
    const userSchema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        lastname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,30}$')).required(),
        storeId: Joi.number().allow(null), 
        cp: Joi.number().integer().min(10000).max(99999).required(),
        genre: Joi.string().valid('femme', 'homme', 'nbinaire').required(),
        date_naissance: Joi.date().max('now').message("La date de naissance ne peut pas être dans le futur").allow(null),
        idSUN: Joi.number().integer().min(10000).max(99999).required(),
    })
    return userSchema.validate(body)
}

module.exports = userValidation