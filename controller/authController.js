const User = require('../models/user');


module.exports.register = async (req, res) => {
    try {

        //extracting user data from request body
        const user = req.body;

        //making user details object
        const userData = {
            name: user.name,
            email: user.email
        }

        //creating new user object
        const newUser = new User(userData);

        //saving the new user data to the database
        newUser.save().then(response => {
                res.status(200).json({
                    message: 'User created successfully',
                    success: true
                })
            })
            .catch(error => {
                res.status(401).json({
                    message: 'Failed to create user',
                    success: false,
                    error: error.message
                })
            });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to create user, server error',
            success: false,
            error: error.message
        })
    }
}