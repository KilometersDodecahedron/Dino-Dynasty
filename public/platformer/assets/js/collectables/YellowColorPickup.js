import ColorChangerPickup from "./ColorChangerPickup.js" 

export default class YellowPickup extends ColorChangerPickup{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.color = "yellow";
        //given in the child
        this.pngKey = "coin-yellow";
    }
}