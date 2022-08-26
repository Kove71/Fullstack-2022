import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Message from './components/Message'
import Togglable from './components/Togglable'


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

    const createBlogRef = useRef()

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
            createBlogRef.current.toggleVisibility()
            const returnedBlog = await blogService.postBlog(blog)
            setBlogs(blogs.concat(returnedBlog))
            handleMessage(`${blog.title} added`, 'green')
        } catch (exception) {
            handleMessage('creating blog did not work', 'red')
        }

    }

    const handleLike = async (event, blog) => {
        event.preventDefault()
        try {
            const newBlog = {
                ...blog,
                likes: blog.likes + 1,
                user: blog.user.id
            }
            await blogService.putBlog(newBlog)
            newBlog.user = {
                username: blog.user.username,
                name: blog.user.name
            }
            const updatedBlogs = blogs
                .map(b => b.id !== blog.id ? b : newBlog)
                .sort((a, b) => b.likes - a.likes)

            setBlogs(updatedBlogs)

        } catch (exception) {
            handleMessage('updating blog did not work', 'red')
        }
    }

    const handleDelete = async (event, blog) => {
        event.preventDefault()
        if (window.confirm(`Do you want to remove ${blog.title}?`)) {
            try {
                await blogService.deleteBlog(blog)
                const updatedBlogs = blogs.filter(b => b.id !== blog.id)
                setBlogs(updatedBlogs)
            } catch (exception) {
                handleMessage('removing blog did not work', 'red')
            }
        }
    }

    if (!user) {
        return (
            <div>
                <Message
                    message={message}
                    color={messageColor}
                />
                <Togglable
                    buttonLabel="login"
                >
                    <Login
                        user={user}
                        setUser={setUser}
                        setMessage={setMessage}
                        loginService={loginService}
                        handleMessage={handleMessage}
                    />
                </Togglable>
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
            <Togglable
                buttonLabel='new blog'
                ref={createBlogRef}
            >
                <CreateBlog
                    user={user}
                    blogService={blogService}
                    setMessage={setMessage}
                    setBlogs={setBlogs}
                    blogs={blogs}
                    handleCreateBlog={handleCreateBlog}
                    handleMessage={handleMessage}
                />
            </Togglable>

            {blogs.map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                />
            )}

        </div>
    )
}

export default App
