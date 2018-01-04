var mongoose = require('mongoose');

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    addedBy : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    description : {
        type : String,
        required : true
    },
    timestamp : {
        type : Date,
        default : Date.now
    }
})

module.exports = CommentSchema