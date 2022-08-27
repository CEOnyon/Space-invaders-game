import EnemyMovement from "./EnemyMovement.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

// Refresh the page
document.querySelector(".glow-on-hover").onclick = function(){
    window.location.reload()
}

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.width = 700;
canvas.height = 700;

const background = new Image();
background.src = 'space-invaders-assets/images/space.png';

// instances
const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletControl = new BulletController(canvas, 4, "blue", false);
const enemyMovement = new EnemyMovement(canvas, enemyBulletControl, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

let gameOver = false;
let wonGame = false;

function game(){
    checkGameOver()
    // sets the space backgroung to fit the canvas size
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    displayGameOver();
    if (!gameOver) {
    enemyMovement.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletControl.draw(ctx);
    console.log(gameOver)
    }
}

function displayGameOver() {
    if (gameOver) {
    let text = wonGame ? "You Win" : "Game Over";
    let textOffset = wonGame ? 3.5 : 5;

    ctx.fillStyle = "Green";
    ctx.font = "70px Arial";
    ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver(){
    if(gameOver) {
        return;
    }

    if (enemyBulletControl.collideWith(player)) {
        gameOver = true;
    }

    if(enemyMovement.collideWith(player)) {
        gameOver = true;
    }

    if(enemyMovement.enemyRows.length === 0) {
       wonGame = true;
       gameOver = true; 
    }
}
// Calling game loop 60 times every 1 second
setInterval(game,1000/60);

 