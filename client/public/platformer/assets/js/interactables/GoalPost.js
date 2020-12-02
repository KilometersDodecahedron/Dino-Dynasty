import { sceneEvents, eventNames } from "../events/events.js"

export default class GoalPost extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.hasBeenTouched = false;
    }

    callbackFunction(){
        this.anims.play("goal-post-inactive");
        this.body.setSize(20, 23).setOffset(5, 6);
    }

    touchGoalPost(){
        if(!this.hasBeenTouched){
            this.anims.play("goal-post-active");
            this.hasBeenTouched = true;
            sceneEvents.emit(eventNames.goalPostReached);
            this.scene.scene.start(this.scene.nextLevelKey)
        }
    }
}