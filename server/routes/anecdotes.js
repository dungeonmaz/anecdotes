const router = require('express').Router()
const Anecdote = require('../models/anecdote.model')

router.route('/').get((req, res) => {
    Anecdote.find()
        .then(anecdotes => res.json(anecdotes))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route('/random').get((req, res) => {
    Anecdote.find()
    .then(anecdotes => {
        const rand = Math.floor(Math.random() * anecdotes.length)
        if (req.query.prevId === anecdotes[rand]._id.toString()) {
            if (rand + 1 === anecdotes.length){
                res.json(anecdotes[rand - 1])
            } else {
                res.json(anecdotes[rand + 1])
            }
        } else {
            res.json(anecdotes[rand])
        }
    })
    .catch(err => res.status(400).json("Error: " + err))
})

router.route('/add').post((req, res) => {
    const username = req.body.username
    const text = req.body.text
    const rating = Number(req.body.rating)

    const newAnecdote = new Anecdote({
        username,
        text,
        rating,
    })

    newAnecdote.save()
        .then(() => res.json("Anecdote added"))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route('/:id').get((req, res) => {
    Anecdote.findById(req.params.id)
    .then(anecdote => res.json(anecdote))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route('/:id').delete((req, res) => {
    Anecdote.findByIdAndDelete(req.params.id)
    .then(() => res.json("Anecdote deleted"))
    .catch(err => res.status(400).json("Error: " + err))
})

router.route('/update/:id').post((req, res) => {
    Anecdote.findById(req.params.id)
    .then(anecdote => {
        anecdote.username = req.body.username
        anecdote.text = req.body.text
        anecdote.rating = Number(req.body.rating)

        anecdote.save()
        .then(() => res.json("Exercise Updated"))
        .catch(err => res.status(400).json("Error: " + err))
    })
    .catch(err => res.status(400).json("Error: " + err))
})

module.exports = router