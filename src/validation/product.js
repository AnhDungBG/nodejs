// const Joi = require('joi');
import Joi from 'joi';
const productValid = Joi.object({
    name: Joi.string().min(6).required(),
    price: Joi.number().required(),
    categoryId: Joi.string().required()
});
export default productValid