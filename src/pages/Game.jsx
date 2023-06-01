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
import teachers from "../assets/teacherValues.json"

var teacher = teachers[0];


function changeInput(subject) {
  document.getElementById("subject-box").value = subject;
}

// function chooseTeacher() {
//   teacher = teachers[Math.floor(Math.random() * teachers.length)].name
// }

function submitGuess(guesstype, guess) {
  if(guesstype === "subject") {
    if(teacher.subject === guess) {
      console.log("GETS HERE");
      document.getElementById("subject-box").style.background = "green";
      document.getElementById("dropdown-button").disabled = true;
    }
  }
  else if(guesstype === "room") {
    console.log(teacher.roomNumber === Number(guess));
  }
}

function getRoomNumber() {
  let roomNumbers = document.getElementsByClassName("roomNumberInt");
  let room = roomNumbers[0].value + roomNumbers[1].value + roomNumbers[2].value
  return room;
}

const Game = () => {
  console.log(teacher);
  return (
    <Container fluid>
      <Row>
        <Col>
          <Form  id="numberInputs">
            <Form.Group>
              <Form.Control type="number" className="roomNumberInt" min="0" max="2"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" className="roomNumberInt" min="0" max="9"/>
            </Form.Group>
            <Form.Group>
              <Form.Control type="number" className="roomNumberInt" min="0" max="9" />
            </Form.Group>
            <Button onClick= {() => submitGuess("room", getRoomNumber())}>Submit</Button>
          </Form>
        </Col>
        <Col id="subjects-dropdown">
          <Form>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                id = "dropdown-button"
                >
                <Dropdown.Item href="#" onClick= {()=>changeInput("Math")}>Math</Dropdown.Item>
                <Dropdown.Item href="#" onClick= {()=>changeInput("Guidance")}>Guidance</Dropdown.Item>
                <Dropdown.Item href="#" onClick= {()=>changeInput("History")}>History</Dropdown.Item>
                <Dropdown.Item href="#" onClick= {()=>changeInput("World Language")}>World Language</Dropdown.Item>
                <Dropdown.Item href="#" onClick= {()=>changeInput("Guidance")}>Guidance</Dropdown.Item>
              </DropdownButton>
              <Form.Control id="subject-box" disabled/>
              
              <Button onClick= {() => submitGuess("subject", document.getElementById("subject-box").value)}>Submit</Button>
              
            </InputGroup>
          </Form>
        </Col>

      </Row>
    </Container>
  )
}

export default Game
