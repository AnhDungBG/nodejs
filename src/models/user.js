import mongoose from "mongoose";

const schemaUser = mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true

    },
    password: {
        type: String,
        require: true
    },
    confirmPassword: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "member"
    }
})

const User = mongoose.model("User", schemaUser)
export default User