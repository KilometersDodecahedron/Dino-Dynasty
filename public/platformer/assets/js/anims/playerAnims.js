const createPlayerAnims = (anims) => {
    //green
    anims.create({
        key: "dino-green-walk",
        frames: anims.generateFrameNames("dino-green", {start: 1, end: 6, prefix: "dino-green-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-green-idle",
        frames: anims.generateFrameNames("dino-green", {start: 1, end: 4, prefix: "dino-green-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //jumping up and down is one frame
    anims.create({
        key: "dino-green-jump-up",
        frames: [{key: "dino-green", frame: "dino-green-jump-1.png"}]
    });

    anims.create({
        key: "dino-green-jump-down",
        frames: [{key: "dino-green", frame: "dino-green-jump-2.png"}]
    });

    anims.create({
        key: "dino-green-hurt",
        frames: anims.generateFrameNames("dino-green", {start: 1, end: 3, prefix: "dino-green-hurt-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-green-run",
        frames: anims.generateFrameNames("dino-green", {start: 1, end: 7, prefix: "dino-green-run-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //red
    anims.create({
        key: "dino-red-walk",
        frames: anims.generateFrameNames("dino-red", {start: 1, end: 6, prefix: "dino-red-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-red-idle",
        frames: anims.generateFrameNames("dino-red", {start: 1, end: 4, prefix: "dino-red-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //jumping up and down is one frame
    anims.create({
        key: "dino-red-jump-up",
        frames: [{key: "dino-red", frame: "dino-red-jump-1.png"}]
    });

    anims.create({
        key: "dino-red-jump-down",
        frames: [{key: "dino-red", frame: "dino-red-jump-2.png"}]
    });

    anims.create({
        key: "dino-red-hurt",
        frames: anims.generateFrameNames("dino-red", {start: 1, end: 3, prefix: "dino-red-hurt-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-red-run",
        frames: anims.generateFrameNames("dino-red", {start: 1, end: 7, prefix: "dino-red-run-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //yellow
    anims.create({
        key: "dino-yellow-walk",
        frames: anims.generateFrameNames("dino-yellow", {start: 1, end: 6, prefix: "dino-yellow-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-yellow-idle",
        frames: anims.generateFrameNames("dino-yellow", {start: 1, end: 4, prefix: "dino-yellow-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //jumping up and down is one frame
    anims.create({
        key: "dino-yellow-jump-up",
        frames: [{key: "dino-yellow", frame: "dino-yellow-jump-1.png"}]
    });

    anims.create({
        key: "dino-yellow-jump-down",
        frames: [{key: "dino-yellow", frame: "dino-yellow-jump-2.png"}]
    });

    anims.create({
        key: "dino-yellow-hurt",
        frames: anims.generateFrameNames("dino-yellow", {start: 1, end: 3, prefix: "dino-yellow-hurt-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-yellow-run",
        frames: anims.generateFrameNames("dino-yellow", {start: 1, end: 7, prefix: "dino-yellow-run-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //blue
    anims.create({
        key: "dino-blue-walk",
        frames: anims.generateFrameNames("dino-blue", {start: 1, end: 6, prefix: "dino-blue-walk-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-blue-idle",
        frames: anims.generateFrameNames("dino-blue", {start: 1, end: 4, prefix: "dino-blue-idle-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    //jumping up and down is one frame
    anims.create({
        key: "dino-blue-jump-up",
        frames: [{key: "dino-blue", frame: "dino-blue-jump-1.png"}]
    });

    anims.create({
        key: "dino-blue-jump-down",
        frames: [{key: "dino-blue", frame: "dino-blue-jump-2.png"}]
    });

    anims.create({
        key: "dino-blue-hurt",
        frames: anims.generateFrameNames("dino-blue", {start: 1, end: 3, prefix: "dino-blue-hurt-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "dino-blue-run",
        frames: anims.generateFrameNames("dino-blue", {start: 1, end: 7, prefix: "dino-blue-run-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "fire-ball",
        frames: anims.generateFrameNames("fire-ball", {start: 1, end: 5, prefix: "FB00", suffix: ".png"}),
        frameRate: 24,
        repeat: -1
    })
}

export {
    createPlayerAnims
}