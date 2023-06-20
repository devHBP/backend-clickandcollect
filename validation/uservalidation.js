const Joi = require('joi')

const userValidation = ( body) => {
    const userSchema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        lastname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,30}$')).required(),
        storeId: Joi.number().allow(null), 
    })
    return userSchema.validate(body)
}

module.exports = userValidation