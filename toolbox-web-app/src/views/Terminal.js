import React from 'react'

const Terminal = props => {

  const messagesEndRef = React.createRef();
  const content = (props.configuration !== undefined && props.configuration.data !== undefined) ? String(props.configuration.data.text.join('')) : "";


  React.useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  },[content])

  return (
    <pre>
      {content}
      <div ref={messagesEndRef} />
    </pre>
  )
}

export default Terminal
