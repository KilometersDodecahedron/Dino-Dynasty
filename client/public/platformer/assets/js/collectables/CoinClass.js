import { sceneEvents, eventNames } from "../events/events.js"

export default class CoinClass extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.value = 5;

        sceneEvents.on(eventNames.playerRespawned, () => this.destroy(), this);
    }

    preDestroy(){
        sceneEvents.off(eventNames.playerRespawned, () => this.destroy(), this)
    }

    setValueAndScale(value, pixelSize, offset, animationKey){
        this.body.setAllowGravity(false);
        this.value = value;
        this.setCircle(pixelSize);
        this.setOffset(offset, offset);
        this.anims.play(animationKey)
    }

    collect(){
        sceneEvents.emit(eventNames.coinCollected, this.value, this);
        this.destroy();
    }
}
