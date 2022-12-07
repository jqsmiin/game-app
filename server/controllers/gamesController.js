const Game = require('../models/Game')
const multer = require('multer')
const sharp = require('sharp')

// const multerStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'photos')
//     },
//     filename: (req, file, cb) => {
//         const imgName = file.originalname.split('.')[0]
//         const ext = file.mimetype.split('/')[1]
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, imgName + '-' + `${uniqueSuffix}.${ext}`)
//     }
// })

const multerStorage = multer.memoryStorage()

// const multerFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image')) {
//         cb(null, true)
//     } else {
//         const msg = 'Not an image!, Please upload only images'
//         cb(msg, false)
//     }
// }

const upload = multer({
    storage: multerStorage,
})

exports.uploadPhoto = upload.single('image')

exports.resizePhoto = (req, res, next) => {
    if (!req.file) return next()

    const imgName = req.file.originalname.split('.')[0]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

    req.file.filename = imgName + '-' + `${uniqueSuffix}.jpeg`

    sharp(req.file.buffer).resize(500, 500, { withoutEnlargement: true }).toFormat('jpeg').jpeg({ quality: 90 }).toFile(`public/photos/${req.file.filename}`)

    next()
}

exports.createGame = async (req, res, next) => {
    try {
        const newGame = await Game.create(req.body)
        res.status(201).json({
            status: 'Success',
            data: {
                game: newGame
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.postGame = async (req, res, next) => {
    console.log(req.body)
    console.log(req.file)
    try {
        const newGame = {
            name: req.body.name,
            image: `http://localhost:8800/api/public/${req.file.filename}`,
            rating: req.body.rating,
            userId: req.params.userId,
            description: req.body.description
        }
        const game = await Game.create({
            ...newGame,
            path: req.file.path
        })

        res.status(201).json({
            status: 'Success',
            data: {
                game
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.updateGame = async (req, res, next) => {
    try {
        const game = await Game.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({
            status: 'Success',
            data: {
                game
            }
        })
    } catch (error) {
        next(error)
    }
}
exports.deleteGame = async (req, res, next) => {
    try {
        await Game.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'Success',
            message: 'Game has been deleted',
            data: null
        })
    } catch (error) {
        next(error)
    }
}
exports.getGame = async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id)
        res.status(200).json({
            status: 'Success',
            data: game
        })
    } catch (error) {
        next(error)
    }
}
exports.getAllGames = async (req, res, next) => {
    try {
        const games = await Game.find()
        res.status(200).json({
            status: 'Success',
            results: games.length,
            data: games
        })
    } catch (error) {
        next(error)
    }
}
exports.getAllUserGames = async (req, res, next) => {
    try {
        const games = await Game.find({ userId: req.params.userId })
        res.status(200).json({
            status: 'Success',
            results: games.length,
            data: games
        })
    } catch (error) {
        next(error)
    }
}
// db.bios.find( { "name.last": "Hopper" } )
