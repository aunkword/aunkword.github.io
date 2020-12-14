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

  var bwidth = $('#board').width();
  var bheight = $('#board').height();
  var score1 = 0;
  var score2 = 0;
  var endScore = 7;

  // Game Item Objects
  var ball = {
    x: 190,
    y: 190,
    spX: .8,
    spY: .8,
    w: 10,
    h: 10,
    id: '#ball',
  }
  var paddle1 = {
    x: 30,
    y: 150,
    spY: 0,
    w: 10,
    h: 85,
    id: '#paddle1',
  }
  var paddle2 = {
    x: 360,
    y: 150,
    spY: 0,
    w: 10,
    h: 85,
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
    boardCollide();
    wallBounce();
    score();
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
    ball.x += ball.spX;
    ball.y += ball.spY;
    $(ball.id).css("left", ball.x);
    $(ball.id).css("top", ball.y);
}

  function handleKeyDown(event) {
    var keycode = event.which;
    if (keycode === key.w) {
      paddle1.spY -= 1;
  } else if (keycode === key.s) {
      paddle1.spY += 1;
  } else if (keycode === key.up) {
      paddle2.spY -= 1;
  } else if (keycode === key.down) {
      paddle2.spY += 1;
  }
}

  function handleKeyUp() {
    paddle1.spY = 0;
    paddle2.spY = 0;  
}

  function updatePaddles() {
    paddle1.y += paddle1.spY;
    paddle2.y += paddle2.spY;
    $(paddle1.id).css("top", paddle1.y);
    $(paddle2.id).css("top", paddle2.y);
    $(paddle1.id).css("left", paddle1.x);
    $(paddle2.id).css("left", paddle2.x);
}

  function boardCollide() {
    ball.left = ball.x;
    ball.right = ball.x + ball.w;
    ball.top = ball.y;
    ball.bottom = ball.y + ball.h;

    if (ball.left < 0 || ball.right > bwidth){
        ball.x = 190;
        ball.y = 190;
    }
    boardPaddleCollide();
}

  function boardPaddleCollide() {
    paddle1.top = paddle1.y;
    paddle1.bottom = paddle1.y + paddle1.h;
    paddle2.top = paddle2.y;
    paddle2.bottom = paddle2.y + paddle2.h;

    if (paddle1.top <= 0) {
        paddle1.y = 0;
    } else if (paddle1.bottom >= bheight) {
        paddle1.y = bheight - 85;
    }
    if (paddle2.top <= 0) {
        paddle2.y = 0;
    } else if (paddle2.bottom >= bheight) {
        paddle2.y = bheight - 85;
    }
}

  function doCollide() {
  
    ball.left = ball.x;
    ball.right = ball.x + ball.w;
    ball.top = ball.y;
    ball.bottom = ball.y + ball.h;
  
    paddle1.left = paddle1.x;
    paddle1.right = paddle1.x + paddle1.w;
    paddle1.top = paddle1.y;
    paddle1.bottom = paddle1.y + paddle1.h;

    paddle2.left = paddle2.x;
    paddle2.right = paddle2.x + paddle2.w;
    paddle2.top = paddle2.y;
    paddle2.bottom = paddle2.y + paddle2.h;
    
	if (ball.left <= paddle1.right && ball.right >= paddle1.left && ball.top <= paddle1.bottom && ball.bottom >= paddle1.top) {
        bounceBack();
    }
    if (ball.right >= paddle2.left && ball.left <= paddle2.right && ball.top <= paddle2.bottom && ball.bottom >= paddle2.top) {
        bounceBack();
    }
}

  function bounceBack() {
    ball.spX -= ball.spX * 2 * 1.05;
}

  function wallBounce() {
    if (ball.top <= 0 || ball.bottom >= bheight) {
        ball.spY -= ball.spY * 2;
    }
  }

  function score () {
    if (ball.left <= 0) {
        score1 += 1;
        $('#score1').text(score1);
	} else if (ball.right >= bwidth) {
        score2 += 1;
        $('#score2').text(score2);
    }

    if (score1 === endScore) {
        endGame();

    } else if (score2 === endScore) {
        endGame();
    }
}

    function endGame() {
        // stop the interval timer
        clearInterval(interval);

        // turn off event handlers
        $(document).off();
    }
}
