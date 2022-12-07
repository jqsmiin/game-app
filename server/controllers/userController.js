const User = require('../models/User')

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            status: 'Success',
            data: {
                user
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'Success',
            message: 'User has been deleted',
            data: null
        })
    } catch (error) {
        next(error)
    }
}
exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: user
        })
    } catch (error) {
        next(error)
    }
}
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            status: 'Success',
            results: users.length,
            data: users
        })
    } catch (error) {
        next(error)
    }
}