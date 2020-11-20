import Preloader from "./scenes/Preloader.js";
import Game from "./scenes/PracticeScene.js";

const config = {
    type: Phaser.AUTO,
    //TODO turn this back to 800, 560
    width: 800,
    height: 560,
    autoCenter: true,
    parent: 'mygame',
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 400 }
            ,debug: true
        }
    },

    scene: [
        Preloader,
        Game
    ]
}

const game = new Phaser.Game(config);