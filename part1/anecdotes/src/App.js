import { useState } from 'react';

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  )
}

const Anecdote = (props) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const TopAnecdote = (props) => {

    let max = props.votes[0]
    let maxIndex = 0

    for (let i = 1; i < props.votes.length; i++){
      if (props.votes[i] > max){
        maxIndex = i
        max = props.votes[i]
      }
    }


  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{props.anecdotes[maxIndex]}</p>
      <p>Has {max} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0]);

  
  const copy = [...votes]

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8))
  }
  
  const castVote = () => {
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button onClick={castVote} name="vote" />
      <Button onClick={nextAnecdote} name="next anecdote" />
      <TopAnecdote anecdotes={anecdotes} votes={copy} />

    </div>
  )
}

export default App;
