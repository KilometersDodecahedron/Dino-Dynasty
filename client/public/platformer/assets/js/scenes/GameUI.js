import { sceneEvents, eventNames } from "../events/events.js"

export default class GameUI extends Phaser.Scene {
    constructor(){
        super("game-ui");

        this.currentPlayerColor = "green";

        this.playerIcon;
        this.lifeCounter;
        this.lives = 3;

        this.scoreText;
        this.currentScore = 0;

        this.coinIcon;
        this.coinCountDisplay;
        this.coinCount = 0;

        //stores the actual event that goes off
        this.timerEvent = Phaser.Time.TimerEvent;
        this.currentTime = 400;
        this.timerText;

        //points for each coin you get
        this.coinPointValueMultiplier = 100;

        //points for each second remaining when you finish the level
        this.timeRemainingPointMultiplier = 10;

        this.checkpointScoreValue = 3000;
        this.getExtraLivePointValue = 3000;
        this.finishLevelPointValue = 5000;
        this.beatGameRemainingLivesBonusMultiplier = 7500;

        //icon in top right that shows if you hit a checkpoint
        this.checkpointDisplay;

        //turned on when level ends, off when next level begins
        this.levelCompleteText;
        this.levelCompleteScoreBonusText;
        this.levelCompleteTimeBonusText;
        this.levelCompleteTotalScoreText;
        this.timeRanOutText;
    }

