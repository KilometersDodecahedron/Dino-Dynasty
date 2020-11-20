export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.moveSpeed = 100;
        //most enemies die in 1 hit
        this.health = 1;
        this.onPlayerCollisionEffects = [];
    }

    callbackFunction(){
        //put what you need for different enemies in here
    }

    collidedWithEnemyFunction(){
        //put any extra stuff to do when the enemy collides wth the player
    }

    takeDamageJump(){
        this.health-= 2;

        if(this.health <= 0){
            this.destroy();
        }
    }

    isPlayerToTheLeftOfEnemy(){
        if(this.scene.player.x < this.x){
            return true;
        }else{
            return false;
        }
    }

    takeFireballDamage(){
        this.health--;

        if(this.health <= 0){
            this.destroy();
        }
    }
}