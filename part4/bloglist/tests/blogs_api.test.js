const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Pippelin pituuksista: pari huomiota',
		author: 'Virveli Viivanenä',
		url: 'https://blogpost.pippelifanaatikko.com/pippelin_pituuksista:_pari_huomiota',
		likes: 12
	},
	{
		title: 'Kuinka paljon on liikaa pippeleitä? Tarinoita nuoruudestani',
		author: 'Virveli Viivanenä',
		url: 'https://blogpost.pippelifanaatikko.com/kuinka_paljon_on_liikaa_pippeleita?_tarinoita_nuoruudestani',
		likes: 7
	}
]

beforeEach(async () => {
	await Blog.deleteMany({})

	for (let blog of initialBlogs) {
		let blogObject = new Blog(blog)
		await blogObject.save()
	}
})

test('blogs are returned as json', async () => {
	await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
})

test('blogs have id string attribute', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body[0].id).toBeDefined()
})

test('database returns correct amount of posts', async () => {
	const response = await api.get('/api/blogs')
	expect(response.body).toHaveLength(initialBlogs.length)
})


afterAll(() => {
	mongoose.connection.close()
})