const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
	const resp = await Blog.find({})
	console.log(typeof resp)
	response.json(resp)
})

blogsRouter.post('/', async (request, response) => {
	let blog = request.body
	if (blog.title === undefined || blog.url === undefined) {
		return response.status(400).json({error: 'title or url is required'})
	}
	if (!blog.likes) {
		blog.likes = 0
	}
	const blogObj = new Blog(blog)

	const resp = await blogObj.save()
	response.status(201).json(resp)
})

module.exports =  blogsRouter