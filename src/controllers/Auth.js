import { userSignInValid, userValid } from "../validation/user.js"
import User from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const { SECRET_CODE } = process.env;

const signUp = async (req, res) => {
    try {
        // Valid information user enter
        const { error } = userValid.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(404).json({
                message: error
            })
        }
        // check email 
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(404).json({
                message: "Email already exists"
            });
        };
        // hash password
        const hashedPassword = await bcryptjs.hash(req.body.password, 10);
        // create user in database 
        const user = await User.create({
            ...req.body,
            password: hashedPassword,
        })

        // notice for user 
        user.password = undefined
        return res.status(200).json({
            message: "Successfully created user",
            user
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
const signIn = async (req, res) => {
    try {
        // Validate information user enter inform
        const { error } = userSignInValid.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(404).json({
                message: error
            })
        }
        // check email 
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "Not found user"
            })
        };
        // check password
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
            return req.status(404).json({
                message: "Password incorrect"
            })
        }
        // create jwt
        const accessToken = jwt.sign({ _id: user._id }, SECRET_CODE, { expiresIn: "1d" });
        console.log(accessToken)
        // return info for user
        user.password = undefined;
        user.confirmPassword = undefined;

        return res.status(200).json({
            message: "Login successful",
            user,
            accessToken
        })


    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
export { signUp, signIn }