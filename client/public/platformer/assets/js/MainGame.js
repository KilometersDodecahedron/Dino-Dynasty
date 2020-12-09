import Preloader from "./scenes/Preloader.js";
import Game from "./scenes/PracticeScene.js";
import GameUI from "./scenes/GameUI.js";
import Dungeon from "./scenes/DungeonScene.js"
import Tutorial from "./scenes/TutorialScene.js"
import Temple from "./scenes/TempleScene.js"
import Level1 from "./scenes/Level1Scene.js"
import Level2 from "./scenes/Level2Scene.js"
import Level3 from "./scenes/Level3Scene.js"
import Menu from "./scenes/Menu.js"
import Scores from "./scenes/Scores.js"
import GameOverScreen from "./scenes/GameOverScreen.js"
import WinScreen from "./scenes/WinScreen.js"

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
            // ,debug: true
        }
    },

    scene: [
        Preloader,
        //make sure to load the game before the UI, so the UI goes above it
        Menu,
        Scores,
        GameOverScreen,
        Game,
        Tutorial,
        Level1,
        Level2,
        Level3,
        Temple,
        Dungeon,
        WinScreen,
        GameUI,
    ]
}

const game = new Phaser.Game(config);