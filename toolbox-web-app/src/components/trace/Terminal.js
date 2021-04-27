import React from 'react'

const Terminal = props => {

  const messagesEndRef = React.createRef();

  React.useEffect(() => {
    //messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef])

  let data = "";
  let lines = props.content.split("\n");

  for(let i in lines){
    let isFiltered = false;
    if( props.isFilterDirective !== false && String(lines[i]).startsWith("DIR:")){
      isFiltered = true;
    } else if( props.isFilterData !== false && String(lines[i]).startsWith("DAT:")){
      isFiltered = true;
    }

    if( isFiltered === false ){
      data += lines[i] + '\n';
    }


  }



  return (
    <pre>
      {data}
      <div ref={messagesEndRef} />
    </pre>
  )
}

export default Terminal
