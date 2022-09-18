const dummy = () => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
	const favorite = blogs.reduce((favorite, blog) => {
		if (blog.likes > favorite.likes) {
			return blog
		}
		return favorite
	}, blogs[0])
	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	}
}

// TODO: use Lodash
const mostBlogs = (blogs) => {
	// 获取作者列表
	const authors = blogs.reduce((authors, blog) => {
		if (authors[blog.author]) {
			authors[blog.author] += 1
		} else {
			authors[blog.author] = 1
		}
		return authors
	}, {})
	// 返回blog最多的作者
	const author = Object.keys(authors).reduce((author, key) => {
		// 注意任何值和undefined比较都是false
		if (authors[author] === undefined || authors[key] > authors[author]) {
			return key
		}
		return author
	}, '')
	return {
		author: author,
		blogs: authors[author]
	}
}

const mostLikes = (blogs) => {
	let maxLikes = 0
	let name = ''
	// 获取作者列表
	blogs.reduce((authors, blog) => {
		if (authors[blog.author]) {
			authors[blog.author] += blog.likes
		} else {
			authors[blog.author] = blog.likes
		}
		if (authors[blog.author] > maxLikes) {
			maxLikes = authors[blog.author]
			name = blog.author
		}
		return authors
	}, {})
	return {
		author: name,
		likes: maxLikes
	}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}