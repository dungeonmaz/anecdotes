const router = require('express').Router()
let User = require('../models/user.model')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: " + err))
})


router.route('/signup').post((req, res) => {
    const { username, email, password } = req.body

    const hashedPassword = bcrypt.hashSync(password)

    const newUser = new User({ username, email, password: hashedPassword })

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json("Error: " + err))
})

router.route('/login').post(async (req, res) => {
    const { email, password } = req.body
    let existingUser = await User.findOne({ 'email': email })
    if (!existingUser) {
        return res.status(400).json({message: "Invalid email or password"})
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
    if (!isPasswordCorrect) {
        return res.status(400).json({message: "Invalid email or password"})
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    })

    res.cookie(String(existingUser._id), token,{
        path: '/',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        httpOnly: true,
        sameSite: 'lax'
    })

    return res.status(200).json({ message: "Successfully login", token: token })
})

router.route('/user').get(async (req, res, next) => {
    let token
    try{
        const cookies = req.headers.cookie
        token = cookies.split('=')[1]
    } catch (err){
        return new Error(err)
    }
    
    if (!token) {
        res.status(404).json({message: "No token found"})
    }

    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({message: "Invalid token"})
        }
        req.id = user.id
    })

    const userId = req.id
    let user
    try {
        user = await User.findById(userId, "-password")
    } catch (err) {
        return new Error(err)
    }

    if (!user) {
        return res.status(404).json({message:"User not found"})
    }
    return res.status(200).json({user})
})

router.route('/logout').post((req,res) => {
    const cookies = req.headers.cookie
    const token = cookies.split('=')[1]

    if (!token) {
        return res.status(400).json({message: "Couldn't find token"})
    }

    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({message: "Invalid token"})
        }
        res.clearCookie(`${user.id}`)
        req.cookies[`${user.id}`] = ""
        return res.status(200).json({message: "Successfully logged out"})

    })
})

module.exports = router