import React from 'react'

const Terminal = props => {

  const messagesEndRef = React.createRef();
  const data = React.useRef("");
  const content = props.content;
  const isFilterData = props.isFilterData;
  const isFilterDirective = props.isFilterDirective;
  const setBusy = props.setBusy;

  React.useEffect(() => {
    //messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef])

  React.useEffect(() => {
    setBusy(false);
  }, [setBusy]);

  function parse(incoming){
    let lines = incoming.split("\n");
    for(let i in lines){
      let isFiltered = false;
      if( lines[i] === "" || lines[i] === null || lines[i] === undefined ){
        isFiltered = true;
      } else if( isFilterDirective !== false && String(lines[i]).startsWith("DIR:")){
        isFiltered = true;
      } else if( isFilterData !== false && String(lines[i]).startsWith("DAT:")){
        isFiltered = true;
      }
  
      if( isFiltered === false ){
        data.current += lines[i] + '\n';
      }
    }
  }

  React.useEffect(() => {
    parse(content);
  }, [content, isFilterData, isFilterDirective])



  return (
    <pre>
      {data.current + '\n'}
      <div ref={messagesEndRef} />
    </pre>
  )
}

export default Terminal
