import React from 'react'

const Terminal = props => {

  const messagesEndRef = React.createRef();

  console.log("redraw terminal");

  React.useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  },[messagesEndRef])



  return (
    <pre>
      {props.content}
      <div ref={messagesEndRef} />
    </pre>
  )
}

export default Terminal
