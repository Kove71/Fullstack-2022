const mongoose = require('mongoose')
const supertest = require('supertest')
const { response } = require('../app')
const app = require('../app')
const user = require('../models/user')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const newUser = {
        "username": "test",
        "name": "test",
        "password": "test"
    }
    await api
        .post('/api/users')
        .send(newUser)
})


test('addind a user successfully', async () => {
    const newUser = {
        "username": "abc",
        "name": "abc",
        "password": "def"
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
})

test('users are returned as json', async () => {
    await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

describe('creating invalid users does not work', () => {
    test('username not given', async () => {
        const newUser = {
            "name": "xxx",
            "password": "xxx"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('password not given', async () => {
        const newUser = {
            "username": "xxx",
            "name": "xxx"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })


    test('username too short', async () => {
        const newUser = {
            "username": "xx",
            "name": "xxx",
            "password": "xxx"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
    test('password too short', async () => {
        const newUser = {
            "username": "xxx",
            "name": "xxx",
            "password": "xx"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('username already in database', async () => {
        const newUser = {
            "username": "test",
            "name": "xxx",
            "password": "xxx"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})