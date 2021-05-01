import React from 'react'

import { Button, Col, Row, Badge } from 'react-bootstrap'
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faFilter,
} from '@fortawesome/free-solid-svg-icons'

import { VictoryChart, VictoryStack, VictoryArea, VictoryBar, VictoryZoomContainer } from "victory";
import Theme from './Theme'

import AppContainer from '../AppContainer'


const Entry = props => {

  const name = props.item.name;
  const data = props.item.data;
  const message = props.item.message;

  function badgeVariant(v){
    switch(v){
      case "INFO":
      case "I":
        return "secondary";
      case "WARN":
      case "WARNING":
        return "warning";
    }
  }

  console.log(`message: ${props.value}`)
  return (
    <Row className="mb-1">
      <Badge variant="primary" className="mr-2">{props.count+1}</Badge>
      {` ${message}` }
      <span className="float-right">
      <Badge variant={badgeVariant(name)} className="ml-2 mr-2">{name}</Badge>
      <Badge variant="info" className="mr-2">{data}</Badge></span>
    </Row>
  )
}


const Log = props => {


  let entryList = [];

  const nameList = ["INFO", "I", "WARNING", "WARN", "ERROR", "FATAL"];
  let nameFilterList = [];
  let dataFilterList = [];

  for (let i in props.log) {
    const name = props.log[i].name;
    console.log(`parse name ${name}`);
    if (nameList.includes(name)) {
      const tokenList = props.log[i].value.split(":");
      const data = tokenList[0];
      const message = tokenList.splice(1).join(":");
      entryList.push({ name: name, data: data, message: message })
      if (nameFilterList.includes(name) == false) {
        nameFilterList.push(name);
      }
      if (dataFilterList.includes(data) == false) {
        dataFilterList.push(data);
      }
    }
  }


  return (
    <AppContainer>
      <Row>Log</Row>
      <Row className="mb-2">
        {nameFilterList.map((element, index) => {
          return (
            <Button className="mr-2" variant="secondary" key={index}><FA icon={faFilter} /> {element} </Button>
          )
        })}
        {dataFilterList.map((element, index) => {
          return (
            <Button className="mr-2 btn-sm" variant="info" key={index}><FA icon={faFilter} /> {element} </Button>
          )
        })}
      </Row>

      {entryList.map((element, index) => { return <Entry count={index} item={element} /> })}
    </AppContainer>
  )
}

export default Log
