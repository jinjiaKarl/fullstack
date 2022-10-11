interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescription {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescription {
  type: "special";
  requirements: Array<string>;
}


type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const App = () => {
  const courseName = "Half Stack application development";
  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is the easy course part",
    type: "normal"
  },
  {
    name: "Advanced",
    exerciseCount: 7,
    description: "This is the hard course part",
    type: "normal"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    type: "groupProject"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
    type: "submission"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    type: "special"
  }
]

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

const Header = (props: { name: string }): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
}


// CoursePart[] 等价于 Array<CoursePart>
const Content = (props: { parts: CoursePart[] }): JSX.Element => {
  return (
    <div>
      {props.parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

const Part = (props: { part: CoursePart }): JSX.Element => {
  switch (props.part.type) {
    case "normal":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p><i>{props.part.description}
          </i></p>
        </div>
      )
    case "groupProject":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p>project exercises {props.part.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p><i>{props.part.description}
          </i></p>
          <p>submit to {props.part.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
          <p><i>{props.part.description}
          </i></p>
          <p>required skills: {props.part.requirements.join(", ")}</p>
        </div>
      )
    default:
      return assertNever(props.part)
}
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

const Total = (props: { parts: CoursePart[] }): JSX.Element => {
  return (
    <p>
      Number of exercises {" "}
      {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default App;