const createCollision = (scene) => {
    //collide with ground
    scene.staticGround.forEach(ground => {
        scene.physics.add.collider(ground, scene.player)
        scene.physics.add.collider(ground, scene.fireBalls, scene.collisionEffects.handleProjectileWallCollision, undefined, scene)

        //have enemies collide with the ground
        scene.enemies.solidEnemies.forEach(enemy => {
            scene.physics.add.collider(ground, enemy)
        });
    })

    //collide with block
    scene.blocks.collisionArray.forEach(block => {
        scene.physics.add.collider(block, scene.player, scene.collisionEffects.handlePlayerBlockCollision, undefined, scene)
        scene.physics.add.overlap(block, scene.fireBalls, scene.collisionEffects.handleProjectileBlockCollision, undefined, scene)

        //have enemies collide with the block
        scene.enemies.solidEnemies.forEach(enemy => {
            scene.physics.add.collider(block, enemy)
        });
    })

    //collectables
    scene.colorPickups.colorPickupsArray.forEach(pickup => {
        scene.physics.add.overlap(pickup, scene.player, scene.collisionEffects.handleColorChangePickup, undefined, scene)
    });

    scene.enemies.collisionArray.forEach(enemy => {
        //enemies and player
        scene.physics.add.overlap(scene.player, enemy, scene.collisionEffects.handleEnemyPlayerCollision, undefined, scene)
        //enemies and fireball
        scene.physics.add.overlap(scene.fireBalls, enemy, scene.collisionEffects.handleProjectileEnemyCollision, undefined, scene)
    })

    //enemy projectiles
    scene.enemies.collisionProjectilesArray.forEach(projectile => {
        scene.physics.add.overlap(scene.player, projectile, scene.collisionEffects.handlePlayerProjectileCollisions, undefined, scene)
    })
}

export {
    createCollision
}