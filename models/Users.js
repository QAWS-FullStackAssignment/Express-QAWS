var mongoose = require('mongoose')

var Schema = mongoose.Schema

var UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    supervise: {
        type: Boolean,
        default: false
    }
})

var UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel