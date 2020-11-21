import Enemy from "./EnemyClass.js"

export default class BatEnemy extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.pointValue = 10;

        this.moveSpeed = 75;
        this.moveDuration = 1500;
        this.currentMoveDuration = 0;

        //set true for left and right, false for up and down
        this.moveHorrizontal = true;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        if(this.currentMoveDuration < this.moveDuration){
            this.currentMoveDuration += deltaTime;
        }else{
            this.changeDirection();
        }
    }

    callbackFunction(){
        this.makeWeightless();
        this.anims.play("bat");
        this.setInitialMovement();
    }

    makeWeightless(){
        this.body.setAllowGravity(false);
    }

    changeDirection(){
        //left and right
        if(this.moveHorrizontal){
            if(this.flipX == false){
                this.flipX = true;
                this.setVelocityX(-this.moveSpeed);
                this.currentMoveDuration = 0;
            }else{
                this.flipX = false;
                this.setVelocityX(this.moveSpeed);
                this.currentMoveDuration = 0;
            }
        }
        //up and down
        else{
            if(this.flipX == false){
                this.flipX = true;
                this.setVelocityY(this.moveSpeed);
                this.currentMoveDuration = 0;
            }else{
                this.flipX = false;
                this.setVelocityY(-this.moveSpeed);
                this.currentMoveDuration = 0;
            }
        }
        
    }

    setInitialMovement(){
        if(this.moveHorrizontal){
            this.setVelocityX(this.moveSpeed);
        }else{
            this.setVelocityY(-this.moveSpeed);
        }
    }
}