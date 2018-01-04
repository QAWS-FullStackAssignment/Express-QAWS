var User = require('../models/Users')

//getAllUsers
var getAllUsers = function (req, res, next) {
    User.find({}, 'name email', (err, users) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else
            res.status(200).json({ status: 'success', users })
    })
}

//getUserBy id
var getUserById = function (req, res, next) {
    const id = req.params.id
    User.findById(id, '-password', (err, user) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else
            if (user)
                return res.status(200).json({ status: 'success', user })
            else
                return res.status(401).json({ status: 'failed', msg: 'user not found' })
    })
}

//update user by id
var updateUser = function (req, res, next) {
    const id = req.params.id
    User.findByIdAndUpdate(id, req.body, { new: true }, (err, upd_user) => {
        if (err)
            res.status(500).json({ status: 'failed', err })
        else
            res.status(200).json({ status: 'success', upd_user })
    })
}

//delete user by id
var deleteUser = function (req, res, next) {
    const id = req.params.id
    User.findByIdAndRemove(id, (err, user) => {
        if (err)
            res.status(500).json({ status: 'failed', err })
        else {
            res.status(200).json({ status: 'success', user })
        }
    })
}

//create user signup
let addUser = (req, res, obj) => {
    const user = new User()
    var prop = Object.getOwnPropertyNames(obj)
    prop.forEach(ele => {
        user[ele] = obj[ele]
    })

    user.save((err, user) => {
        if (err)
            res.status(500).json({ status: 'failed', err })
        else
            res.status(201).json({ status: 'success', user })
    })
}
var signup = function (req, res, next) {
    const email = req.body.email;
    //check if user is already registered
    User.findOne({ email: email }, (err, user) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else {
            if (user)
                return res.status(201).json({ status: 'failed', msg: "user is already registered" })
            else {
                addUser(req, res, req.body)
            }
        }
    })
}

module.exports = {
    getAllUsers: getAllUsers,
    getUserById: getUserById,
    updateUser: updateUser,
    deleteUser: deleteUser,
    signup: signup
}