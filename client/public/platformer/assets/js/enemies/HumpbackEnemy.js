import Caveman from "./CavemanClass.js"

export default class HumpbackEnemy extends Caveman{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.pointValue = 1000;

        this.shortJump = -150;
        this.highJump = -220;

        this.jumpPattern = 2;
        this.currentJumpPattern = 0;

        this.jumpInterval = 1250;
        this.currentJumpUnterval = 0;
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        if(this.body.blocked.down || this.body.touching.down){
            this.anims.play("humpback-idle", true)
            this.currentJumpUnterval += deltaTime;

            if(this.currentJumpUnterval >= this.jumpInterval){
                this.jump();
            }
        }else{
            this.anims.play("humpback-walk", true)
        }
    }

    jump(){
        if(this.levelOver){
            return;
        }

        this.currentJumpUnterval = 0;
        this.anims.play("humpback-walk", true)

        if(this.currentJumpPattern < this.jumpPattern){
            this.currentJumpPattern++;
            this.setVelocityY(this.shortJump)
        }else{
            this.currentJumpPattern = 0;
            this.setVelocityY(this.highJump)
        }
    }
}