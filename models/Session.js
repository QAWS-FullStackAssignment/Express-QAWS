var mongoose = require('mongoose')

const Schema = mongoose.Schema

const SessionSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    },
    expired: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model('Session', SessionSchema)