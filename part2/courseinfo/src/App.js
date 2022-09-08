
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map((element) => {
        return (
          <Course key={element.id} course={element} />
        )
      })}
    </>
  )
}

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
export default App