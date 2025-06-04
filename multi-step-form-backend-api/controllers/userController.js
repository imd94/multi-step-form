const User = require('./../models/User');
const jwt = require("jsonwebtoken");
const tokenLasts = "365d"; // how long a token lasts before expiring

exports.apiRegister = async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        const dispatchUser = {
            token: jwt.sign({ _id: newUser._id, email: newUser.email }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
            email: newUser.email
        }

        res.status(201).json({
            status: 'success',
            user: dispatchUser
        });
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
}