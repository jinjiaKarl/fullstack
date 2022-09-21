const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
	const user = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1})
	response.json(user)
})

usersRouter.post('/', async (request, response) => {
	const {username, name, password} = request.body
	if (!username || !password) {
		return response.status(400).json({error: 'username or password is required'})
	}
	if (username.length < 3 ||  password.length < 3) {
		return response.status(400).json({error: 'username or password length must be at least 3 characters long'})
	}

	const existUser = await User.findOne({username})
	if (existUser) {
		return response.status(400).json({error: 'username already exists'})
	}

	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)
	const user = new User({
		username,
		name,
		passwordHash
	})
	const savedUser = await user.save()
	response.status(201).json(savedUser)
})

module.exports = usersRouter