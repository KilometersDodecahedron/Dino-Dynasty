const createCollision = (scene) => {
    //collide with ground
    scene.staticGround.forEach(ground => {
        scene.physics.add.collider(ground, scene.player)
        scene.physics.add.collider(ground, scene.fireBalls, scene.collisionEffects.handleProjectileWallCollision, undefined, scene)

        //have enemies collide with the ground
        scene.enemies.solidEnemies.forEach(enemy => {
            scene.physics.add.collider(ground, enemy)
        });

        scene.interactables.groudedCollisionArray.forEach(groundedInteractable => {
            scene.physics.add.collider(ground, groundedInteractable)
        });

        scene.enemies.hazards.collisionHazardArray.forEach(hazard => {
            scene.physics.add.collider(ground, hazard)
        });

        scene.enemies.hazards.collisionInstaKillArray.forEach(hazard => {
            scene.physics.add.collider(ground, hazard)
        });
    })

    //collide with block
    // scene.blocks.collisionArray.forEach(block => {
    //     scene.physics.add.collider(block, scene.player, scene.collisionEffects.handlePlayerBlockCollision, undefined, scene)
    //     scene.physics.add.overlap(block, scene.fireBalls, scene.collisionEffects.handleProjectileBlockCollision, undefined, scene)

    //     //have enemies collide with the block
    //     scene.enemies.solidEnemies.forEach(enemy => {
    //         scene.physics.add.collider(block, enemy)
    //     });
    // })

    //collectables
    scene.colorPickups.colorPickupsArray.forEach(pickup => {
        scene.physics.add.overlap(pickup, scene.player, scene.collisionEffects.handleColorChangePickup, undefined, scene)
    });

    //enemies collide with player and fireballs
    scene.enemies.collisionArray.forEach(enemy => {
        //enemies and player
        scene.physics.add.overlap(scene.player, enemy, scene.collisionEffects.handleEnemyPlayerCollision, undefined, scene)
        //enemies and fireball
        scene.physics.add.overlap(scene.fireBalls, enemy, scene.collisionEffects.handleProjectileEnemyCollision, undefined, scene)

        scene.enemies.hazards.collisionInstaKillArray.forEach(hazard => {
            scene.physics.add.overlap(enemy, hazard, scene.collisionEffects.handleEnemyLavaCollision, undefined, scene)
        });
    })

    //enemy projectiles
    scene.enemies.collisionProjectilesArray.forEach(projectile => {
        scene.physics.add.overlap(scene.player, projectile, scene.collisionEffects.handlePlayerProjectileCollisions, undefined, scene)
    })

    //damaging hazards like spikes
    scene.enemies.hazards.collisionHazardArray.forEach(hazard => {
        scene.physics.add.overlap(scene.player, hazard, scene.collisionEffects.handlePlayerHazardCollision, undefined, scene);
    });

    //instakill hazards like lava
    scene.enemies.hazards.collisionInstaKillArray.forEach(hazard => {
        scene.physics.add.overlap(scene.player, hazard, scene.collisionEffects.handlePlayerInstakillCollision, undefined, scene);
    });
    
    //checkpoints
    scene.physics.add.overlap(scene.interactables.checkpoints, scene.player, scene.collisionEffects.handlePlayerCheckpointCollision, undefined, scene)

    //coins
    scene.collectables.coins.collisionArray.forEach(coin => {
        scene.physics.add.overlap(scene.player, coin, scene.collisionEffects.handlePlayerCoinCollision, undefined, scene)
    })

    //goal
    scene.physics.add.overlap(scene.interactables.goalPost, scene.player, scene.collisionEffects.handlePlayerGoalPostCollision, undefined, scene)
}

export {
    createCollision
}