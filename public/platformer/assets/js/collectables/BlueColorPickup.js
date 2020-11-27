import ColorChangerPickup from "./ColorChangerPickup.js" 

export default class BluePickup extends ColorChangerPickup{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.color = "blue";
        //given in the child
        this.pngKey = "coin-blue";
    }
}