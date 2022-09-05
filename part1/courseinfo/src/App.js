const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <>
    <h1>{props.course.name}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    <> 
    {props.course.parts.map(val => {
      return (
        // key needs to be unique, here it is not unique
        <Part key={val.name} part={val.name} exercises={val.exercises}/>
      )
    })}
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  let sum = 0;
  props.course.parts.forEach(val => {
    sum += val.exercises;
  });
  return (
    <>
    <p>Number of exercises {sum}</p>
    </>
  )
}

export default App