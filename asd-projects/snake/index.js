/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  
  var fpsInterval = 100 / 60;
  var key = {
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
  }
  var score = 0;
  var bwidth = $('#board').width();
  var bheight = $('#board').height();
  var square = $("#apple").width();
  
  // Game Item Objects
  
  var apple = {
    x: 320,
    y: 210,
    width: 20,
    height: 20,
    id: '#apple'
  }

  var head = {
    x: 100,
    y: 210,
    speedX: 0,
    speedY: 0,
    width: 20,
    height: 20,
    id: '#head'
  }

  var snakeBody = [];

  // one-time setup
  var interval = setInterval(newFrame, fpsInterval);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', keyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function newFrame() {
    borders();
    repoHead();
  }

  function keyDown(event) {
    if (event.which === key.left) {
        head.speedX = -1;
        head.speedY = 0;
  } else if (event.which === key.up) {
        head.speedX = 0;
        head.speedY = -1;
  } else if (event.which === key.right) {
        head.speedX = 1;
        head.speedY = 0;
  } else if (event.which === key.down) {
        head.speedX = 0;
        head.speedY = 1;
  }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repoHead() {
      $("#head").css("left", head.x);
      $("#head").css("top", head.y);
      head.x += head.speedX;
      head.y += head.speedY;
  }

  function borders() {
    head.left = head.x;
    head.right = head.x + 20;
    head.top = head.y;
    head.bottom = head.y + 20;

    if (head.left === 0 || head.right === bwidth || head.top === 0 || head.bottom === bheight){
        endGame();
        var again = prompt('Play again?');
        if(again = 'yes'){
           runProgram();
        }
    } else {}
  }

  function buildBody() {
      var body = {};
      // give it a class using jQuery (you will need to make CSS for the class in the CSS file)
      // give it a unique id (technically optional, but it's helpful)
      // return the object
      // give it an x and y position
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
