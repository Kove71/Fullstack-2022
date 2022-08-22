const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    request.body.likes = request.body.likes || 0
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    if (!request.body.title || !request.body.url) {
        return response.status(400).json({
            error: "title or url missing"
        })
    }
    const user = request.user

    const blog = new Blog({
        "title": request.body.title,
        "author": request.body.author,
        "url": request.body.url,
        "likes": request.body.likes,
        "user": user.id,
    })
    const result = await blog.save()
    user.blogs = user.blogs.concat(result.id)
    await user.save()
    response.status(201).json(result)


})

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    console.log(request.get('authorization'))
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = request.user
    const blog = await Blog.findById(id)
    if (blog.user.toString() === user.id.toString()) {
        result = await Blog.findByIdAndRemove(id)
        response.status(204).json(result)
    } else {
        response.status(401).json({ error: 'not the right user' })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const blog = new Blog(request.body)
    const id = request.params.id

    result = await Blog.findByIdAndUpdate(id, blog,
        {
            new: true,
            runValidators: true,
            context: 'query'
        })
    response.status(200).json(result)

})

module.exports = blogsRouter