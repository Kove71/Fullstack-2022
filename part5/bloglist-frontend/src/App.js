import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState('')
    const [user, setUser] = useState(null)
    const [messageColor, setMessageColor] = useState('green')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleMessage = (message, color) => {
        setMessageColor(color)
        setMessage(message)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const handleCreateBlog = async (event, blog) => {
        try {
            const returnedBlog = await blogService.postBlog(blog)
            setBlogs(blogs.concat(returnedBlog))
            handleMessage(`${blog.title} added`, 'green')
        } catch (exception) {
            handleMessage('posting message did not work', 'red')
        }

    }

    if (!user) {
        return (
            <div>
                <Message
                    message={message}
                    color={messageColor}
                />
                <Login
                    user={user}
                    setUser={setUser}
                    setMessage={setMessage}
                    loginService={loginService}
                    handleMessage={handleMessage}
                />
            </div>
        )
    }
    return (
        <div>
            <h2>blogs</h2>
            <Message
                message={message}
                color={messageColor}
            />
            <p>{user.name}
                <button
                    type='button'
                    onClick={handleLogout}>log out</button>
            </p>
            <CreateBlog
                user={user}
                blogService={blogService}
                setMessage={setMessage}
                setBlogs={setBlogs}
                blogs={blogs}
                handleCreateBlog={handleCreateBlog}
                handleMessage={handleMessage}
            />
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        </div>
    )
}

export default App
