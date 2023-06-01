import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';

import 'bootstrap/dist/css/bootstrap.css';
import "../css/Game.css"

function changeInput(subject) {
  document.getElementById("subject-box").value = subject;
}

function submitGuess() {

}

const Game = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
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
            <Button type="submit" onSubmit= {() => submitGuess()}>Submit</Button>
          </Form>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-secondary"
              id="subjects-dropdown">
              <Dropdown.Item href="#" onClick= {()=>changeInput("Math")}>Math</Dropdown.Item>
              <Dropdown.Item href="#" onClick= {()=>changeInput("Guidance")}>Guidance</Dropdown.Item>
              <Dropdown.Item href="#" onClick= {()=>changeInput("History")}>History</Dropdown.Item>
              <Dropdown.Item href="#" onClick= {()=>changeInput("World Language")}>World Language</Dropdown.Item>
              <Dropdown.Item href="#" onClick= {()=>changeInput("Guidance")}>Guidance</Dropdown.Item>
            </DropdownButton>
            <Form.Control id="subject-box" disabled/>
          </InputGroup>
        </Col>

      </Row>
    </Container>
  )
}

export default Game
