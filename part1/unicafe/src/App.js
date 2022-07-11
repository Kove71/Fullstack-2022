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

const Feedback = (props) => (
  <>
    <Button
      onClick={props.increaseGood}
      text={props.textGood}
    />
    <Button
      onClick={props.increaseNeutral}
      text={props.textNeutral}
    />
    <Button
      onClick={props.increaseBad}
      text={props.textBad}
    />
  </>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad
  const average = () => (good + bad * -1) / all()
  const percentPositives = () => <>{good / all() * 100} %</>
  if (all() !== 0) {
    return (
      <>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all()} />
        <StatisticLine text='average' value={average()} />
        <StatisticLine text='positive' value={percentPositives()} />
      </>
    )
  }
  return <p>No feedback given</p>
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback
        increaseGood={increaseGood}
        increaseNeutral={increaseNeutral}
        increaseBad={increaseBad}
        textGood="good"
        textNeutral="neutral"
        textBad="bad"
      />
      <h1>statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App
