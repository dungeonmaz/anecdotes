const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {useNewUrlParser: true})

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB connection established successfully")
})

const anecdotesRouter = require('./routes/anecdotes')
const usersRouter = require('./routes/users')

app.use('/anecdotes', anecdotesRouter)
app.use('/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})