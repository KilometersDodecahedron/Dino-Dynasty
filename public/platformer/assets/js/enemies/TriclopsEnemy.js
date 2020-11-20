import Caveman from "./CavemanClass.js"

export default class TriclopsEnemy extends Caveman{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.health = 1;
        this.moveSpeed = 130;

        //resize hitbox facing left
        this.trueSizeX = 14;
        this.trueSizeY = 26;
        this.trueOffsetX = 9;
        this.trueOffsetY = 5;

        //resize hitbox facing right
        this.falseSizeX = 14;
        this.falseSizeY = 26;
        this.falseOffsetX = 9;
        this.falseOffsetY = 5;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        this.runAroundAndBounceOffWalls();
    }

    callbackFunction(){
        this.setCollideWorldBounds(true);
        this.flipX = true;
        this.anims.play("triclops-walk", true)
        this.resizeHitbox();
    }

    runAroundAndBounceOffWalls(){
        if(this.flipX){
            this.setVelocityX(-this.moveSpeed);
        }else{
            this.setVelocityX(this.moveSpeed);
        }

        if(this.body.blocked.right){
            this.flipX = true;
            this.resizeHitbox();
        }else if(this.body.blocked.left){
            this.flipX = false;
            this.resizeHitbox();
        }
    }

    collidedWithEnemyFunction(player){
        if(!player.isInvulnerable){
            if(player.x > this.x && !this.flipX){
                this.flipX = true;
                this.resizeHitbox();
            }else if(player.x < this.x && this.flipX){
                this.flipX = false;
                this.resizeHitbox();
            }
        }
    }
}