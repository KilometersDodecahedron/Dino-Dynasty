import { sceneEvents, eventNames } from "../events/events.js"

export default class GameUI extends Phaser.Scene {
    constructor(){
        super("game-ui");

        this.currentPlayerColor = "green";

        this.playerIcon;
        this.lifeCounter;
        this.lives = 3;

        this.scoreText;
        this.scoreNumber;
    }

    create(){
        this.playerIcon = this.add.image(20, 20, "dino-green-ui")
        this.lifeCounter = this.add.text(35, 12, `x${this.lives}`)

        sceneEvents.on(eventNames.colorChanged, this.handleColorChanged, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.colorChanged, this.handleColorChanged, this);
        })
    }

    handleColorChanged(color){
        this.playerIcon.setTexture(`dino-${color}-ui`)
        console.log(color)
    }
}