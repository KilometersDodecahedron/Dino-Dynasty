import BatEnemy from "../enemies/BatEnemy.js"
import HumpbackEnemy from "../enemies/HumpbackEnemy.js"
import TriclopsEnemy from "../enemies/TriclopsEnemy.js"
import BigmouthEnemy from "../enemies/BigmouthEnemy.js"
import MustacheEnemy from "../enemies/MustacheEnemy.js"

import CowSkullProjectile from "../enemies/weapons/CowSkullProjectile.js"

import IndestructibleHazard from "../enemies/hazards/IndestructibleHazardClass.js"

const createEnemyGroups = (scene) => {
    let enemyGroups = {
        //collision with player, projectiles, etc
        collisionArray: [],
        //enemies that collide with the ground, rather than ones that phase through it
        solidEnemies: [],
        //weapons used by enemies go here
        weapons: {},
        collisionProjectilesArray: [],
        //hazards
        hazards: {
            collisionHazardArray: []
        },
    };

    const batsHorizontal = scene.physics.add.group({
        classType: BatEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    enemyGroups.collisionArray.push(batsHorizontal)
    enemyGroups.batsHorizontal = batsHorizontal;

    const batsVertical = scene.physics.add.group({
        classType: BatEnemy,
        createCallback: (gameObject) => {
            gameObject.moveHorrizontal = false;
            gameObject.callbackFunction();
        }
    })
    enemyGroups.collisionArray.push(batsVertical)
    enemyGroups.batsVertical = batsVertical;

    const batsSedentary = scene.physics.add.group({
        classType: BatEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
            gameObject.moveSpeed = 0;
            gameObject.setVelocity(0, 0)
        }
    })
    enemyGroups.collisionArray.push(batsSedentary)
    enemyGroups.batsSedentary = batsSedentary;

    const humpback = scene.physics.add.group({
        classType: HumpbackEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
            gameObject.body.setSize(19, 28).setOffset(5, 4);
        }
    })
    enemyGroups.collisionArray.push(humpback)
    enemyGroups.solidEnemies.push(humpback)
    enemyGroups.humpback = humpback;

    const triclops = scene.physics.add.group({
        classType: TriclopsEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    enemyGroups.collisionArray.push(triclops)
    enemyGroups.solidEnemies.push(triclops)
    enemyGroups.triclops = triclops;

    const bigmouth = scene.physics.add.group({
        classType: BigmouthEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    enemyGroups.collisionArray.push(bigmouth)
    enemyGroups.solidEnemies.push(bigmouth)
    enemyGroups.bigmouth = bigmouth;

    const mustache = scene.physics.add.group({
        classType: MustacheEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
            gameObject.cowSkull = scene.enemies.weapons.cowSkull;
        }
    })
    enemyGroups.collisionArray.push(mustache)
    enemyGroups.solidEnemies.push(mustache)
    enemyGroups.mustache = mustache;

    ///Projectils////
    const cowSkull = scene.physics.add.group({
        classType: CowSkullProjectile,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    });
    enemyGroups.collisionProjectilesArray.push(cowSkull);
    enemyGroups.weapons.cowSkull = cowSkull;

    ////Hazards////
    const groundHazard = scene.physics.add.group({
        classType: IndestructibleHazard,
        // createCallback: (gameObject) => {
        //     gameObject.callbackFunction();
        // }
    });
    enemyGroups.hazards.collisionHazardArray.push(groundHazard)
    enemyGroups.hazards.groundHazard = groundHazard;

    const ceilingHazard = scene.physics.add.group({
        classType: IndestructibleHazard,
        createCallback: (gameObject) => {
            gameObject.setGravityY(-1000);
            gameObject.flipY = true;
        }
    });
    enemyGroups.hazards.collisionHazardArray.push(ceilingHazard)
    enemyGroups.hazards.ceilingHazard = ceilingHazard;

    const floatingHazard = scene.physics.add.group({
        classType: IndestructibleHazard,
        createCallback: (gameObject) => {
            gameObject.body.setAllowGravity(false);
        }
    });
    enemyGroups.hazards.collisionHazardArray.push(floatingHazard)
    enemyGroups.hazards.floatingHazard = floatingHazard;

    return enemyGroups;
}

export {
    createEnemyGroups
}