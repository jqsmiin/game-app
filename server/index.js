const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const gameRoute = require('./routes/games.js')
const port = 8800;
const path = require("path");

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Conntected to mongoDB.')
    } catch (error) {
        throw error
    }
}
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

// middlewares
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use('/api/public', express.static("public/photos"));
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/games', gameRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })

})


app.listen(port, () => {
    connect()
    console.log(`App running on port ${port}`)
})