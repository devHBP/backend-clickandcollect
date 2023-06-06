const Joi = require('joi')

const userValidation = ( body) => {
    const userSchema = Joi.object({
        firstname: Joi.string().alphanum().min(3).max(30).required(),
        lastname: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        id_magasin: Joi.string().allow('')
    })
    return userSchema.validate(body)
}

module.exports = userValidation