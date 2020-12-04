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
        console.log(scene.spawningArrays.cavemenSpawns.objects)
        scene.spawningArrays.cavemenSpawns.objects.forEach(element => {
            let caveman;
            let type = element.properties[0].value;

            if(type == "jumpat"){
                caveman = scene.enemies.bigmouth.get(element.x, element.y, "bigmouth");
            }else if(type == "runner"){
                caveman = scene.enemies.triclops.get(element.x, element.y, "triclops");
            }else if(type == "thrower"){
                caveman = scene.enemies.mustache.get(element.x, element.y, "mustache");
            }else if(type == "jumpup"){
                caveman = scene.enemies.humpback.get(element.x, element.y, "humpback");
            }

            scene.spawningArrays.destroyOnRespawnArray.push(caveman)
        });
    }
}

export {
    createSpawnPointArrays,
    createStartingObjects
}