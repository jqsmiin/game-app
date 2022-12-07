const mongoose = require('mongoose')
const { Schema } = mongoose;

const gameSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A game must have a name'],
    },
    image: {
        type: String,
    },
    rating: {
        type: Number,
        required: [true, 'A game must have a rating'],
        min: 0,
        max: 5
    },
    userId: {
        type: String,
        required: [true, 'A game must have userId'],
    },
    description: String,
});

module.exports = mongoose.model('Game', gameSchema)