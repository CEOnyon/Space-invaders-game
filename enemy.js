export default class enemy {
    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 32;

        this.image = new Image()
        this.image.src = `space-invaders-assets/images/enemy${imageNumber}.png`;
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }
}