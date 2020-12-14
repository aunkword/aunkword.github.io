/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  
  var fpsInterval = 100;
  var key = {
      'left': 37,
      'up': 38,
      'right': 39,
      'down': 40,
  }
  var score = 0;
  var bwidth = $('#board').width();
  var bheight = $('#board').height();
  var square = 20;
  
  // Game Item Objects
  
  var apple = {
    x: 40,
    y: 40,
    width: 20,
    height: 20,
    id: '#apple'
  }

  var head = {
    x: randomInteger(bwidth/square) * square,
    y: randomInteger(bheight/square) * square,
    speedX: 0,
    speedY: 0,
    width: 20,
    height: 20,
    id: '#head'
  }

  var snakeBody = [head];

  // one-time setup
  var interval = setInterval(newFrame, fpsInterval);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', keyDown);                  // change 'eventType' to the type of event you want to handle
  moveApple();

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function newFrame() {
    followHead();
    repoHead();
    bodyCollide();
    appleCollide();
    boardCollide();
  }

  function keyDown(event) {
    if (head.speedX === 0 && event.which === key.left) {
            head.speedX = -20;
            head.speedY = 0;
    } else if (head.speedY === 0 && event.which === key.up) {
            head.speedX = 0;
            head.speedY = -20;
    } else if (head.speedX === 0 && event.which === key.right) {
            head.speedX = 20;
            head.speedY = 0;
    } else if (head.speedY === 0 && event.which === key.down) {
            head.speedX = 0;
            head.speedY = 20;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repoHead() {
    head.x += head.speedX;
    head.y += head.speedY;
    $("#head").css("left", head.x);
    $("#head").css("top", head.y);
  }

  function moveApple(){
    apple.x = randomInteger(bwidth/square) * square;
    apple.y = randomInteger(bheight/square) * square;
    $('#apple').css('left', apple.x)
    $('#apple').css('top', apple.y)
      for (var i = 0; i < snakeBody.length; i++){
        if(doCollide(apple,snakeBody[i])){
            moveApple();
        }
      }
    }

  function body(id) {
    var body = {};
    body.id = id
    body.x = 1000;
    body.y = 1000;
    body.width = $('.body').width();
    body.height = $('.body').width();
    return body;
  }

  function addNewBody(){
    var newID = 'body' + snakeBody.length;
    var newBody = body('#' + newID);
    snakeBody.push(newBody);
    $('<div>').addClass('snake').attr('id', newID).appendTo('#board')
                                .css('left', head.x).css('top', head.y);
}

  function boardCollide() {
    head.left = head.x;
    head.right = head.x + 20;
    head.top = head.y;
    head.bottom = head.y + 20;

    if (head.left < 0 || head.right > bwidth || head.top < 0 || head.bottom > bheight){
        endGame();
    }
  }

  function appleCollide() {
    head.left = head.x;
    head.right = head.x + 20;
    head.top = head.y;
    head.bottom = head.y + 20;

    apple.left = apple.x;
    apple.right = apple.x + 20;
    apple.top = apple.y;
    apple.bottom = apple.y + 20;

    if (head.left < apple.right && head.right > apple.left && head.top < apple.bottom && head.bottom > apple.top){
        score++;
        $('#score').text(score);
        moveApple();
        addNewBody();
    }
  }

  function bodyCollide() {
    for (var i = 1; i < snakeBody.length; i++) {
        if(doCollide(head, snakeBody[i]) === true) {
            endGame();
        }
  }
}

  function doCollide(obj1, obj2) {
    if (obj1.x === obj2.x && obj1.y === obj2.y) {
        return true;
    }
    else {
        return false;
    }
}

  function followHead(){
    for (var i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i].x = snakeBody[i-1].x;
        snakeBody[i].y = snakeBody[i-1].y;
        $(snakeBody[i].id).css("left", snakeBody[i].x);
        $(snakeBody[i].id).css("top", snakeBody[i].y);
    }
  }

  function randomInteger(max) {
    var randomInt = Math.floor(Math.random() * max);
    return randomInt;
}


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
