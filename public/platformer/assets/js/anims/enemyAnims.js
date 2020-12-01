const createEnemyAnims = anims => {
    anims.create({
        key: "bat",
        frames: [{key: "bat-1"}, {key: "bat-2"}],
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "bigmouth-idle",
        frames: anims.generateFrameNames("bigmouth", {start: 1, end: 4, prefix: "bigmouth-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "bigmouth-walk",
        frames: anims.generateFrameNames("bigmouth", {start: 1, end: 4, prefix: "bigmouth-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "humpback-idle",
        frames: anims.generateFrameNames("humpback", {start: 1, end: 4, prefix: "humpback-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "humpback-walk",
        frames: anims.generateFrameNames("humpback", {start: 1, end: 4, prefix: "humpback-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "mustache-idle",
        frames: anims.generateFrameNames("mustache", {start: 1, end: 4, prefix: "mustache-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "mustache-walk",
        frames: anims.generateFrameNames("mustache", {start: 1, end: 4, prefix: "mustache-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "triclops-idle",
        frames: anims.generateFrameNames("triclops", {start: 1, end: 4, prefix: "triclops-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "triclops-walk",
        frames: anims.generateFrameNames("triclops", {start: 1, end: 4, prefix: "triclops-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })

    anims.create({
        key: "lava",
        frames: anims.generateFrameNames("lava", {start: 0, end: 11, prefix: "lava", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })
}

export {
    createEnemyAnims
}