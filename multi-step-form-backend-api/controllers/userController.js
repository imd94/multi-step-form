const User = require('./../models/User');

exports.apiRegister = async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
              user: newUser
            }
        });
    } catch(err) {
        res.status(400).json({
            status: 'failed',
            message: err
        });
    }
}