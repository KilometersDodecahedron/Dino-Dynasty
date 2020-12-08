const sceneEvents = new Phaser.Events.EventEmitter();

//stores the strings to access events
const eventNames = {
    playerDied: "playerDied",
    playerRespawned: "playerRespawned",
    livesChanged: "livesChange",
    colorChanged: "livesChange",
    checkpointReached: "checkpointReached",
    coinCollected: "coinCollected",
    goalPostReached: "goalPostReached",
    gameOver: "gameOver",
    finalGoalReacher: "finalGoalReacher",
    loadWinScreen: "loadWinScreen",

    //used to move player color between scenes
    needStartingColor: "needStartingColor",
    sendStartingColor: "sendStartingColor",

    increaseScore: "increaseScore",

    setAndStartTimer: "setAndStartTimer",
    stopTimer: "stopTimer",
    timeRanOut: "timeRanOut"
}

export {
    sceneEvents,
    eventNames
}