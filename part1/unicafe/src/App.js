import React, { useState } from 'react'

const Button = ({handler, name}) => {
  return (
	<button onClick={handler}>
	  {name}
	</button>  
  )
}

const StatisticLine = ({text, value}) => {
  return (
	<tr>
	  <td>
		{text}
	  </td>
	  <td>
	    {value}
	  </td>	
	</tr>
  )
}	

const Statistics = ({good, neutral, bad}) => {
  if (good || neutral || bad) {  
	return (
	  <table>
		<tbody>
		  <StatisticLine text="good" value={good} />
		  <StatisticLine text="neutral" value={neutral} />
		  <StatisticLine text="bad" value={bad} />
		  <StatisticLine text="all" value={good + neutral + bad} />
		  <StatisticLine text="average" value={(good - bad)/(good + neutral + bad)} />
		  <StatisticLine text="positive" value={(good/(good + neutral + bad)*100)+"%"} />
		</tbody>  
	  </table>	
	)
  } else {
	return <div>No feedback given</div>
  }		
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
	  <h1>give feedback</h1>
      <Button handler={() => setGood(good + 1)} name="good" />
	  <Button handler={() => setNeutral(neutral + 1)} name="neutral" />
	  <Button handler={() => setBad(bad + 1)} name="bad" />
	  <h1>statistics</h1>
	  <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
