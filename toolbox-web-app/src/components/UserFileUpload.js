import React from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { useDropzone } from 'react-dropzone'

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import {
  faBoxOpen,
  faBullseye,
  faUpload
} from '@fortawesome/free-solid-svg-icons'

import AppContainer from './AppContainer'

const UserFileUpload = props => {

  const [isOverwrite, setOverwrite] = React.useState(false);

  const onDrop = React.useCallback(acceptedFiles => {
    // Do something with the files
    console.log(`${JSON.stringify(acceptedFiles)}`)

  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


  function toggleOverwrite() {
    setOverwrite(!isOverwrite);
    console.log(`is overwrite ${!isOverwrite}`)
  }

  return (
    <AppContainer>
      <Form>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Overwrite Existing Files" defaultChecked={isOverwrite} onChange={toggleOverwrite} />
        </Form.Group>
      </Form>
      <Card className="text-center" style={{cursor: "pointer"}}>
        <Card.Body {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drop files here</p>
          {
            isDragActive ?
              <p><FA icon={faBullseye} size="2x" /></p> : <p><FA icon={faBoxOpen} size="2x" /></p>
          }
          <p><Button variant="light"><FA icon={faUpload} /> Upload</Button></p>
        </Card.Body>
      </Card>
    </AppContainer>
  )
}

export default UserFileUpload
