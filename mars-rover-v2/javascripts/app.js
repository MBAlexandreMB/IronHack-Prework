// Rover Object Goes Here
// ======================
var rover = {
  name: "R1",
  direction: "N",
  x: 0,
  y: 0,
  travelLog: []
};

var rover2 = {
  name: "R2",
  direction: "N",
  x: 9,
  y: 9,
  travelLog: []
};

var rover3 = {
  name: "R3",
  direction: "N",
  x: 5,
  y: 5,
  travelLog: []
};

var grid = [
  ["R1","N","O","N","N","N","N","N","N","N"],
  ["O","N","N","N","N","N","N","N","N","N"],
  ["N","N","N","N","N","N","N","N","N","N"],
  ["N","N","N","O","N","N","N","N","N","N"],
  ["N","N","N","N","N","N","N","N","N","N"],
  ["N","N","N","N","N","R3","N","N","N","N"],
  ["N","N","N","N","N","N","O","N","N","N"],
  ["N","N","N","N","N","N","N","N","N","N"],
  ["N","O","N","N","N","N","N","N","N","N"],
  ["N","N","N","N","N","N","N","N","N","R2"],
]
// ======================

function setDirection(rover, nextDirection) {
  switch(rover.name) {
    case "R1":
      rover.direction = nextDirection;
      break;
    case "R2":
      rover2.direction = nextDirection;
      break;
    case "R3":
      rover3.direction = nextDirection;
      break;
  }
}

function turnLeft(rover){
  switch(rover.direction) {
    case "N":
      return "W";
    case "W":
      return "S";    
    case "S":
      return "E"; 
    case "E":
     return "N";
  }
}

function turnRight(rover){
  switch(rover.direction) {
    case "N":
      return "E";
    case "E":
      return "S";    
    case "S":
      return "W"; 
    case "W":
      return "N";
  }
}

function setNextStep(rover, command) {
  if (command == "f") {
    switch(rover.direction) {
      case "N":
        if (rover.y - 1 >= 0){ nextx = rover.x; nexty = rover.y - 1; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
      case "S":
        if (rover.y + 1 <= 9){ nextx = rover.x; nexty = rover.y + 1; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
      case "W":
        if (rover.x - 1 >= 0){ nextx = rover.x - 1; nexty = rover.y; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
      case "E":
        if (rover.x + 1 <= 9){ nextx = rover.x + 1; nexty = rover.y; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
    }
  } else if (command == "b") {
    switch(rover.direction) {
      case "S":
        if (rover.y - 1 >= 0){ nextx = rover.x; nexty = rover.y - 1; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
      case "N":
        if (rover.y + 1 <= 9){ nextx = rover.x; nexty = rover.y + 1; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
      case "E":
        if (rover.x - 1 >= 0){ nextx = rover.x - 1; nexty = rover.y; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
      case "W":
        if (rover.x + 1 <= 9){ nextx = rover.x + 1; nexty = rover.y; return true }
        else { console.log(rover.name + " has hit a wall!"); return false }
    }
  }
}

function checkNextStep(rover) {
  if (grid[nextx][nexty] == "N") { return true }
  else {
    console.log(rover.name + " found an obstacle an will not move to [" + nextx + "][" + nexty + "]");
    return false;
  }
}

function saveTravelLog(rover){
  switch(rover.name) {
    case "R1":
      rover.travelLog[rover.travelLog.length] = "[" + rover.x + "][" + rover.y + "]";
      break;
    case "R2":
      rover2.travelLog[rover2.travelLog.length] = "[" + rover2.x + "][" + rover2.y + "]";
      break;
    case "R3":
      rover3.travelLog[rover3.travelLog.length] = "[" + rover3.x + "][" + rover3.y + "]";
      break;
  }  
}

function move(currentRover, command){
  if (setNextStep(currentRover, command) === true){
    if (checkNextStep(currentRover) === true) {
      saveTravelLog(currentRover);
      switch(currentRover.name) {
        case "R1":
          grid[rover.x][rover.y] = "N";
          grid[nextx][nexty] = "R1";
          rover.x = nextx;
          rover.y = nexty;
          console.log(rover.name + "[" + rover.x + "][" + rover.y + "]");
          break;
        case "R2":
          grid[rover2.x][rover2.y] = "N";
          grid[nextx][nexty] = "R2";
          rover2.x = nextx;
          rover2.y = nexty;
          console.log(rover2.name + "[" + rover2.x + "][" + rover2.y + "]");
          break;
        case "R3":
          grid[rover3.x][rover3.y] = "N";
          grid[nextx][nexty] = "R3";
          rover3.x = nextx;
          rover3.y = nexty;
          console.log(rover3.name + "[" + rover3.x + "][" + rover3.y + "]");
          break;
      }
    }
  }
}

function commandRover(rover, command) {
  console.log("The command line for " + rover.name + " was: " + command);
  switch(command) {
    case "f":
    case "b":
      move(rover, command);          
      break;
    case "l":
      setDirection(rover, turnLeft(rover));
      break;
    case "r":
      setDirection(rover, turnRight(rover));
      break;
  }
}

function controlRover1(command) {
    for(x = 0; x < command.length; x++) {
      commandRover(rover, command[x]);
      moveOtherRovers();
    }
    printPositionAndLog(rover);
}

function printPositionAndLog(rover){
  if (rover.name != "") {
    console.log(rover.name + "'s current position:[" + rover.x + "][" + rover.y + "]");
    console.log(rover.name + "'s travel log: ");
    rover.travelLog[rover.travelLog.length] = "[" + rover.x + "][" + rover.y + "]";
    rover.travelLog.forEach(function(log) {
      console.log(log);
    });
  }
}

function updateHTMLGrid(){
  if (rover.travelLog[0] != null) {
    document.getElementById(rover.travelLog[0]).innerHTML = "";
    document.getElementById(rover.travelLog[rover.travelLog.length-1]).innerHTML = "R1";
  }
  if (rover2.travelLog[0] != null) {
    document.getElementById(rover2.travelLog[0]).innerHTML = "";
    document.getElementById(rover2.travelLog[rover2.travelLog.length-1]).innerHTML = "R2";
  }
  if (rover3.travelLog[0] != null) {
    document.getElementById(rover3.travelLog[0]).innerHTML = "";
    document.getElementById(rover3.travelLog[rover3.travelLog.length-1]).innerHTML = "R3";
  } 
}

function loadGrid() {
  for (i = 0; i < 10; i++) {
    for(j = 0; j < 10; j++) {
      if (grid[i][j] != "N") { 
        document.getElementById("[" + i + "][" + j + "]").innerHTML = grid[i][j];
      }
    }
  }
}

function rndCommand() {
  var rndcommand = Math.floor(Math.random() * 4);
  switch(rndcommand){
    case 0:
      return "f";
    case 1:
      return "b";
    case 2:
      return "r";
    case 3:
      return "l";
  }
}

function moveOtherRovers(){
  commandRover(rover2, rndCommand());   
  commandRover(rover3, rndCommand());
}

function promptCommand(){
  var com = window.prompt("Digite seu comando aqui: ", "");
  controlRover1(com);
  printPositionAndLog(rover2);
  printPositionAndLog(rover3);
  updateHTMLGrid();
}

loadGrid();
promptCommand();