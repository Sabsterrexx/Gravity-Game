var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var player = {
  x: 500,
  y: canvas.height - 25,
  width: 25,
  height: 25
}
var maxy = player.y;
var miny = 0;

var r = {
  x: canvas.width - 50,
  y: Math.floor((Math.random() * 500) + 1),
  width: 150,
  height: 10
};

var r2 = {
  x: canvas.width - 50,
  y: Math.floor((Math.random() * 500) + 1),
  width: 150,
  height: 10
}

var r3 = {
  x: canvas.width - 50,
  y: Math.floor((Math.random() * 500) + 1),
  width: 150,
  height: 10
}

var r4 = {
  x: canvas.width - 50,
  y: Math.floor((Math.random() * 500) + 1),
  width: 150,
  height: 10
}

var gravity = 2;
var speed = 1;
var minSpeed = 5;
var maxSpeed = 30;

var movingUp = false;
var movingDown = false;

var frameRate = 50;

function rectangle(x, y, w, h, c) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = c;
  ctx.fill();
  ctx.closePath();
}

function goUp() {
  movingUp = true;
  movingDown = false;
  speed = maxSpeed;
  moveUp();
}

function goDown() {
  movingDown = true;
  movingUp = false;
  speed = 0;
  moveDown();
}

function moveUp() {

  if (!movingUp)
    return;

  if (speed - gravity > minSpeed) {
    speed -= gravity;
  }

  if (player.y - speed > miny) {
    player.y = player.y - speed;
    draw();
    setTimeout(moveUp, frameRate);
  }
  else {
    player.y = miny;
    draw();
  }

}

function moveDown() {
  

  if (!movingDown) {
    return;
  }
  if (speed + gravity < maxSpeed) {
    speed += gravity;
  }

  if (player.y + speed < maxy) {
    player.y = player.y + speed;
    draw();
    setTimeout(moveDown, frameRate);
  }
  else {
    player.y = maxy;
    draw();
  }

}

function init() {
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rectangle(player.x, player.y, player.height, player.width, "red");
  document.getElementById("announcement").innerHTML = "";
  rectangle(r.x, r.y, r.width, r.height, "blue");
  rectangle(r2.x, r2.y, r2.width, r2.height, "yellow");
  rectangle(r3.x, r3.y, r3.width, r3.height, "green");
  rectangle(r4.x, r4.y, r4.width, r4.height, "black");

  r.x -= 15;
  r2.x -= 25;
  r3.x -= 35;
  r4.x -= 45;

  if (r.x < 0) {
    r.x = canvas.width - 50;
    r.y = Math.floor((Math.random() * 500) + 1)
  }

  if (r2.x < 0) {
    r2.x = canvas.width - 50;
    r2.y = Math.floor((Math.random() * 500) + 1)
  }

  if (r3.x < 0) {
    r3.x = canvas.width - 50;
    r3.y = Math.floor((Math.random() * 500) + 1)
  }

  if (r4.x < 0) {
    r4.x = canvas.width - 50;
    r4.y = Math.floor((Math.random() * 500) + 1)
  }

  if (collision(r, player) || collision(r2, player) || collision(r3, player) || collision(r4, player)) {
    document.getElementById("announcement").innerHTML = "You died ! Press the button to play again.";
    r.x = canvas.width - 50;
    r2.x = canvas.width - 50;
    r3.x = canvas.width - 50;
    r4.x = canvas.width - 50;
    player.y = canvas.height - 25;
    movingUp = false;
    movingDown = false;
  }
  console.log("rx:", r.x, "ry:", r.y);
  console.log("rx2:", r2.x, "ry2:", r2.y);
  console.log("rx3:", r3.x, "ry3:", r3.y);
  console.log("rx4:", r4.x, "ry4:", r4.y);
}

function collision(rect1, rect2) {
  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y) {
    // collision detected!
    return true
  }
  else {
    return false
  }
}

setTimeout(draw, 10)