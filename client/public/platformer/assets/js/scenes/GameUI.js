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

        this.coinIcon;
        this.coinCountDisplay;
        this.coinCount = 0;

        //icon in top right that shows if you hit a checkpoint
        this.checkpointDisplay;
    }

    create(){
        this.playerIcon = this.add.image(20, 542, "dino-green-ui")
        this.lifeCounter = this.add.text(35, 534, `x${this.lives}`)

        this.coinIcon = this.add.image(20, 20, "coin-one")
        this.coinCountDisplay = this.add.text(35, 12, `${this.coinCount}`)

        this.checkpointDisplay = this.add.image(780, 20, `checkpoint-flag-white`).setScale(1.8, 1.8)

        sceneEvents.on(eventNames.colorChanged, this.handleColorChanged, this);
        sceneEvents.on(eventNames.checkpointReached, this.handleGotCheckpoint, this)
        sceneEvents.on(eventNames.coinCollected, this.handleCollectedCoin, this)
        sceneEvents.on(eventNames.needStartingColor, this.handleGivePLayerColor, this)

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.colorChanged, this.handleColorChanged, this);
            sceneEvents.off(eventNames.checkpointReached, this.handleGotCheckpoint, this);
            sceneEvents.off(eventNames.coinCollected, this.handleCollectedCoin, this);
            sceneEvents.off(eventNames.needStartingColor, this.handleGivePLayerColor, this);
        })
    }

    handleColorChanged(color){
        this.playerIcon.setTexture(`dino-${color}-ui`)
        this.currentPlayerColor = color;
    }

    handleGotCheckpoint(color){
        this.checkpointDisplay.setTexture(`checkpoint-flag-${color}`)
    }

    handleCollectedCoin(value){
        this.coinCount+= value;

        if(this.coinCount >= 100){
            this.coinCount -= 100;
            this.lives++;
            this.updateLivesDisplay()
            this.coinCountDisplay.text = `${this.coinCount}`
        }else{
            this.coinCountDisplay.text = `${this.coinCount}`
        }
    }

    handleGivePLayerColor(){
        console.log(this.currentPlayerColor)
        sceneEvents.emit(eventNames.sendStartingColor, this.currentPlayerColor);
    }

    updateLivesDisplay(){
        this.lifeCounter.text = `x${this.lives}`;
    }
}