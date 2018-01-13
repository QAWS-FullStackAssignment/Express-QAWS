var Session = require('../models/Session')

var auth = function (req, res, next) {
    let authtoken = req.headers.authorization;
    Session.findOne({ "token": authtoken }, (err, session) => {
        if (err)
            return res.status(500).json({ status: 'failed', err });
        else {
            //console.log(session)
            if (session)
                next();
            else
                res.status(401).json({
                    auth: false,
                    msg: "you are not authorized"
                });
        }
    })
}

module.exports = auth