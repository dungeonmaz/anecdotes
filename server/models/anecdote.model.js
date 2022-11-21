const mongoose = require('mongoose')
const Schema = mongoose.Schema

const anecdoteSchema = new Schema({
    username: {type: String, required: true},
    text: {type: String, required: true},
    rating: {type: Number, required: true}
}, {
    timestamps: true,
})

const Anecdote = mongoose.model('Anecdote', anecdoteSchema)
module.exports = Anecdote