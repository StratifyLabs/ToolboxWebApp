import React from 'react'

import { Button, Row, Badge } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faFilter,
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from '../AppContainer'


function getVariant(v) {
  switch (v) {
    case "DEBUG":
      return "secondary";
    case "INFO":
      return "secondary";
    case "WARNING":
      return "warning";
    case "ERROR":
      return "danger";
    case "FATAL":
      return "danger";
    default:
      return "primary";
  }
}


const Entry = props => {

  const name = props.item.name;
  const data = props.item.data;
  const message = props.item.message;

  return (
    <Row className="mb-1">
      <Badge variant="primary" className="mr-2">{props.count + 1}</Badge>
      {` ${message}`}
      <span className="float-right">
        <Badge variant={getVariant(name)} className="ml-2 mr-2">{name}</Badge>
        <Badge variant="info" className="mr-2">{data}</Badge></span>
    </Row>
  )
}


const Log = props => {


  let entryList = [];

  const nameList = ["DEBUG", "DG", "INFO", "I", "WARNING", "WARN", "ERROR", "FATAL"];
  let nameFilterList = [];
  let dataFilterList = [];

  function normalizeName(v) {
    switch (v) {
      case "DG":
        return "DEBUG";
      case "I":
        return "INFO";
      case "WARN":
        return "WARNING";
      default:
        return v;
    }
  }

  for (let i in props.log) {
    const name = normalizeName(props.log[i].name);
    if (nameList.includes(name)) {
      const tokenList = props.log[i].value.split(":");
      const data = tokenList[0];
      const message = tokenList.splice(1).join(":");
      entryList.push({ ts: props.log[i].ts, name: name, data: data, message: message })
      if (nameFilterList.includes(name) === false) {
        nameFilterList.push(name);
      }
      if (dataFilterList.includes(data) === false) {
        dataFilterList.push(data);
      }
    }
  }


  return (
    <AppContainer>
      <Row className="mb-2">
        {nameFilterList.map((element, index) => {
          return (
            <Button className="mr-2 btn-sm" variant={getVariant(element)} key={index}><FA icon={faFilter} /> {element} </Button>
          )
        })}
        {dataFilterList.map((element, index) => {
          return (
            <Button className="mr-2 btn-sm" variant="info" key={index}><FA icon={faFilter} /> {element} </Button>
          )
        })}
      </Row>

      {entryList.map((element, index) => { return <Entry count={index} item={element} key={index} /> })}
    </AppContainer>
  )
}

export default Log
