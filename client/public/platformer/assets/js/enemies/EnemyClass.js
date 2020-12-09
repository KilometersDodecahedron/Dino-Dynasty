import { sceneEvents, eventNames } from "../events/events.js"

export default class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.pointValue = 10;
        this.moveSpeed = 100;
        //most enemies die in 1 hit
        this.health = 1;
        this.onPlayerCollisionEffects = [];

        sceneEvents.on(eventNames.playerRespawned, () => this.destroy(), this)
        sceneEvents.on(eventNames.goalPostReached, this.deathByHazard, this)
    }

    preDestroy(){
        sceneEvents.off(eventNames.playerRespawned, () => this.destroy(), this)
        sceneEvents.off(eventNames.goalPostReached, this.deathByHazard, this)
    }

    deathByHazard(){
        this.destroy();
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
            sceneEvents.emit(eventNames.increaseScore, this.pointValue);
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