import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Col, Row } from 'react-bootstrap'
import 'github-markdown-css/github-markdown.css'


const Section = props => {

  return (
      <Row className="mt-3">
        <Col md={8}>
          <ReactMarkdown className="markdown-body">{props.markdown}</ReactMarkdown>
        </Col>
        <Col md={4}>
          {props.children}
        </Col>
      </Row>
  )
}

export default Section
