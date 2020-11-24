const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        default: 'Usuario', 
        require: true
    },
    password: String,
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'GUEST'],
        default: 'GUEST'
    },
    favourites: [Object],
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User
