export default class EnemyProjectile extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        if(this.x < 0 || this.x > this.scene.worldBoundsX || this.y > this.scene.worldBoundsY){
            this.destroyProjectile();
        }
    }

    callbackFunction(){
        
    }

    destroyProjectile(){ 
        this.destroy();
    }
}