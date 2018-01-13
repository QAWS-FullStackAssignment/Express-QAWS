var User = require('../models/Users')
var Session = require('../models/Session')
var crypto = require('crypto')

//this will generate token based on objecID of user
let token_generator = (obj) => {
    const secret = crypto.randomBytes(20).toString('hex')
    let enc = crypto.createHmac("sha256", secret)
    return enc.update(obj.toString()).digest('hex')
}

//login Controller
var loginController = function (req, res, next) {
    const email = req.body.username;
    const password = req.body.password;
    var userQuery = User.findOne({ email, password }).exec();
    userQuery
        .then(function (user) {
            if (user)
                return user
            else
                res.status(401).json({ status: 'failed', msg: 'Username or Password Incorrect' });
        })
        .then(function (user) {
            return Session.findOne({ userId: user._id }).select('token userId').populate('userId', '-password')
                .exec()
                .then(function (session) {
                    if (session)
                        return session;
                    else {
                        const session = new Session({})
                        session.token = token_generator(user._id);
                        session.userId = user._id;
                        return session.save();
                    }
                })
                .then(function (session) {
                    res.status(200).json({ status: 'success', authtoken: session.get('token'), userObj: session.userId })
                })
                .catch(function (err) {
                    console.log(err);
                    res.send(500).json({ status: 'failed', err });
                });
        })
        .catch(function (err) {
            res.send(500).json({ status: 'failed', err });
        });
}

//logout controller
var logoutController = function (req, res, next) {
    //Logout code goes here
    const token = req.headers.authorization;
    Session.findOneAndRemove({ "token": token }, (err, session) => {
        if (err)
            return res.status(500).json({ status: 'failed', err })
        else {
            if (session)
                res.status(200).json({ status: 'success', msg: `token -> ${session.get('token')} is deleted` })
            else
                res.status(401).json({
                    auth: false,
                    msg: "you are not authorized"
                })
        }
    })
}

module.exports = {
    login: loginController,
    logout: logoutController
}