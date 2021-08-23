import React from 'react'

const Form = (props) => {
  return (
    <form onSubmit={props.handler}>
      <div>
        name: <input value={props.name} onChange={props.nameHandler} />
      </div>
	  <div>
		number: <input value={props.phone} onChange={props.phoneHandler} />
	  </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default Form