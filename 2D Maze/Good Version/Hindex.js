/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const canvas = document.getElementById('2DMaze');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(300, canvas.height / 2 + 100, 30, 90, ctx);
const floorHeight = player.y + player.H;
// const block = new Block(canvas.width, floorHeight - 80, 40, 80, 50, ctx);

const blockArray = [];
const blockArrayI = 0;
blockArray[0] = new Block(canvas.width, floorHeight - 80, 40, 80, 50, ctx, blockArray, addBlock);
addBlock();
let playerInput = false;
let jumping = false;
const jumpPower = 20;
const jumpDuration = 10;
let jumpCounter = 0;
const gravity = 4;
let jumpingMultiplier = 1;
const falling = false;
const isJumping = false;
console.log(floorHeight);
// addBlock();
setInterval(gameLoop, 33);
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgb(0,0,200)';
  ctx.fillRect(0, floorHeight, canvas.width, 10);
  /*
   */
  for (let x = 0; x < blockArray.length; x++) {
    if (!blockArray[x].update()) {
      addBlock();
      blockArray.shift();
    }
    blockArray[x].draw();
    if (
      player.x + player.W >= blockArray[x].x
      && player.x <= blockArray[x].x + blockArray[x].w
      && player.y + player.H >= blockArray[x].y
    ) {
      console.log('collision');
    }
  }

  /*
   */
  if (jumping) {
    /*
     */
    jumpCounter++;
    // console.log(jumpCounter + " jumpCounter");
    if (jumpCounter >= jumpDuration) {
      // console.log("jumping is false;");
      // console.log(jumping);
      if (player.y + player.H <= floorHeight - gravity) {
        // console.log("gravity");
        player.y += gravity;
      } else {
        jumping = false;
      }
    } else {
      player.y -= jumpPower * jumpingMultiplier;
      jumpingMultiplier *= 0.9;
    }
  }
  /*
   */
  player.draw();
}

function addBlock() {
  console.log(blockArray);
  blockArray.push(new Block(canvas.width, floorHeight - 80, 40, 80, 20, blockArray, ctx));
}

document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      if (!jumping) {
        // console.log("can jump");
        jumping = true;
        jumpCounter = 0;
        jumpingMultiplier = 1;
      } else {
        console.log('not alloud to jump');
      }
      break;
    default:
  }
});
document.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyW':
    case 'ArrowUp':
      playerInput = false;
      break;
    default:
  }
});
