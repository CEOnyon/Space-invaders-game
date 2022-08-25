export default class Player {
    rightPress = false;
    leftPress = false;
    shootPress = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2;
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "space-invaders-assets/images/player.png";

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx) {
        if (this.shootPress){
            this.bulletController.shoot(this.x+this.width/2, this.y, 4, 10) 
        }
        this.move();
        this.hitWalls();
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    } 

    hitWalls() {
        // left
        if (this.x < 0) {
            this.x = 0;
        }
        // right
        if (this.x > this.canvas.width -this.width) {
            this.x = this.canvas.width -this.width;
        }
    };

    move() {
        if (this.rightPress) {
            this.x += this.velocity
        }   else if(this.leftPress) {
            this.x += -this.velocity;
        }
    };

    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPress = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPress = true;
        }
        if (event.code == "Space") {
            this.shootPress = true;
        }
    };

    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPress = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPress = false;
        }
        if (event.code == "Space") {
            this.shootPress = false;
        }
    };
}