const Joi = require('joi');


module.exports.userSchema = Joi.object({
// users: Joi.object({
username: Joi.string().required().min(5),
email: Joi.string().required().email(),
password: Joi.string().required().min(5),
    // }).required(),
});