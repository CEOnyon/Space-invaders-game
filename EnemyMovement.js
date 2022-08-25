import enemy from "./enemy.js";
import gameMovement from "./gameMovement.js";

export default class EnemyMovement {
    enemyMap = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [2, 2, 2, 3, 3, 3, 3, 2, 2, 2],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ];
      enemyRows = [];

      currentDirection = gameMovement.right;
      xVelocity = 0;
      yVelocity = 0;
      defaultXVelocity = 0;
      defaultYVelocity = 1;
      moveDownTimerDefault = 30;
      moveDownTimer = this.moveDownTimerDefault;
      bulletTimerDefault = 100;
      bulletTimer = this.bulletTimerDefault

    constructor(canvas, enemyBulletControl, playerBulletController) {
        this.canvas = canvas;
        this.enemyBulletControl = enemyBulletControl;
        this.playerBulletController = playerBulletController;


        this.createEnemies();
    }
    
    draw(ctx) {
        this.decMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawEnemies(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    collisionDetection() {

        this.enemyRows.forEach((enemyRow) => {
            enemyRow.forEach((enemy, enemyIndex) => {
                if(this.playerBulletController.collideWith(enemy)) {
                    // play a sound
                    enemyRow.splice(enemyIndex, 1);
                }
            });
        });

        this.enemyRows = this.enemyRows.filter((enemyRow) => enemyRow.length > 0);
    }

    fireBullet() {
        this.bulletTimer--;
        if (this.bulletTimer <= 0) {
            this.bulletTimer = this.bulletTimerDefault;
            const allEnemys = this.enemyRows.flat();
            const enemyIndex = Math.floor(Math.random() * allEnemys.length);
            const enemy = allEnemys[enemyIndex];
            this.enemyBulletControl.shoot(enemy.x, enemy.y, -3);
            // console.log(enemyIndex);
        }
    }

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this.moveDownTimerDefault;
        }
    }

    decMoveDownTimer() {
        if (this.currentDirection === gameMovement.downLeft ||
            this.currentDirection === gameMovement.downRight
        ) {
            this.moveDownTimer--;
        }
    }

    // gameMovement.right = 1
    // gameMovement.left = 0
    // gameMovement.downLeft = 2
    updateVelocityAndDirection(){
        for (const enemyRow of this.enemyRows) {

            if (this.currentDirection == gameMovement.right){
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostEnemy = enemyRow[enemyRow.length -1];
                if (rightMostEnemy.x + rightMostEnemy.width >= this.canvas.width) {
                    this.currentDirection = gameMovement.downLeft;
                    break;
                } 

            } else if (this.currentDirection === gameMovement.downLeft) {
                  if (this.moveDown(gameMovement.left)) {
                    break;
                  }
                
            } else if (this.currentDirection === gameMovement.left) {
                    this.xVelocity = -this.defaultXVelocity;
                    this.yVelocity = 0;
                    const leftMostEnemy = enemyRow[0];
                    if(leftMostEnemy.x <= 0) {
                        this.currentDirection = gameMovement.downRight;
                        break;
                    }
            } else if (this.currentDirection === gameMovement.downRight) {
                if(this.moveDown(gameMovement.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawEnemies(ctx) {
        this.enemyRows.flat().forEach((enemy) => {
            enemy.move(this.xVelocity, this.yVelocity);
            enemy.draw(ctx);
        })
    }

    createEnemies() {
        this.enemyMap.forEach((row, rowIndex) =>{
            this.enemyRows[rowIndex] = [];
            row.forEach((enemyNumber, enemyIndex) => {
                if(enemyNumber > 0) {
                    this.enemyRows[rowIndex].push(
                        new enemy(enemyIndex * 50, rowIndex * 35, enemyNumber)
                    );
                }
            })
        })
    }
}

