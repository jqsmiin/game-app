const express = require('express')
const router = express.Router()
const { createGame, updateGame, deleteGame, getGame, getAllGames, postGame, getAllUserGames, uploadPhoto, resizePhoto } = require('../controllers/gamesController')
const { verifyUser, verifyAdmin } = require('../utils/verifyToken')



// Create
router.post('/', verifyUser, createGame)
// Update
router.put('/:id', verifyUser, updateGame)
// Delete
router.delete('/:id', deleteGame)
// Get
router.get('/:id', getGame)
// Get All
router.get('/', getAllGames)

// USER GAMES
router.post('/userGames/:userId', uploadPhoto, resizePhoto, postGame)

router.get('/userGames/:userId', getAllUserGames)

module.exports = router