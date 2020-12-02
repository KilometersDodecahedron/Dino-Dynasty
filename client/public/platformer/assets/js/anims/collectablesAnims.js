const createCollectableAnims = anims => {
    anims.create({
        key: "coin-one",
        frames: anims.generateFrameNames("coin-anim-frames", {start: 1, end: 6, prefix: "coin-one-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "coin-five",
        frames: anims.generateFrameNames("coin-anim-frames", {start: 1, end: 8, prefix: "coin-five-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "coin-ten",
        frames: anims.generateFrameNames("coin-anim-frames", {start: 1, end: 10, prefix: "coin-ten-", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    });

    anims.create({
        key: "goal-post-inactive",
        frames: [{key: 'goal-post', frame: "goal-post0.png"}]
    })

    anims.create({
        key: "goal-post-active",
        frames: anims.generateFrameNames("goal-post", {start: 1, end: 4, prefix: "goal-post", suffix: ".png"}),
        frameRate: 12,
        repeat: -1
    })
}

export {
    createCollectableAnims
}