import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood = () => setGood(good+1)
  const handleNeutral = () => setNeutral(neutral+1)
  const handleBad = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={"good"}/>
      <Button handleClick={handleNeutral} text={"neutral"}/>
      <Button handleClick={handleBad} text={"bad"}/>
      <br/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button> 
}

const Statistics = (props) => {
  const {good, neutral, bad} = props
  const all = good + neutral + bad
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  let average = 0
  if (all !== 0) {
    average = (good + bad) / all
  }

  let positive = 0
  if (all !== 0) { 
    // 小数点后保留15位
    positive = (good / all * 100).toFixed(15)
  }
  positive = positive + " %"

  // map赋值需要使用set
  let m = new Map()
  m.set("good",good)
  m.set("neutral", neutral)
  m.set("bad", bad)
  m.set("all", all)
  m.set("average", average)
  m.set("positive", positive)
  let arr = []
  // table, tr, p style
  const table_style = {
    borderCollapse:   "separate",   
    borderSpacing:   "0px",
  }
  const td_style = {
    padding: "0px",
    margin: "0px",
  }
  const p_style = {
    padding: "0px",
    margin: "0px",
  }
  // NB: <tr> must have a unique "key" prop
  let k = 0
  for (let [key, value] of m) {
    k++
    arr.push(<tr  key={k}><td style={td_style}><StatisticLine text={key} value={value} p_style={p_style}/></td></tr>)
  }
  
  // why does it need <tbody>? https://stackoverflow.com/questions/39915629/validatedomnesting-tr-cannot-appear-as-a-child-of-div
  return (
    <>
    <table style={table_style}>
    <tbody>
      {arr.map(val => {
        return val})}
    </tbody>
    </table>
    </>
  )
}

const StatisticLine = (props) => {
  const {text, value,p_style} = props
  return (
    <p style={p_style}>{text} {value}</p>
  )
}
export default App
