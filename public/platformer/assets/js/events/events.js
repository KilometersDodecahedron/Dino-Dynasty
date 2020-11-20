const sceneEvents = new Phaser.Events.EventEmitter();

//stores the strings to access events
const eventNames = {
    playerDied: "playerDied"
}

export {
    sceneEvents,
    eventNames
}