import Caveman from "./CavemanClass.js"

export default class MustacheEnemy extends Caveman{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.pointValue = 30;

        this.cowSkull;
        this.initialPositionOffsetX = 0;
        this.initialPositionOffsetY = 0;

        this.throwDistance1 = 200;
        this.throwDistance2 = 140;
        this.throwDistance3 = 75;

        this.throwHeight1 = -80;
        this.throwHeight2 = -140;
        this.throwHeight3 = -190;

        this.throwInterval = 2000;
        this.throwSetDelay = 2000;
        this.animationBeforeThrowingDuration = 750;
        this.currentThrowInterval = 0;
        this.longPause = false;

        //throw in groups of 3
        this.throwSet = 2;
        this.currentThrowSet = 0;

         //resize hitbox facing left
         this.trueSizeX = 12;
         this.trueSizeY = 25;
         this.trueOffsetX = 11;
         this.trueOffsetY = 7;
 
         //resize hitbox facing right
         this.falseSizeX = 12;
         this.falseSizeY = 25;
         this.falseOffsetX = 9;
         this.falseOffsetY = 7;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        if(!this.hasBeenSpotted){
            this.checkIfOnScreen();
        }else{
            this.manageThrowing(deltaTime)
        }
    }

    callbackFunction(){
        this.setCollideWorldBounds(true);
        this.flipX = true;
        this.resizeHitbox();
        this.anims.play("mustache-idle", true)
    }

    manageThrowing(deltaTime){
        this.currentThrowInterval += deltaTime;
        //not on the third throw
        if(!this.longPause){
            if(this.currentThrowInterval >= this.throwInterval - this.animationBeforeThrowingDuration){
                this.flipX = this.isPlayerToTheLeftOfEnemy();
                this.resizeHitbox();
                this.anims.play("mustache-walk", true)
            }

            if(this.currentThrowInterval >= this.throwInterval){
                this.currentThrowInterval = 0;
                this.throwWeapon();
            }
        }
        //on the third throw
        else{
            if(this.currentThrowInterval >= this.throwInterval + this.throwSetDelay - this.animationBeforeThrowingDuration){
                this.flipX = this.isPlayerToTheLeftOfEnemy();
                this.resizeHitbox();
                this.anims.play("mustache-walk", true)
            }

            if(this.currentThrowInterval >= this.throwInterval + this.throwSetDelay){
                this.currentThrowInterval = 0;
                this.throwWeapon();
            }
        }
    }

    throwWeapon(){
        this.anims.play("mustache-idle", true)

        let xVelocity = 0;
        let yVelocity = 0;

        if(this.currentThrowSet < this.throwSet){
            if(this.currentThrowSet == 0){
                xVelocity = this.throwDistance1;
                yVelocity = this.throwHeight1;
            }else{
                xVelocity = this.throwDistance2;
                yVelocity = this.throwHeight2;
            }
            this.currentThrowSet++;
            this.longPause = false;
        }else{
            xVelocity = this.throwDistance3;
            yVelocity = this.throwHeight3;

            this.currentThrowSet = 0;
            this.longPause = true;
        }

        let xOffset = this.initialPositionOffsetX
        if(this.flipX){
            xOffset = -xOffset;
        }

        let cowSkull = this.cowSkull.get(this.x + xOffset, this.y + this.initialPositionOffsetY, "cow-skull")
        cowSkull.setTrajectory(xVelocity, yVelocity, this.flipX);
    }
}