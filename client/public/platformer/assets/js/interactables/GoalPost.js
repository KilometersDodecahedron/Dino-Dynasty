import { sceneEvents, eventNames } from "../events/events.js"

export default class GoalPost extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.hasBeenTouched = false;
        //milliseconds to wait before loading next scene
        this.timeUntilNextScene = 3000;
        this.timerEvent = Phaser.Time.TimerEvent;
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
            sceneEvents.emit(eventNames.stopTimer);

            this.timerEvent = this.scene.time.addEvent({
                delay: this.timeUntilNextScene,
                callback: () => {
                    this.scene.scene.start(this.scene.nextLevelKey);
                }
            })
        }
    }
}