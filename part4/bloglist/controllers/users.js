const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!username || !password) {
        return response.status(400).json({ error: "no username or password given" })
    } else if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: "password or username wasnt at least 3 characters long" })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({ error: "username already found " })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        passwordHash,
    })
    const result = await user.save()
    response.status(201).json(result)
})

module.exports = usersRouter