import Bullet from "./Bullet.js";

export default class BulletController {
    bullets = [];
    bulletTime = 0;

    constructor(canvas, maxBullets, bulletColor, sound) {
        this.canvas = canvas;
        this.maxBullets = maxBullets;
        this.bulletColor = bulletColor;
        this.sound = sound;
        
        this.shootSound = new Audio("space-invaders-assets/sounds/shoot.wav");
        this.shootSound.volume = 0.5;
    }

    draw(ctx) {
        this.bullets = this.bullets.filter((bullet) => bullet.y + bullet.width > 0 && bullet.y <= this.canvas.height);       
        this.bullets.forEach((bullet) => bullet.draw(ctx));
        if(this.bulletTime > 0) {
          this.bulletTime--; 
        }
    }

    collideWith(sprite) {
        const bulletThatHitSpriteIndex = this.bullets.findIndex((bullet) => {
            return bullet.collideWith(sprite)
        });
        
        if (bulletThatHitSpriteIndex >= 0) {
            this.bullets.splice(bulletThatHitSpriteIndex, 1)
            return true;
        }
        return false;
    }

    shoot(x, y, velocity, bulletTime = 0) {
        if(this.bulletTime <= 0 && this.bullets.length < this.maxBullets){
            const bullet = new Bullet(this.canvas, x, y, velocity, this.bulletColor)
            this.bullets.push(bullet);
            if (this.sound) {
                this.shootSound.currentTime = 0;
                this.shootSound.play();
            }
            this.bulletTime = bulletTime;
        }
    } 
}