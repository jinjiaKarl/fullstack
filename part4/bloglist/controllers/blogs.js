const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
	const resp = await Blog.find({}).populate('user', {username: 1, name: 1})
	response.json(resp)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	let blog = request.body
	// middleware.userExtractor中已经将user添加到request中
	const user = request.user
	
	if (blog.title === undefined || blog.url === undefined) {
		return response.status(400).json({error: 'title or url is required'})
	}
	if (!blog.likes) {
		blog.likes = 0
	}
	// 绑定blog和use
	blog.user = user.id
	const blogObj = new Blog(blog)	
	const resp = await blogObj.save()
	user.blogs = user.blogs.concat(resp._id)
	await user.save()
	response.status(201).json(resp)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user
	
	// 根据id获取blog
	const blog = await Blog.findById(request.params.id)
	// 判断blog的user和token中的user是否一致
	if (blog.user.toString() !== user.id.toString()) {
		return response.status(401).json({
			error: 'only the creator can delete the blog'
		})
	}
	await Blog.findByIdAndRemove(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if (blog.user.toString() !== user.id.toString()) {
		return response.status(401).json({
			error: 'only the creator can update the blog'
		})
	}
	const newBlog = {
		...request.body,
	}
	const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true})
	response.json(res)
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
	const user = request.user
	const blog = await Blog.findById(request.params.id)
	if (blog.user.toString() !== user.id.toString()) {
		return response.status(401).json({
			error: 'only the creator can update the blog'
		})
	}
	const comments = blog.comments.concat(request.body.comment)
	const newBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes,
		comments: comments
	}
	const res = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true})
	response.json(res)
})


module.exports =  blogsRouter