export default class Bullet {
    constructor(canvas, x, y, velocity, bulletColor) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.bulletColor = bulletColor;
    
    // size of bullets
        this.width = 5;
        this.height = 20;
    }
    
    draw(ctx) {
        this.y -= this.velocity;
        ctx.fillStyle = this.bulletColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection used Axis-Aligned Bounding Box for reference
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