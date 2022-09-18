const listHelper = require('../utils/list_helper')
const {listWithOneBlog, blogs} = require('./helper')

test('dummy returns one', () => {
	const blogs = []
	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})




describe('total likes', () => {
	test('when list has only one blog, equals the likes of that', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		expect(result).toBe(5)
	})
	
	test('when list has many blogs, equals the likes of that', () => {
		const result = listHelper.totalLikes(blogs)
		expect(result).toBe(7+5+12+10+0+2)
	})
})

describe('favorite blog', () => {
	test('when list has only one blog, the blog has most likes', () => {
		const result = listHelper.favoriteBlog(listWithOneBlog)
		const expectVal = {
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			likes: 5
		}
		expect(result).toEqual(expectVal)
	})

	test('when list has many blogs, the blog has most likes', () => {
		const result = listHelper.favoriteBlog(blogs)
		const expectVal = {
			title: 'Canonical string reduction',
			author: 'Edsger W. Dijkstra',
			likes: 12,
		}
		expect(result).toEqual(expectVal)
	})
})

describe('most blogs', () => {
	test('when list has only one blog, the author has most blogs', () => {
		const result = listHelper.mostBlogs(listWithOneBlog)
		const expectVal = {
			author: 'Edsger W. Dijkstra',
			blogs: 1
		}
		expect(result).toEqual(expectVal)})

	test('when list has many blogs, the author has most blogs', () => {
		const result = listHelper.mostBlogs(blogs)
		const expectVal = {
			author: 'Robert C. Martin',
			blogs: 3
		}
		expect(result).toEqual(expectVal)
	})
})


describe('most likes', () => {
	test('when list has only one blog, the author has most blogs', () => {
		const result = listHelper.mostLikes(listWithOneBlog)
		const expectVal = {
			author: 'Edsger W. Dijkstra',
			likes: 5
		}
		expect(result).toEqual(expectVal)})

	test('when list has many blogs, the author has most blogs', () => {
		const result = listHelper.mostLikes(blogs)
		const expectVal = {
			author: 'Edsger W. Dijkstra',
			likes: 17
		}
		expect(result).toEqual(expectVal)
	})
})