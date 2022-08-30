import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        changeAnecdote(state, action) {
            const changedAnecdote = action.payload
            return state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote).sort((a, b) => b.votes - a.votes)
        },
        appendAnecdote(state, action) {
            state.push(action.payload)
        },
        setAnecdotes(state, action) {
            return action.payload.sort((a, b) => b.votes - a.votes)
        }
    }
})

export const { changeAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const incrementVotes = anecdote => {
    return async dispatch => {
        const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
        await anecdoteService.updateAnecdote(newAnecdote)
        dispatch(changeAnecdote(newAnecdote))
    }
}
export default anecdoteSlice.reducer