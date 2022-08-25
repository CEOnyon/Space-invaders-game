import EnemyMovement from "./EnemyMovement.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

canvas.width = 600;
canvas.height = 600;

const background = new Image();
background.src = 'space-invaders-assets/images/space.png';

// instance
const playerBulletController = new BulletController(canvas, 10, "red", true);
const enemyBulletControl = new BulletController(canvas, 4, "purple", false);
const enemyMovement = new EnemyMovement(canvas, enemyBulletControl, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

function game(){
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    enemyMovement.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    enemyBulletControl.draw(ctx);
}

setInterval(game,1000/60);
