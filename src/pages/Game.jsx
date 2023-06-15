import React, { useEffect, useState } from 'react'
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
import * as scripts from "../utils/scripts"


var teacher = scripts.getTodaysTeacher();
let doc = {
  roomCounter: 0,
  subjectCounter: 0,
  teacherCounter: 0,
  dayNum: scripts.getDayNumber()
}

const Game = () => {
  //console.log(teacher);

  const [roomCounter, addRoomCounter] = useState(0)
  const [subjectCounter, addSubjectCounter] = useState(0)
  const [teacherCounter, addTeacherCounter] = useState(0)
  const [greenCount, addGreenCounter] = useState(0)


  useEffect(() => {
    var box = document.getElementsByClassName("roomNumberInt")
    if (subjectCounter >= 5) {
      document.getElementById("dropdown-button").disabled = true;
      document.getElementById("subject-submit").disabled = true;
    }
    if (roomCounter >= 5 || greenCount >= 3) {
      for (var i = 0; i < 3; i++) {
        box[i].disabled = true;
      }
      document.getElementById("roomNumber-submit").disabled = true;
    }
    if (teacherCounter >= 5) {
      document.getElementById("dropdown-button").disabled = true;
      document.getElementById("subject-box").disabled = true;
      document.getElementById("subject-submit").disabled = true;
      for (var j = 0; j < 3; j++) {
        box[j].disabled = true;
      }
      document.getElementById("roomNumber-submit").disabled = true;
      document.getElementById("teacherGuess").disabled = true;
      document.getElementById("teacher-submit").disabled = true;
    }
  }, [subjectCounter, roomCounter, teacherCounter, greenCount]);


  function changeInput(subject) {
    document.getElementById("subject-box").value = subject;
  }


  function submitGuess(guesstype, guess) {
    if (guess === ""){
      alert("please give input")
    }
    else if (guesstype === "subject") {
      scripts.saveToCookie(guesstype, doc)
      addSubjectCounter(subjectCounter + 1);
      if (guess === "") {

      }
      else if (teacher.subject === guess) {
        document.getElementById("subject-box").style.background = "green";
        document.getElementById("dropdown-button").disabled = true;
        document.getElementById("subject-submit").disabled = true;
      }
      else {
        document.getElementById(guess).outerHTML = "";
        document.getElementById("subject-box").value = "";
      }
    }
    else if (guesstype === "room") {
      scripts.saveToCookie(guesstype, doc)
      
      var guessDigits = guess.split("");
      var realDigits = teacher.roomNumber.toString().split("");
      var box = document.getElementsByClassName("roomNumberInt")
      var green = 0;
      var emptyDigit= false;
      console.log(guessDigits)
      for(let i = 0; i < 3; i++) {
        if(guessDigits[i] === "") {
          emptyDigit = true;
        }
      }
      if(guessDigits.length < 3) {
        emptyDigit = true;
        alert("please fill out all boxes")
      }

      if(!emptyDigit) {
        addRoomCounter(roomCounter + 1)
        for (let i = 0; i < 3; i++) {
          if (guessDigits[i] === realDigits[i]) {
            green++;
            box[i].style.background = "green";
            box[i].disabled = true;
            realDigits[i] = "claimedGreen";
          }
          if (green === 3) {
            addGreenCounter(3);
          }
  
        }
        for (let i = 0; i < 3; i++) {
          if ((box[i].style.background !== "green")) {
            if (realDigits.includes(guessDigits[i])) {
              box[i].style.background = "yellow";
              realDigits[realDigits.indexOf(guessDigits[i])] = "claimedYellow";
            }
            else {
              box[i].style.background = "white";
            }
          }
        }
      }
      

    }
    else if (guesstype === "teacher") {
      scripts.saveToCookie(guesstype, doc)
      addTeacherCounter(teacherCounter + 1);
      let name = teacher.name.toLowerCase().split(" ")
      if (guess.toLowerCase() === name[1]) {
        document.getElementById("teacherGuess").disabled = true;
        document.getElementById("teacher-submit").disabled = true;
        document.getElementById("teacherGuess").style.background = "green";

      }
    }
  }

  function getRoomNumber() {
    let roomNumbers = document.getElementsByClassName("roomNumberInt");
    let room = roomNumbers[0].value + roomNumbers[1].value + roomNumbers[2].value
    return room;
  }


  return (
    <Container fluid>

      <Row>
        <p className='teacher-p'>Who's the teacher? <span className='count-p'>{teacherCounter}/5</span></p>
        <Form.Group>
          <Row>
            <Form.Control type="text" className="teacherGuess" id='teacherGuess' />
            <Button id="teacher-submit" onClick={() => submitGuess("teacher", document.getElementById("teacherGuess").value)}>Guess!</Button>
          </Row>
        </Form.Group>
      </Row>
  
      <br></br>

        <Col>
            <p className='room-p'>What's their room number? <span className='count-p'>{roomCounter}/5</span></p>
        </Col>

        <Col>
          <Row>
            <Form id="numberInputs">
              <Form.Group>
                <Form.Control type="number" className="roomNumberInt" min="0" max="2" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="number" className="roomNumberInt" min="0" max="9" />
              </Form.Group>
              <Form.Group>
                <Form.Control type="number" className="roomNumberInt" min="0" max="9" />
              </Form.Group>
              <Button id="roomNumber-submit" onClick={() => submitGuess("room", getRoomNumber())}>Submit</Button>
            </Form>
          </Row>
        </Col>

        <br></br>

        <Col>
            <p className='subject-p'>What subject do they teach? <span className='count-p'>{subjectCounter}/5</span></p>
        </Col>

        <Col id="subjects-dropdown">
          <Form>
            <InputGroup className="mb-3">
              <DropdownButton
                variant="outline-secondary"
                id="dropdown-button"
              >
                <Dropdown.Item href="#" id="Guidance" onClick={() => changeInput("Guidance")}>Guidance</Dropdown.Item>
                <Dropdown.Item href="#" id="Math" onClick={() => changeInput("Math")}>Math</Dropdown.Item>
                <Dropdown.Item href="#" id="English" onClick={() => changeInput("English")}>English</Dropdown.Item>
                <Dropdown.Item href="#" id="History" onClick={() => changeInput("History")}>History</Dropdown.Item>
                <Dropdown.Item href="#" id="World Language" onClick={() => changeInput("World Language")}>World Language</Dropdown.Item>
                <Dropdown.Item href="#" id="Physics" onClick={() => changeInput("Physics")}>Physics</Dropdown.Item>
                <Dropdown.Item href="#" id="Chemistry" onClick={() => changeInput("Chemistry")}>Chemistry</Dropdown.Item>
                <Dropdown.Item href="#" id="Biology" onClick={() => changeInput("Biology")}>Physics</Dropdown.Item>
                <Dropdown.Item href="#" id="Academy Study" onClick={() => changeInput("Academy Study")}>Academy Study</Dropdown.Item>
                <Dropdown.Item href="#" id="PE" onClick={() => changeInput("PE")}>PE</Dropdown.Item>
              </DropdownButton>
              <Form.Control id="subject-box" disabled />

              <Button id="subject-submit" onClick={() => submitGuess("subject", document.getElementById("subject-box").value)}>Submit</Button>
            </InputGroup>
          </Form>
        </Col>

    </Container>
  )
}

export default Game
