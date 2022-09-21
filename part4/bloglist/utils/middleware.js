const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const requestLogger = (request, response, next) => {
	logger.info('Method:', request.method)
	logger.info('Path:  ', request.path)
	logger.info('Body:  ', request.body)
	logger.info('---')
	next()
}

const tokenExtractor = (request, response, next) => {
	const getTolkenFrom = request => {
		const authorization = request.get('authorization')
		if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
			return authorization.substring(7)
		}
		return null
	}
	request.token = getTolkenFrom(request)
	next()
}

const userExtractor = async (request, response, next) => {
	// 因为express-async-errors错误中间件只处理了router中的异步函数，
	// 因为jwt.verfify()可能会出差 所以这里需要try catch 
	try{
		// the decoded token includes the user id and username
		const token = request.token

		const decodedToken = jwt.verify(token, process.env.SECRET)
		if (!token || !decodedToken.id) {
			return response.status(401).json({
				error: 'token missing or invalid'
			})
		}
		// 根据token中的id获取user
		// 如果没有找到怎么样？
		let user = await User.findById(decodedToken.id)
		if (user === null) {
			throw new Error('user not found')
		}
		user.id = user._id
		delete user._id
		request.user = user
	}catch (error) {
		next(error)
	}
	next()
}
  
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

// 使用了express-async-errors错误中间件，router中的异步函数就不需要try catch了
const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({
			error: 'invalid token'
		})
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({
			error: 'token expired'
		})
	}

	next(error)
}

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor
}