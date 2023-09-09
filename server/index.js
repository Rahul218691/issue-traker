require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')

const connectDB = require('./config/db')

const app = express()

const corsOptions = {
    origin: [process.env.CLIENT_BASE_URL, process.env.SERVER_BASE_URL]
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('uploads'));

if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use('/api', require('./routes/authRoute'))
app.use('/api', require('./routes/userRoute'))
app.use('/api', require('./routes/importRoute'))
app.use('/api', require('./routes/projectRoute'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`REST API RUNNING ON PORT: ${PORT}`)
    connectDB()
})