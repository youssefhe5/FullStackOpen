const Course = ({course}) => {
    return (
      <div>
      <Header name={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts} />
       </div>
    )
  }

  
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
  
  const Total = ({parts}) =>{
  
    const initialValue = 0
    const sumWithInitial = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      initialValue
    )
  
    console.log(sumWithInitial)
    
    return (
      <div>
        <p> <b>total of {sumWithInitial} exercises</b></p>
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

  export default Course