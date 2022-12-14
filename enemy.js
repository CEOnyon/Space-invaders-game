export default class enemy {
    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 44;
        this.height = 32;

        this.image = new Image()
        this.image.src = `space-invaders-assets/images/enemy${imageNumber}.png`;
    }

// this sets the images on the screen/canvas
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

// this method sets the enemys in motion
    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }

    collideWith(sprite) {
        if (this.x + this.width > sprite.x && 
            this.x < sprite.x + sprite.width && 
            this.y + this.height > sprite.y && 
            this.y < sprite.y + sprite.height
        ) {
            return true;
          }
          return false;
      }
}