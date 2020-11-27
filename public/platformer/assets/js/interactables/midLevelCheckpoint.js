import { sceneEvents, eventNames } from "../events/events.js"

export default class CheckPoint extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.hasBeenChecked = false;
    }

    setCheckpoint(player){
        this.hasBeenChecked = true;
        this.setTexture(`checkpoint-flag-${player.currentColor}`)
        sceneEvents.emit(eventNames.checkpointReached, player.currentColor, this);
        player.setRespawnPosition(this.x, this.y);
    }
}