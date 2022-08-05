const _ = require('lodash')

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map((blog) => blog.likes)
    return likes.reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
    const max_likes = Math.max(...blogs.map(b => b.likes))
    return blogs.filter(b => b.likes === max_likes)[0]
}

const mostBlogs = (blogs) => {
    if (blogs.length < 1) {
        return null
    }
    const authors = blogs.map(b => b.author)
    const authorList = _.values(_.groupBy(authors))
    const author = authorList[authorList.length - 1]
    return { author: author[0], blogs: author.length }
}

const mostLikes = (blogs) => {
    if (blogs.length < 1) {
        return null
    }

    const authorList =
        _(blogs)
            .groupBy('author')
            .map((objs, key) => ({
                'author': key,
                'likes': _.sumBy(objs, 'likes')
            }))
            .sortBy(blogs, ['likes'])
            .value()

    return authorList[authorList.length - 1]
}

module.exports = {
    dummy,
    totalLikes,
    listWithOneBlog,
    blogs,
    favoriteBlog,
    mostBlogs,
    mostLikes
}