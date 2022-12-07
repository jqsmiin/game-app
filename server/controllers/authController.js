const User = require('../models/User')
const { createError } = require('../utils/error')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hash
        }
        const user = await User.create(newUser)

        console.log(user)

        // const newUserUsername = newUser.username

        // console.log(newUserUsername)

        // if (newUserUsername) {
        //     const user = await User.findOne({ newUserUsername })
        //     console.log(user)
        // }
        const { password, isAdmin, ...otherDetails } = user._doc
        res.status(201).json({
            ...otherDetails
        })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { username } = req.body

        const user = await User.findOne({ username })

        if (!user) return next(createError(404, "User not found!"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username!"))

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT)

        const { password, isAdmin, ...otherDetails } = user._doc
        const { _id } = user

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ ...otherDetails, _id })
    } catch (error) {
        next(error)
    }
}