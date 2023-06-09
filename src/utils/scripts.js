import json from "../assets/teacherValues.json"

export function getTeacherNames() {
    var names = []; 
    json.forEach(teacher => {
        var x = teacher.name.toLowerCase().split(" ")
        names.push(x[1])
    })
    return names
}

export function getTodaysTeacher() { 
    var today = new Date(); 
    var value  = (1 + today.getMonth()) * 100 + today.getDate()
    var x = {}; 
    json.forEach( (teacher) => {
        if (teacher.id === value){
            x = teacher;
        }
    })
    
    return x;
}

export function getDayNumber(){ 
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(2023, 4, 22);
    const secondDate = new Date();

    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

export function getTodaysDate() {
    var today = new Date(); 
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear(); 
}


export function saveToCookie(guess, doc) {
   

    switch(guess) {
        case "room": 
            doc.roomCounter++; 
            break;  
        case "subject": 
            doc.subjectCounter++; 
            break;
        case "teacher": 
            doc.teacherCounter++; 
            break; 
        default: 
            break; 
    }
    console.log(JSON.stringify(doc))
    document.cookie = "wordleStorage;value=" + JSON.stringify(doc); 

}