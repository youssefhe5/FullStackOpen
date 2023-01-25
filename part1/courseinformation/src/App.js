
const Header = (course) => {
  console.log(course)

  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({parts}) => {

  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} number={part.exercises}/>
        )}

    </div>
  )
}

const Total = (total) =>{

  
  return (
    <div>
      <p>Number of exercises {total.parts[0].exercises + total.parts[1].exercises + total.parts[2].exercises}</p>
    </div>
  )
}

const Part = (parts) => {
  return (
  <div>
    <p>{parts.name} {parts.number}</p>
  </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
    <Header name={course.name} />
    <Content parts={course.parts}/>
     </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  } 

  return (
    <Course course={course} />    
  )

}

export default App;
