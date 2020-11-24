export default class Block extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //in case we make stronger blocks
        this.health = 1;
    }

    takeDamage(){
        this.health--;
        if(this.health <= 0){
            this.breakBlock();
        }
    }

    breakBlock(){
        this.destroy();
    }

    callbackFunction(){
        this.body.immovable = true;
        this.body.setAllowGravity(false)
        this.body.onCollide = true;
    }
}