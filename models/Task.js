var mongoose = require('mongoose');
var CommentSchema = require('./Comment');

var Schema = mongoose.Schema

var TaskSchema = new Schema({
    assiginee : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    reporter : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {
        type : String,
        default : '',
        required : true
    },
    description : {
        type : String,
        default : ''
    },
    priority : {
        type : String,
        default : 'minor'
    },
    due_date : {
        type : Date,
        default : null
    },
    reported_date : {
        type : Date,
        default : Date.now
    },
    run_date : {
        type:Date,
        default:null
    },
    end_date : {
        type : Date,
        default : null
    },
    status : {
        type : String,
        default : null
    },
    resolve : {
        type : Boolean,
        default : false
    },
    Comments : [CommentSchema]
})

module.exports = mongoose.model('Task', TaskSchema)