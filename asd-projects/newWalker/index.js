/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAMES_PER_SECOND_INTERVAL = 1000 / 60;
  var key = {
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
  }
  var positionX = 0;
  var positionY = 0;
  var speedX = 0;
  var speedY = 0;

  var bwidth = $('#board').width();
  var bheight = $('#board').height();

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameObject();
    redrawGameItem();
    blockBox();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === key.left) {
        speedX -= 5;
        console.log('left pressed');
  } else if (event.which === key.up) {
        speedY -= 5;
        console.log('up pressed');
  } else if (event.which === key.right) {
        speedX += 5;
        console.log('right pressed');
  } else if (event.which === key.down) {
        speedY += 5;
        console.log('down pressed');
  }
  }

  function handleKeyUp() {
        speedX = 0;
        speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameObject() {
      positionX += speedX;
      positionY += speedY;
  }

  function redrawGameItem () {
      $("#gameItem").css("left", positionX);
      $("#gameItem").css("top", positionY);
  }
  
  function blockBox() {
    if (positionX > bwidth - 50) {
		speedX -= speedX;
	}else if (positionX < 0) {
		speedX += speedX;
    }
    if (positionY > bheight - 50) {
		speedY -= speedY;
	}else if (positionY < 0) {
		speedY += speedY;
	}
    }
}
