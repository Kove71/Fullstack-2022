import Togglable from './Togglable'

const Blog = ({ blog, handleLike, handleDelete }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={blogStyle}>
            {blog.title}
            <Togglable buttonLabel='view'>
                {blog.url}<br />
                {blog.likes} <button onClick={(event) => handleLike(event, blog)}>like</button><br />
                {blog.author}<br />
                <button onClick={(event) => handleDelete(event, blog)}>remove</button>
            </Togglable>
        </div>
    )
}


export default Blog