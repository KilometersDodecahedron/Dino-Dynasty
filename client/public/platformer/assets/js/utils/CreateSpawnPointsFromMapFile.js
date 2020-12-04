import { sceneEvents, eventNames } from "../events/events.js"

//used to get this.spawningArrays for the scene
function createSpawnPointArrays(map, scene){
    let spawningArrays = {};

    spawningArrays.playerSpawn = map.getObjectLayer("Player");
    spawningArrays.cavemenSpawns = map.getObjectLayer("Cavemen");
    spawningArrays.batSpawns = map.getObjectLayer("Bats");
    spawningArrays.potionSpawns = map.getObjectLayer("Potions");
    spawningArrays.coinSpawns = map.getObjectLayer("Coins");

    return spawningArrays;
}

function createStartingObjects(scene) {
    spawnPlayer(scene);
    respawnObjects(scene);
}

function respawnObjects(scene){

    spawnCoins(scene);
    spawnCavemen(scene);
    //delaying respawn so they're not instantly destroyed if it trigger in the wrong order
    // let respawnStuffAfterBriefDelay = Phaser.Time.TimerEvent;
    
    // scene.time.addEvent({
    //     delay: 5,
    //     callback: () => {
    //         spawnCoins(scene);
    //         spawnCavemen(scene);
    //     }
    // })
}

function spawnPlayer(scene){
    scene.player = scene.add.player(scene.scene, scene.spawningArrays.playerSpawn.objects[0].x, scene.spawningArrays.playerSpawn.objects[0].y, "dino-green");
    scene.player.callbackFunction(scene.fireBalls);
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