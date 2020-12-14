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
    x: 0,
    y: 0,
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

  var snakeBody = [];

  // one-time setup
  var interval = setInterval(newFrame, fpsInterval);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', keyDown);                           // change 'eventType' to the type of event you want to handle

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function newFrame() {
    repoHead();
    appleCollide();
    boardCollide();
  }

  function keyDown(event) {
        if (event.which === key.left) {
            head.speedX = -20;
            head.speedY = 0;
    } else if (event.which === key.up) {
            head.speedX = 0;
            head.speedY = -20;
    } else if (event.which === key.right) {
            head.speedX = 20;
            head.speedY = 0;
    } else if (event.which === key.down) {
            head.speedX = 0;
            head.speedY = 20;
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
    body.x = 100;
    body.y = 100;
    body.width = $('.body').width();
    body.height = $('.body').width();
    return body;
  }

  function addNewBody(){
    var newID = 'body' + snakeBody.length;
    $('<div>').addClass('snake').attr('id', newID).appendTo('#board');
    var newBody = body('#' + newID);
  }

  function boardCollide() {
    head.left = head.x;
    head.right = head.x + 20;
    head.top = head.y;
    head.bottom = head.y + 20;

    if (head.left < 0 || head.right > bwidth || head.top < 0 || head.bottom > bheight){
        endGame();
        var again = prompt('Play again?');
        if (again === 'yes'){
        runProgram();
      }
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
        moveApple();
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

// https://jsbin.com/fegigoderu/edit?js,output