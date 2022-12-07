const express = require('express')
const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/userController')
const { verifyUser, verifyAdmin } = require('../utils/verifyToken')

const router = express.Router()

// router.get('/checkuser', verifyToken, (req, res) => {
//     res.send('Hello user!')
// })
// router.get('/checkuser/:id', verifyUser, (req, res) => {
//     res.send('Hello user you can delete acc!')
// })

// router.get('/checkadmin/:id', verifyAdmin, (req, res) => {
//     res.send('Hello admin you can delete acc!')
// })
// Update
router.put('/:id', verifyUser, updateUser)
// Delete
router.delete('/:id', verifyUser, deleteUser)
// Get
router.get('/:id', verifyUser, getUser)
// Get All
router.get('/', verifyAdmin, getAllUsers)

module.exports = router