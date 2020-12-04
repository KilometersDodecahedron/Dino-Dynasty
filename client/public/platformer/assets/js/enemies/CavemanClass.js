import Enemy from "./EnemyClass.js"
import { sceneEvents, eventNames } from "../events/events.js"

export default class Caveman extends Enemy{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.health = 2;
        this.levelOver = false;

        //resize hitbox facing left
        this.trueSizeX = 19;
        this.trueSizeY = 28
        this.trueOffsetX = 5;
        this.trueOffsetY = 5;

        //resize hitbox facing right
        this.falseSizeX = 19;
        this.falseSizeY = 28
        this.falseOffsetX = 5;
        this.falseOffsetY = 5;

        //set true when the player sees it, then it starts moving
        this.hasBeenSpotted = false;
        
        sceneEvents.on(eventNames.goalPostReached, () => this.levelOver = true, this)
    }

    preDestroy(){
        sceneEvents.off(eventNames.goalPostReached, () => this.levelOver = true, this)
    }

    callbackFunction(){
        this.setCollideWorldBounds(true);
        this.flipX = true;
        this.resizeHitbox();
    }

    resizeHitbox(){
        if(this.flipX){
            this.body.setSize(this.trueSizeX, this.trueSizeY)
                .setOffset(this.trueOffsetX, this.trueOffsetY);
        }else{
            this.body.setSize(this.falseSizeX, this.falseSizeY)
                .setOffset(this.falseOffsetX, this.falseOffsetY);
        }
    }

    checkIfOnScreen(){
        if(this.scene.cameras.main.worldView.contains(this.x, this.y)){
            this.hasBeenSpotted = true;
        }
    }
}