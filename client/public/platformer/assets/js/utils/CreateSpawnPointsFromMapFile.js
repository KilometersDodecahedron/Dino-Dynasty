//used to get this.spawningArrays for the scene
function createSpawnPointArrays(map, scene){
    let spawningArrays = {
        destroyOnRespawnArray: []
    };

    spawningArrays.playerSpawn = map.getObjectLayer("Player");
    spawningArrays.cavemenSpawns = map.getObjectLayer("Cavemen");
    spawningArrays.batSpawns = map.getObjectLayer("Bats");
    spawningArrays.potionSpawns = map.getObjectLayer("Potions");
    spawningArrays.coinSpawns = map.getObjectLayer("Coins");

    return spawningArrays;
}

function createStartingObjects(scene) {
    spawnPlayer(scene);
    spawnCavemen(scene);
}

function spawnPlayer(scene){
    scene.player = scene.add.player(scene.scene, scene.spawningArrays.playerSpawn.objects[0].x, scene.spawningArrays.playerSpawn.objects[0].y, "dino-green");
    scene.player.callbackFunction(scene.fireBalls);
}

function spawnCavemen(scene){
    if(scene.spawningArrays.cavemenSpawns.objects.length > 0){
        scene.spawningArrays.cavemenSpawns.objects.array.forEach(element => {
            
        });
    }
}

export {
    createSpawnPointArrays,
    createStartingObjects
}