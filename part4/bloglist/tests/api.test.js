const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// 初始化数据库
beforeAll(async () => {
	// 创建一个用户
	await User.deleteMany({})
	const passwordHash = await bcrypt.hash('123456', 10)
	const user = new User({ username: 'root', passwordHash })
	const userObj = await user.save()
	// 清空数据库，确保每次测试数据库都是一样的
	await Blog.deleteMany({})
	const blogObjects = helper.initBlogs.map(blog => {
		blog.user = userObj._id
		return new Blog(blog)
	})
	// 多个promise对象，使用Promise.all()方法
	const promiseArray = blogObjects.map(blog => blog.save())
	// Promise.all()以并行方式执行所有promise，并在它们都完成/拒绝后返回一个数组
	await Promise.all(promiseArray)
	// 以特定的顺序执行promise
	// for (let blog of helper.initialBlogs) {
	// 	let blogObject = new Blog(blog)
	// 	await blogObject.save()
	// }
	// 更新user的blogs字段
	userObj.blogs = promiseArray.map(blog => blog._id)
	await userObj.save()
})
let token = ''
// users api test
describe('when there is initially one user in db', () => {
	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb()
  
		const newUser = {
			username: 'jin',
			name: 'jinjia',
			password: '123456',
		}
  
		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
  
		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})

	test('create a user with an existing username', async () => {
		const newUser = {
			username: 'root',
			name: 'jinjia',
			password: '123456',
		}
  
		const res = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
		expect(res.body.error).toContain('username already exists')
	})

	test('login succeeds with correct credentials', async () => {
		const user = {
			username: 'root',
			password: '123456',
		}
		const res = await api
			.post('/api/login')
			.send(user)
			.expect(200)
		token = res.body.token
		expect(token).toBeDefined()
	})
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
		const resp = await api
			.post('/api/blogs')
			.send(blog)
			.set('Authorization', `Bearer ${token}`)
		
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
		const resp = await api
			.post('/api/blogs')
			.send(blog)
			.set('Authorization', `bearer ${token}`)
		expect(resp.body.likes).toBe(0)
	})

	test('url is missing', async () => {
		const blog = {
			title: 'test',
			author: 'Michael Chan',
		}
		const resp = await api
			.post('/api/blogs')
			.send(blog)
			.set('Authorization', `bearer ${token}`)
		expect(resp.statusCode).toBe(400)
	})
})

describe('delete', () => {
	test('delete success', async () => {
		const blogsInDb = await helper.blogsInDb()
		const blogToDelete = blogsInDb[0]
		await api
			.delete(`/api/blogs/${blogToDelete.id}`)
			.set('Authorization', `bearer ${token}`)
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
		const resp = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.set('Authorization', `bearer ${token}`)
		expect(resp.body.likes).toBe(10)
	})
	test('update failure', async () => {
		const blogsInDb = await helper.blogsInDb()
		const blogToUpdate = blogsInDb[0]
		const newBlog = {
			...blogToUpdate,
			likes: 10
		}
		const resp = await api
			.put(`/api/blogs/${blogToUpdate.id}`)
			.send(newBlog)
			.set('Authorization', 'bearer 11111')
		expect(resp.statusCode).toBe(401)
	})
})





// 关闭连接
afterAll(() => {
	mongoose.connection.close()
})