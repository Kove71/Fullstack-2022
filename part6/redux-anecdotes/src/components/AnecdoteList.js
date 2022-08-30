import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (!filter) {
            return anecdotes
        }
        return anecdotes.filter(anecdote => {
            return anecdote.content.toLowerCase().includes(filter.toLowerCase())
        }
        )
    })

    const vote = (anecdote) => {
        dispatch(incrementVotes(anecdote))
        dispatch(setNotification(`You've voted ${anecdote.content}`, 5))
    }


    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList