const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helper')

// 初始化数据库
beforeEach(async () => {
	// 清空数据库，确保每次测试数据库都是一样的
	await Blog.deleteMany({})
	const blogObjects = helper.initBlogs.map(blog => new Blog(blog))
	// 多个promise对象，使用Promise.all()方法
	const promiseArray = blogObjects.map(blog => blog.save())
	// Promise.all()以并行方式执行所有promise，并在它们都完成/拒绝后返回一个数组
	await Promise.all(promiseArray)
	// 以特定的顺序执行promise
	// for (let blog of helper.initialBlogs) {
	// 	let blogObject = new Blog(blog)
	// 	await blogObject.save()
	// }
})

test('blogs are returned as json', async () => {
	const response = await api
		.get('/api/blogs')
	expect(response.statusCode).toBe(200)
	expect(response.header['content-type']).toMatch(/application\/json/)
    
})

describe('post', () => {
	test('id is defined', async () => {
		const blog = {
			title: 'test',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
			likes: 7
		}
		const resp = await api.post('/api/blogs').send(blog)
		expect(resp.body.id).toBeDefined()
		const blogsInDb = await helper.blogsInDb()
		expect(blogsInDb).toHaveLength(helper.initBlogs.length + 1)
	})

	
	// 测试post成功，likes是否默认为0
	test('likes default to 0', async () => {
		const blog = {
			title: 'test',
			author: 'Michael Chan',
			url: 'https://reactpatterns.com/',
		}
		const resp = await api.post('/api/blogs').send(blog)
		expect(resp.body.likes).toBe(0)
	})

	test('url is missing', async () => {
		const blog = {
			title: 'test',
			author: 'Michael Chan',
		}
		const resp = await api.post('/api/blogs').send(blog)
		expect(resp.statusCode).toBe(400)
	})
})

describe('delete', () => {
	test('delete success', async () => {
		const blogsInDb = await helper.blogsInDb()
		const blogToDelete = blogsInDb[0]
		await api.delete(`/api/blogs/${blogToDelete.id}`)
		const blogsAfterDelete = await helper.blogsInDb()
		expect(blogsAfterDelete).toHaveLength(blogsInDb.length - 1) 
	})
})

describe('put', () => {
	test('update success', async () => {
		const blogsInDb = await helper.blogsInDb()
		const blogToUpdate = blogsInDb[0]
		const newBlog = {
			...blogToUpdate,
			likes: 10
		}
		const resp = await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog)
		expect(resp.body.likes).toBe(10)
	})
})


// 关闭连接
afterAll(() => {
	mongoose.connection.close()
})