    create(){
        this.resetValues();
        this.playerIcon = this.add.image(20, 542, "dino-green-ui")
        this.lifeCounter = this.add.text(35, 534, `x${this.lives}`)

        this.coinIcon = this.add.image(762, 545, "coin-one")
        this.coinCountDisplay = this.add.text(775, 537, `${this.coinCount}`)

        this.scoreText = this.add.text(12, 10, `SCORE:${this.currentScore}`)

        this.checkpointDisplay = this.add.image(780, 20, `checkpoint-flag-white`).setScale(1.8, 1.8)

        this.timerText = this.add.text(365, 5, `TIME:${this.currentTime}`)

        //style of the end-level text
        var levelFinishTextConfig = {fontSize:'30px',color:'#ff0000',fontFamily: 'Arial'};
        var levelFinishTitleConfig = {fontSize:'50px',color:'#ff0000',fontFamily: 'Arial'};

        this.levelCompleteText = this.add.text(200, 100, "", levelFinishTitleConfig)
        this.levelCompleteScoreBonusText = this.add.text(160, 200, '', levelFinishTextConfig)
        this.levelCompleteTimeBonusText = this.add.text(160, 300, ``, levelFinishTextConfig);
        this.levelCompleteTotalScoreText = this.add.text(160, 400, ``, levelFinishTextConfig);

        sceneEvents.on(eventNames.colorChanged, this.handleColorChanged, this);
        sceneEvents.on(eventNames.checkpointReached, this.handleGotCheckpoint, this)
        sceneEvents.on(eventNames.coinCollected, this.handleCollectedCoin, this)
        sceneEvents.on(eventNames.needStartingColor, this.handleGivePLayerColor, this)
        sceneEvents.on(eventNames.increaseScore, this.increaseScore, this)
        sceneEvents.on(eventNames.goalPostReached, this.handleReachedGoalPost, this)
        sceneEvents.on(eventNames.setAndStartTimer, this.handleStartTimer, this);
        sceneEvents.on(eventNames.playerDied, this.handlePlayerRespawn, this);
        sceneEvents.on(eventNames.finalGoalReacher, this.handleFinalGoalReached, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.colorChanged, this.handleColorChanged, this);
            sceneEvents.off(eventNames.checkpointReached, this.handleGotCheckpoint, this);
            sceneEvents.off(eventNames.coinCollected, this.handleCollectedCoin, this);
            sceneEvents.off(eventNames.needStartingColor, this.handleGivePLayerColor, this);
            sceneEvents.off(eventNames.increaseScore, this.increaseScore, this);
            sceneEvents.off(eventNames.goalPostReached, this.handleReachedGoalPost, this)
            sceneEvents.off(eventNames.setAndStartTimer, this.handleStartTimer, this);
            sceneEvents.off(eventNames.playerDied, this.handlePlayerRespawn, this);
            sceneEvents.off(eventNames.finalGoalReacher, this.handleFinalGoalReached, this);
        })

        this.timerEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.handleTimerCountdown();
            },
            loop: true
        })
    }

    handleColorChanged(color){
        this.playerIcon.setTexture(`dino-${color}-ui`)
        this.currentPlayerColor = color;
    }

    handleGotCheckpoint(color){
        this.checkpointDisplay.setTexture(`checkpoint-flag-${color}`)
        this.increaseScore(this.checkpointScoreValue);
    }

    handleCollectedCoin(value){
        this.coinCount+= value;

        //get points for collecting coins
        this.increaseScore(value * this.coinPointValueMultiplier);

        if(this.coinCount >= 100){
            this.coinCount -= 100;
            this.lives++;
            this.updateLivesDisplay()
            this.coinCountDisplay.text = `${this.coinCount}`

            this.increaseScore(this.getExtraLivePointValue);
        }else{
            this.coinCountDisplay.text = `${this.coinCount}`
        }
    }

    handleGivePLayerColor(){
        // reset the checkpoint display when the level restarts
        this.checkpointDisplay.setTexture(`checkpoint-flag-white`)
        sceneEvents.emit(eventNames.sendStartingColor, this.currentPlayerColor);
    }

    handleStartTimer(timeLimit){
        this.currentTime = timeLimit;
        this.timerText.text = `TIME:${this.currentTime}`;
        this.timerEvent.paused = false;

        this.levelCompleteText.text = "";
        this.levelCompleteScoreBonusText.text = "";
        this.levelCompleteTimeBonusText.text = "";
        this.levelCompleteTotalScoreText.text = "";
    }

    handleTimerCountdown(){
        this.currentTime--;
        this.timerText.text = `TIME:${this.currentTime}`;

        if(this.currentTime <= 0){
            this.handleStopTimer();
            this.timerRanOut();
        }
    }

    handleStopTimer(){
        this.timerEvent.paused = true;
    }

    handlePlayerRespawn(respawnDelay){
        this.lives -= 1;
        this.updateLivesDisplay();

        this.time.addEvent({
            delay: respawnDelay,
            callback: () => {
                if(this.lives > 0 && this.currentTime > 0){
                    sceneEvents.emit(eventNames.playerRespawned);
                }else{
                    sceneEvents.emit(eventNames.gameOver, this.currentScore);
                }
            }
        })
    }

    handleReachedGoalPost(){
        this.increaseScore(this.finishLevelPointValue);
        this.handleStopTimer();
        this.showEndingScore();
    }

    handleFinalGoalReached(){
        let dataObject = {
            score: this.currentScore,
            lives: this.lives,
            bonusMultiplier: this.beatGameRemainingLivesBonusMultiplier
        }

        sceneEvents.emit(eventNames.loadWinScreen, dataObject);
    }

    showEndingScore(){
        this.levelCompleteText.text = "LEVEL COMPLETE";
        this.levelCompleteScoreBonusText.text = `Finished Level Bonus: ${this.finishLevelPointValue}`;
        this.levelCompleteTimeBonusText.text = `Time Remaining Bonus: ${this.timeRemainingPointMultiplier} X ${this.currentTime} = ${this.timeRemainingPointMultiplier * this.currentTime}`;
        this.levelCompleteTotalScoreText.text = `Total Score: ${this.currentScore}`;
    }

    updateLivesDisplay(){
        this.lifeCounter.text = `x${this.lives}`;
    }

    timerRanOut(){
        sceneEvents.emit(eventNames.timeRanOut);
        const textConfig = {fontSize:'100px',color:'#ff0000',fontFamily: 'Arial'};

        this.timeRanOutText = this.add.text(400, 280, "TIME'S UP", textConfig).setOrigin(0.5);
    }

    increaseScore(points){
        this.currentScore += points;
        this.scoreText.text = `SCORE:${this.currentScore}`;
    }

    //run at start for repeated plays
    resetValues(){
        this.lives = 3;
        this.currentScore = 0;
        this.coinCount = 0;
        this.timeRanOutText = this.add.text(35, 534, "");
    }
}