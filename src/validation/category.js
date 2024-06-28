// const Joi = require('joi');
import Joi from 'joi';
const categoryValid = Joi.object({
    name: Joi.string().min(6).required(),
    slug: Joi.string().required()
});
export default categoryValid