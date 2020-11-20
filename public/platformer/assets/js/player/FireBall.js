export default class FireBall extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.distance = 300;
        this.moveRight = true;
        this.duration = 350;
        this.particleEmitter;
    }

    preDestroy(){
        this.particleEmitter.remove();
        console.log("DEAD")
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        this.duration -= deltaTime;

        if(this.duration < 0){
            this.destroy();
        }
    }

    callbackFunction(){
        //go in direction player is facing
        if(this.scene.player.flipX){
            this.distance = -this.distance;
        }

        this.alpha = 0;
        this.setVelocity(this.distance, 0)
        this.setScale(0.08, 0.08);
        this.setCircle(64);
        this.body.setAllowGravity(false)
        this.body.onCollide = true;

        console.log(this.scene.genericParticles)
        this.particleEmitter = this.scene.genericParticles.createEmitter({
            speed: 0,
            scale: { start: 0.42, end: 0 },
            tint: [0xFF0000],
            lifespan: 50,
            quantity: 10,
            blendMode: 'ADD'
        });

        this.particleEmitter.startFollow(this)
    }
}