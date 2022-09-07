import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  // https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const handleButton = () => {
    // generate ramdom integer [0, anecdotes.length)
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }
  const handleVote = () => {
    // copy an array
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  
  const getMostVotes = () => {
    let max = 0
    let index = 0
    for (let i = 0; i < votes.length; i++) {
      if (votes[i] > max) {
        max = votes[i]
        index = i
      }
    }
    return index
  }
  let mostVotesIndex = getMostVotes()
   
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <Button handleClick={handleVote} text={"vote"}/>
      <Button handleClick={handleButton} text={"next anecdote"}/>
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotesIndex]}
      <br/>
      has {votes[mostVotesIndex]} votes
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button> 
}

export default App