/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var key = {
      up: 38,
      down: 40,
      w: 87,
      s: 83,
  };

  var boardWidth = $('#board').width();
  var boardHeight = $('#board').height();
  var paddleSpeed = 0;
  var ballSpeedRate = 1.25;
  var endScore = 7

  // Game Item Objects
  var ball = {
    positionX: 190,
    positionY: 190,
    speedX: .5,
    speedY: .5,
    width: 20,
    height: 20,
    id: '#ball',
  }
  var paddle1 = {
    positionX: 30,
    positionY: 150,
    speedY: 0,
    width: 10,
    height: 85,
    id: '#paddle1',
  }
  var paddle2 = {
    positionX: 360,
    positionY: 150,
    speedY: 0,
    width: 10,
    height: 85,
    id: '#paddle2',
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    updateBall();
    updatePaddles();
    doCollide();
  }
  
  /* 
  Called in response to events.
  */
  function handleEvent(event) {
    
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function updateBall() {
    ball.positionX += ball.speedX;
    ball.positionY += ball.speedY
    $(ball.id).css("left", ball.positionX);
    $(ball.id).css("top", ball.positionY);
  }

  function handleKeyDown(event) {
    var keycode = event.which;
    if (keycode === key.w) {
      paddle1.speedY -= 1;
  } else if (keycode === key.s) {
      paddle1.speedY += 1;
  } else if (keycode === key.up) {
      paddle2.speedY -= 1;
  } else if (keycode === key.down) {
      paddle2.speedY += 1;
  }
}

  function handleKeyUp() {
    paddle1.speedY = 0;
    paddle2.speedY = 0;  
  }

  function updatePaddles() {
    paddle1.positionY += paddle1.speedY;
    paddle2.positionY += paddle2.speedY;
    $(paddle1.id).css("top", paddle1.positionY);
    $(paddle2.id).css("top", paddle2.positionY);
    $(paddle1.id).css("left", paddle1.positionX);
    $(paddle2.id).css("left", paddle2.positionX);
  }

  function doCollide() {
  
    ball.leftX = ball.positionX;
    ball.topY = ball.positionY;
    ball.rightX = ball.positionX + ball.width;
    ball.bottomY = ball.postionY + ball.height;
  
    paddle1.leftX = paddle1.positionX;
    paddle1.topY = paddle1.positionY;
    paddle1.rightX = paddle1.positionX + paddle1.width;
    paddle1.bottomY = paddle1.postionY + paddle1.height;

    paddle2.leftX = paddle2.positionX;
    paddle2.topY = paddle2.positionY;
    paddle2.rightX = paddle2.positionX + paddle2.width;
    paddle2.bottomY = paddle2.postionY + paddle2.height;
	
	if (ball.rightX < paddle1.leftX && ball.leftX < paddle1.rightX && ball.topY < paddle1.bottomY && ball.bottomY > paddle1.topY) {
      console.log('yes');
    } else if (ball.rightX > paddle2.leftX && ball.leftX > paddle2.rightX && ball.topY < paddle2.bottomY && ball.bottomY > paddle2.topY) {
      console.log('yes');
    } else {
      console.log('no');
    }
}

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
