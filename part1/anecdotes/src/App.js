import { useState } from 'react'

const Button = (props) => {
  return (
    <>
      <button onClick={props.onClick}>
        {props.text}
      </button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length))

  const randomNumber = () => {
    let min = Math.ceil(0)
    let max = Math.floor(anecdotes.length)
    return Math.floor(Math.random() * (max - min) + min)
  }
  const getRandomAnecdote = () => setSelected(randomNumber())
  const increaseVotes = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  let highest = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={() => getRandomAnecdote()} text='next anecdote' />
      <Button onClick={increaseVotes} text='vote' />
      <h1>highest voted anecdote</h1>
      <p>{anecdotes[highest]}</p>
      <p>has {votes[highest]} votes</p>
    </div>
  )
}

export default App