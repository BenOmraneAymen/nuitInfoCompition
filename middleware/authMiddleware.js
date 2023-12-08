const jwt = require('jsonwebtoken');
const User = require('../database/models/user');
const dotenv = require('dotenv');

dotenv.config();

const requireAuth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.send({
                    error: err,
                    access: false,
                });
            } else {
                let user = await User.findById(decodedToken.id);
                user.password = null
                req.locals = user;
                next();
            }
        });
    }
    else {
        res.status(400).send({
            error: "no token",
            access: false,
        });
    }
}

exports.requireAuth = requireAuth;