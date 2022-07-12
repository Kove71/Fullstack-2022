const Course = ({ course }) => {
    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

const Header = ({ header }) => <h1>{header}</h1>

const Total = ({ parts }) => {
    const initialValue = 0;
    const sum = parts.reduce(
        (previousValue, currentValue) => previousValue + currentValue.exercises,
        initialValue
    )
    return <p>Total of {sum} exercises</p>
}
const Part = ({ part }) =>
    <li>
        {part.name} {part.exercises}
    </li>

const Content = ({ parts }) =>
    <>
        <ul>
            {parts.map(part =>
                <Part key={part.id} part={part} />)
            }
        </ul>
        <Total parts={parts} />
    </>

export default Course