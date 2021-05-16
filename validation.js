const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const schemaValidator = Joi.object({
        username: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6),
        isPsy: Joi.boolean().required(),
    });

    return schemaValidator.validate(data);
}

const loginValidation = (data) => {
    const schemaValidator = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required().min(6)
    });

    return schemaValidator.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;