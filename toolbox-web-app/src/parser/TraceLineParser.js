

const TraceLineParser = (model, line) => {
  const lineElementList = line.split(':');

  //is the first item the timestamp
  let timestamp = 0.0;
  let elementList = lineElementList;
  if( String(line).startsWith("t") && lineElementList.length > 1 ){
    timestamp = parseFloat(lineElementList[0].slice(1));
    elementList = lineElementList.slice(1);
  }

  console.log(`parse line ${line}`)
  if( elementList.length > 1 ){

    const first = String(elementList[0]).toUpperCase() ;
    if( first === 'DIRECTIVE' || first === 'DIR' ){
      if( elementList.length > 3 ){
        console.log(`ADD DIRECTIVE ${elementList.join(':')}`)
        const type = elementList[1];
        const name = elementList[2];
        const sources = elementList[3];
        const description = elementList.length > 4 ? elementList[4] : "";
        const entry = {ts: timestamp, type: type, name: name, sources: sources, description: description};
        model.directiveList.push(entry);
      }
      // DIR:<type>:<name>
    } else if ( first === 'DAT' || first === 'DATA' || first === 'D' ){
      if( elementList.length > 2){
        const name = elementList[1];
        const value = elementList.splice(2).join(":");
        const entry = {ts: timestamp,  name: name, value: value };
        model.data.push(entry);
      }
    } else {
      if( elementList.length > 1){
        const name = elementList[0];
        const value = elementList.splice(1).join(":");
        const entry = {ts: timestamp,  name: name, value: value };
        model.log.push(entry)
      } else {
        model.log.push({name: "<raw>", value: line});
      }
    }
  }
}

export default TraceLineParser
