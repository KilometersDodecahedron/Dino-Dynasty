import ColorChangerPickup from "./ColorChangerPickup.js" 

export default class RedPickup extends ColorChangerPickup{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.color = "red";
        //given in the child
        this.pngKey = "coin-red";
    }
}