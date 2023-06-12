const Joi = require('joi')

const userValidation = ( body) => {
    const userSchema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(3).max(30).required(),
        lastname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        id_magasin: Joi.number().allow(null), 
    })
    return userSchema.validate(body)
}

module.exports = userValidation