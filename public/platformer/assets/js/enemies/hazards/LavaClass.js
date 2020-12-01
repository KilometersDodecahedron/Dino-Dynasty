import IndestructibleHazard from "./IndestructibleHazardClass.js"

export default class LavaClass extends IndestructibleHazard{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
    }

    callbackFunction(){
        this.anims.play("lava");
        //this.body.setSize(16, 16)
        this.setScale(0.5, 0.5)
    }
}