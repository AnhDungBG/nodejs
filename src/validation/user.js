import Joi from "joi";

const userValid = Joi.object({
    username: Joi.string().min(1).max(255).required().messages({
        "string.empty": "Username not empty",
        "any.require": "Username is require",
        "string.min": "Username have at least {#limit} characters",
        "string.max": "Username have at less than {#limit + 1} characters"
    }),
    email: Joi.string().required().email().messages({
        "string.empty": "Email not empty",
        "any.require": "Email is require",
        "string.email": "Not correct format email"
    }),
    password: Joi.string().min(1).max(255).required().messages({
        "string.empty": "Password not empty",
        "any.require": "Password is require",
        "string.min": "Password have at least {#limit} characters",
        "string.max": "Password have at less than {#limit + 1} characters"
    }),
    confirmPassword: Joi.string().min(1).max(255).required().valid(Joi.ref("password")).messages({
        "string.empty": "ConfirmPassword not empty",
        "any.require": "ConfirmPassword is require",
        "string.min": "ConfirmPassword have at least {#limit} characters",
        "string.max": "ConfirmPassword have at less than {#limit + 1} characters"
    }),
    role: Joi.string(),
})
const userSignInValid = Joi.object({
    email: Joi.string().required().email().messages({
        "string.empty": "Email not empty",
        "any.require": "Email is require",
        "string.email": "Not correct format email"
    }),
    password: Joi.string().min(1).max(255).required().messages({
        "string.empty": "Password not empty",
        "any.require": "Password is require",
        "string.min": "Password have at least {#limit} characters",
        "string.max": "Password have at less than {#limit + 1} characters"
    }),

})
export { userValid, userSignInValid };