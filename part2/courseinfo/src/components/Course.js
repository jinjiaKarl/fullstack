const Course = ({course}) => {
    return (
        <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total sum={ course.parts.reduce((sum, part) => sum + part.exercises, 0) } />
        </>
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Total = ({ sum }) => <p><b>total of {sum} exercises </b></p>

const Part = ({ part }) => {
    return (
        <p>
        {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) =>  {
    return (
        <>
        {parts.map(part => <Part key={part.id} part={part} />)}
        </>
    )
}

export default Course
