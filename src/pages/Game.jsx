import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import 'bootstrap/dist/css/bootstrap.css';
import "../css/Game.css"

const Game = () => {
  return (
    <Container fluid>
      <Row>
        <Form  className="numberInputs">
          <Form.Group>
            <Form.Control type="number" className="roomNumberInt" min="0" max="2"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="number" className="roomNumberInt" min="0" max="9"/>
          </Form.Group>
          <Form.Group>
            <Form.Control type="number" className="roomNumberInt" min="0" max="9" />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Dropdown Button
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

      </Row>
    </Container>
  )
}

export default Game
