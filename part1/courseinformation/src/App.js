
const Header = (course) => {
  console.log(course)

  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = (content) => {

  return (
    <div>
      <Part name={content.part1} number={content.exercises1}/>
      <Part name={content.part2} number={content.exercises2}/>
      <Part name={content.part3} number={content.exercises3}/>
    </div>
  )
}

const Total = (total) =>{
  return (
    <div>
      <p>Number of exercises {total.exercises1 + total.exercises2 + total.exercises3}</p>
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

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
    <Header name={course} />
    <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
    <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
     </div>
    
  )

}

export default App;
