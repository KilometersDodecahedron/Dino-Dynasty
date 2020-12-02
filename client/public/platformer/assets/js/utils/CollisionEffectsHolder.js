//stored in the collisionEffects variable of the scene.
//determines what heppens when 2 objects interact

const createCollisionEffects = () => {
    let collisionEffectsObject = {};

    function handlePlayerBlockCollision(player, block){
        if(block.body.touching.down && player.body.touching.up){
            player.setVelocityY(20)
            block.takeDamage();
        } else if(block.body.touching.up && player.body.touching.down){
            player.onBlock = true;
        }
    }
    collisionEffectsObject.handlePlayerBlockCollision = handlePlayerBlockCollision

    function handleProjectileBlockCollision(block, projectile){
        block.takeDamage();
        projectile.destroy();
    }
    collisionEffectsObject.handleProjectileBlockCollision = handleProjectileBlockCollision

    function handleProjectileWallCollision(projectile, wall){
        projectile.destroy();
    }
    collisionEffectsObject.handleProjectileWallCollision = handleProjectileWallCollision

    function handleProjectileEnemyCollision(projectile, enemy){
        projectile.destroy();
        enemy.takeFireballDamage();
    }
    collisionEffectsObject.handleProjectileEnemyCollision = handleProjectileEnemyCollision

    function handleColorChangePickup(player, color){
        player.changeColor(color.color);
        color.collect();
    }
    collisionEffectsObject.handleColorChangePickup = handleColorChangePickup;

    function handleEnemyPlayerCollision(player, enemy){
        //jump on enemy
        if(enemy.body.touching.up && player.body.touching.down && !player.inTakenDamageState){
            player.jumpOffEnemy();
            player.hasDoubleJumped = false;
            enemy.takeDamageJump();
        }
        //take damage from enemy
        else{
            enemy.collidedWithEnemyFunction(player);
            player.takeDamage();
        }
    }
    collisionEffectsObject.handleEnemyPlayerCollision = handleEnemyPlayerCollision;

    function handlePlayerHazardCollision(player, hazard){
        player.takeDamage();
    }
    collisionEffectsObject.handlePlayerHazardCollision = handlePlayerHazardCollision;

    function handlePlayerInstakillCollision(player, hazard){
        player.instaKill();
    }
    collisionEffectsObject.handlePlayerInstakillCollision = handlePlayerInstakillCollision;

    function handlePlayerProjectileCollisions(player, projectile){
        player.takeDamage();
        projectile.destroyProjectile();
    }
    collisionEffectsObject.handlePlayerProjectileCollisions = handlePlayerProjectileCollisions;

    function handlePlayerCheckpointCollision(player, checkpoint){
        if(!checkpoint.hasBeenChecked){
            checkpoint.setCheckpoint(player)
        }
    }
    collisionEffectsObject.handlePlayerCheckpointCollision = handlePlayerCheckpointCollision;

    function handlePlayerCoinCollision(player, coin) {
        coin.collect();
    }
    collisionEffectsObject.handlePlayerCoinCollision = handlePlayerCoinCollision;

    function handlePlayerGoalPostCollision(player, goal) {
        if(!goal.hasBeenTouched){
            goal.touchGoalPost();
        }
    }
    collisionEffectsObject.handlePlayerGoalPostCollision = handlePlayerGoalPostCollision;

    return collisionEffectsObject;
}

export {
    createCollisionEffects
}