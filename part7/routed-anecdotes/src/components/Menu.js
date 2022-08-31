import {
    BrowserRouter as Router, Routes, Route, Link
} from "react-router-dom"
import About from "./About"
import AnecdoteList from "./AnecdoteList"
import CreateNew from "./CreateNew"
import SingleAnecdote from "./SingleAnecdote"
import Notification from "./Notification"
const Menu = (props) => {
    const padding = {
        padding: 5
    }

    return (
        <Router>
            <div>
                <div>
                    <Link style={padding} to='/'>anecdotes</Link>
                    <Link style={padding} to='/create'>create new</Link>
                    <Link style={padding} to='/about'>about</Link>
                </div>

                <Notification notification={props.notification} />

                <Routes>
                    <Route path='/' element={<AnecdoteList anecdotes={props.anecdotes} />} />
                    <Route path='/create' element={<CreateNew addNew={props.addNew} />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/anecdotes/:id' element={<SingleAnecdote anecdotes={props.anecdotes} />} />
                </Routes>

            </div>
        </Router>

    )
}

export default Menu