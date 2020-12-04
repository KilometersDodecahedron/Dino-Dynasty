import { sceneEvents, eventNames } from "../events/events.js"

export default class ColorChangerPickup extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.color = "green";
        //given in the child
        this.pngKey;
        this.scale = 0.5;
        this.radius = 16;

        sceneEvents.on(eventNames.playerRespawned, () => this.destroy(), this);
    }

    preDestroy(){
        sceneEvents.off(eventNames.playerRespawned, () => this.destroy(), this)
    }

    callbackFunction(){
        this.body.setAllowGravity(false);
        this.setScale(this.scale, this.scale);
        this.setCircle(this.radius);
        this.setTexture(this.pngKey);
    }

    collect(){
        sceneEvents.emit(eventNames.increaseScore, 2500)
        this.destroy();
    }
}