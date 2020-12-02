const sceneEvents = new Phaser.Events.EventEmitter();

//stores the strings to access events
const eventNames = {
    playerDied: "playerDied",
    livesChanged: "livesChange",
    colorChanged: "livesChange",
    checkpointReached: "checkpointReached",
    coinCollected: "coinCollected",
    goalPostReached: "goalPostReached"
}

export {
    sceneEvents,
    eventNames
}