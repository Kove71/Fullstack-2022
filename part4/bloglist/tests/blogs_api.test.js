const mongoose = require('mongoose')
const supertest = require('supertest')
const { response, request } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const listHelper = require('../utils/list_helper')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})


    for (let blog of listHelper.blogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

    const passwordHash = await bcrypt.hash('simsalabim', 10)
    const user = new User({ username: 'alibaba', passwordHash })
    await user.save()

    const token = await api
        .post('/api/login')
        .send({ username: 'alibaba', password: 'simsalabim' })
    request.token = token.body.token
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .set('Authorization', request.token)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('blogs have id string attribute', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', request.token)
    expect(response.body[0].id).toBeDefined()
})

test('database returns correct amount of posts', async () => {
    const response = await api
        .get('/api/blogs')
        .set('Authorization', request.token)
    expect(response.body).toHaveLength(listHelper.blogs.length)
})

test('database grows by one after adding a blog', async () => {
    const initialLength = listHelper.blogs.length
    const newBlog = {
        "title": "velikullan väitökset",
        "author": "velikulta",
        "url": "google.com",
        "likes": 4
    }
    await api
        .post('/api/blogs')
        .set('Authorization', request.token)
        .send(newBlog)

    const response = await api
        .get('/api/blogs')
        .set('Authorization', request.token)

    expect(response.body).toHaveLength(initialLength + 1)
})

test('adding a blog with no likes gives it zero likes', async () => {
    const newBlog = {
        "title": "velikulta joi taas aivan liikaa",
        "author": "velikulta",
        "url": "google.com",
    }
    await api
        .post('/api/blogs')
        .set('Authorization', request.token)
        .send(newBlog)
        .expect(201)

    const response = await api
        .get('/api/blogs')
        .set('Authorization', request.token)
    const responseBlog = response.body.find(blog => blog.title === "velikulta joi taas aivan liikaa")
    expect(responseBlog.likes).toBe(0)


})

describe('posting an incorrect blog', () => {

    test('posting a blog with no title returns 400', async () => {
        const newBlog = {
            "author": "velikulta",
            "url": "google.com",
        }
        await api
            .post('/api/blogs')
            .set('Authorization', request.token)
            .send(newBlog)
            .expect(400)
    })

    test('posting a blog with no url returns 400', async () => {
        const newBlog = {
            "title": "velikulta joi taas aivan liikaa",
            "author": "velikulta",
        }
        await api
            .post('/api/blogs')
            .set('Authorization', request.token)
            .send(newBlog)
            .expect(400)
    })

    test('posting a blog with no url or title returns 400', async () => {
        const newBlog = {
            "author": "velikulta",
        }
        await api
            .post('/api/blogs')
            .set('Authorization', request.token)
            .send(newBlog)
            .expect(400)
    })
    test('posting a blog with no authorization returns 401', async () => {
        const newBlog = {
            "title": "velikulta joi taas aivan liikaa",
            "author": "velikulta",
            "url": "google.com",

        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('deleting blogs', () => {

    test('deleting a blog returns 204 and makes the list one shorter', async () => {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const newBlog = {
            "title": "jehmakirja",
            "author": "velikulta",
            "url": "google.com",
            "user": decodedToken.id
        }

        await api
            .post('/api/blogs')
            .set('Authorization', request.token)
            .send(newBlog)

        const response = await api
            .get('/api/blogs')
            .set('Authorization', request.token)

        const blogs = await api
            .get('/api/blogs')
            .set('Authorization', request.token)

        blog = blogs.body.find(blog => blog.title === 'jehmakirja')

        const initialLength = response.body.length
        result = await api
            .delete(`/api/blogs/${blog.id}`)
            .set('Authorization', request.token)
            .expect(204)
        const secondResponse = await api
            .get('/api/blogs')
            .set('Authorization', request.token)

        expect(secondResponse.body).toHaveLength(initialLength - 1)
    })

})

describe('updating blogs', () => {

    test('updating a blog returns 204 and updates the data', async () => {
        const blogId = "5a422aa71b54a676234d17f8"

        const newBlog = {
            "_id": blogId,
            "title": "velikulta nyt rauhotu hyvä mies",
            "author": "velikulta",
            "url": "google.com",
        }
        result = await api
            .put(`/api/blogs/${blogId}`)
            .set('Authorization', request.token)
            .send(newBlog)
            .expect(200)
        expect(result.body.title).toBe("velikulta nyt rauhotu hyvä mies")
        expect(result.body.likes).toBe(5)
    })

})

afterAll(() => {
    mongoose.connection.close()
})