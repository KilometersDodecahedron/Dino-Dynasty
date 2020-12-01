export default class FireBall extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.distance = 300;
        this.moveRight = true;
        this.duration = 350;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        this.duration -= deltaTime;

        if(this.duration < 0){
            this.destroy();
        }
    }

    callbackFunction(){
        this.setScale(0.8, 0.8);
        this.setCircle(9);
        this.body.setOffset(36, 6)

        //go in direction player is facing
        //also resize hitbox so collision is on the ball
        if(this.scene.player.flipX){
            this.distance = -this.distance;
            this.flipX = true;
            this.body.setOffset(11, 6)
        }

        this.setVelocity(this.distance, 0)
        this.anims.play("fire-ball", true)
        this.body.setAllowGravity(false)
        this.body.onCollide = true;
    }
}