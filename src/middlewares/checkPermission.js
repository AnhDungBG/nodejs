import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from './../models/user.js';

dotenv.config();
const { SECRET_CODE } = process.env;
const checkPermission = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(404).json({
                message: "You have to login"
            })
        }
        const decode = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(decode._id);

        if (!user) {
            return res.status(404).json({
                message: "Token error"
            })
        }
        if (user.role !== 'admin') {
            return res.status(404).json({
                message: "You don't have permission"
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }

}
export { checkPermission }