import { useState } from 'react'

const CreateBlog = ({ handleCreateBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async (event) => {
        event.preventDefault()
        const blog = { title, author, url }
        handleCreateBlog(event, blog)

        setTitle('')
        setAuthor('')
        setUrl('')

    }

    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={createBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default CreateBlog