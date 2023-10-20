const Joi = require('joi')

const userValidation = ( body) => {
    const userSchema = Joi.object({
        firstname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        lastname: Joi.string().regex(/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/).min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,30}$')).required(),
        storeId: Joi.number().allow(null), 
        cp: Joi.number().integer().min(10000).max(99999).allow(null, ''),
        genre: Joi.string().valid('femme', 'homme', 'nbinaire').required(),
        date_naissance: Joi.date().allow("", null).max('now').message("La date de naissance ne peut pas être dans le futur"),
        idSUN: Joi.alternatives().try(
            Joi.string().allow('').optional(),
            Joi.string().regex(/^[0-9]{5}$/).optional()
        ).label('idSun'),
        role: Joi.string().valid('client', 'SUNcollaborateur', 'invite','gestionnaire','employe').required(),
    })
    return userSchema.validate(body)
}

const passwordUpdateValidation = (data) => {
    const schema = Joi.object({
        userId: Joi.number().required(),
        newPassword: Joi.string().pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{5,30}$')).required(),
    });

    return schema.validate(data);
};

module.exports = {userValidation, passwordUpdateValidation } 