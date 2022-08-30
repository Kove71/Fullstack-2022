import StatisticLine from './StatisticLine'

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

export default Statistics