const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has no blogs, likes equals 0', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listHelper.listWithOneBlog)
        expect(result).toBe(5)
    })

    test('when list has multiple blogs, equals the sum of the likes of the list', () => {
        const result = listHelper.totalLikes(listHelper.blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('is returned when there is one blog', () => {
        const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
        const expected = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }

        expect(result).toEqual(expected)
    })

    test('is returned when there are several blogs', () => {
        const result = listHelper.favoriteBlog(listHelper.blogs)
        const expected = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }

        expect(result).toEqual(expected)
    })

    test('is returned when there are no blogs', () => {
        const result = listHelper.favoriteBlog([])

        expect(result).toBe(undefined)
    })
})

describe('most blogs', () => {
    test('is returned when there is one blog', () => {
        const result = listHelper.mostBlogs(listHelper.listWithOneBlog)
        const expected = {
            author: 'Edsger W. Dijkstra',
            blogs: 1
        }
        expect(result).toEqual(expected)
    })

    test('is returned when there are several blogs', () => {
        const result = listHelper.mostBlogs(listHelper.blogs)
        const expected = {
            author: 'Robert C. Martin',
            blogs: 3
        }
        expect(result).toEqual(expected)
    })

    test('is returned when there are no blogs', () => {
        const result = listHelper.mostBlogs([])

        expect(result).toBe(null)
    })
})

describe('most likes', () => {
    test('is returned when there is one blog', () => {
        const result = listHelper.mostLikes(listHelper.listWithOneBlog)
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 5
        }
        expect(result).toEqual(expected)
    })

    test('is returned when there are several blogs', () => {
        const result = listHelper.mostLikes(listHelper.blogs)
        console.log(result)
        const expected = {
            author: 'Edsger W. Dijkstra',
            likes: 17
        }
        expect(result).toEqual(expected)
    })

    test('is returned when there are no blogs', () => {
        const result = listHelper.mostLikes([])

        expect(result).toBe(null)
    })
})