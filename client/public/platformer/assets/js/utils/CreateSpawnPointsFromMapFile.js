import { sceneEvents, eventNames } from "../events/events.js"

//used to get this.spawningArrays for the scene
function createSpawnPointArrays(map, scene){
    let spawningArrays = {};

    spawningArrays.playerSpawn = map.getObjectLayer("Player");
    spawningArrays.cavemenSpawns = map.getObjectLayer("Cavemen");
    spawningArrays.batSpawns = map.getObjectLayer("Bats");
    spawningArrays.potionSpawns = map.getObjectLayer("Potions");
    spawningArrays.coinSpawns = map.getObjectLayer("Coins");
    spawningArrays.checkpointSpawn = map.getObjectLayer("Checkpoint");
    spawningArrays.goalSpawn = map.getObjectLayer("Goal");

    return spawningArrays;
}

function createStartingObjects(scene) {
    spawnCheckpoint(scene);
    spawnGoal(scene)
    spawnPlayer(scene);
    respawnObjects(scene);
}

function respawnObjects(scene){
    spawnCoins(scene);
    spawnPotions(scene);
    spawnCavemen(scene);
    spawnBats(scene);
}

function spawnPlayer(scene){
    if(scene.spawningArrays.playerSpawn.objects[0].x, scene.spawningArrays.playerSpawn){
        scene.player = scene.add.player(scene.scene, scene.spawningArrays.playerSpawn.objects[0].x, scene.spawningArrays.playerSpawn.objects[0].y, "dino-green");
        scene.player.callbackFunction(scene.fireBalls);
    }else{
        console.log("No Player object layer detected");
    }
}

function spawnCheckpoint(scene){
    if(scene.spawningArrays.checkpointSpawn.objects.length > 0){
        scene.interactables.checkpoints.get(scene.spawningArrays.checkpointSpawn.objects[0].x, scene.spawningArrays.checkpointSpawn.objects[0].y, "checkpoint-flag-white");
    }
}

function spawnGoal(scene){
    if(scene.spawningArrays.goalSpawn.objects.length > 0){
        scene.interactables.goalPost.get(scene.spawningArrays.goalSpawn.objects[0].x, scene.spawningArrays.goalSpawn.objects[0].y, "goal-post");
    }else{
        console.log("This level has no goal post");
    }
}

function spawnCoins(scene){
    if(scene.spawningArrays.coinSpawns.objects.length > 0){
        scene.spawningArrays.coinSpawns.objects.forEach(element => {
            let type = element.properties[0].value;

            if(type == 1){
                scene.collectables.coins.coinOne.get(element.x, element.y, "coin-one");
            }else if(type == 5){
                scene.collectables.coins.coinFive.get(element.x, element.y, "coin-five");
            }else if(type == 10){
                scene.collectables.coins.coinTen.get(element.x, element.y, "coin-ten");
            }
        })

    }
}

function spawnBats(scene){
    console.log(scene.spawningArrays.batSpawns.objects)
    if(scene.spawningArrays.batSpawns.objects.length > 0){
        scene.spawningArrays.batSpawns.objects.forEach(element => {
            let bat;
            let type = element.properties[0].value;

            if(type == "leftright"){
                bat = scene.enemies.batsHorizontal.get(element.x, element.y, "bat-1");
            }else if(type == "updown"){
                bat = scene.enemies.batsVertical.get(element.x, element.y, "bat-1");
            }else if(type == "still"){
                bat = scene.enemies.batsSedentary.get(element.x, element.y, "bat-1");
            }
        })
    }
}

function spawnPotions(scene){
    if(scene.spawningArrays.potionSpawns.objects.length > 0){
        scene.spawningArrays.potionSpawns.objects.forEach(element => {
            let type = element.properties[0].value;

            if(type == "red"){
                scene.colorPickups.redPickup.get(element.x, element.y, "Pickup");
            }else if(type == "blue"){
                scene.colorPickups.bluePickup.get(element.x, element.y, "Pickup");
            }else if(type == "yellow"){
                scene.colorPickups.yellowPickup.get(element.x, element.y, "Pickup");
            }
        })
    }
}

function spawnCavemen(scene){
    if(scene.spawningArrays.cavemenSpawns.objects.length > 0){
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
        });
    }
}

export {
    createSpawnPointArrays,
    createStartingObjects,
    respawnObjects
}