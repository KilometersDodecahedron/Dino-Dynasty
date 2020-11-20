import BatEnemy from "../enemies/BatEnemy.js"
import HumpbackEnemy from "../enemies/HumpbackEnemy.js"
import TriclopsEnemy from "../enemies/TriclopsEnemy.js"
import BigmouthEnemy from "../enemies/BigmouthEnemy.js"

const createEnemyGroups = (scene) => {
    let enemyGroups = {};

    const batsHorizontal = scene.physics.add.group({
        classType: BatEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    scene.enemyGroupsArray.push(batsHorizontal)
    enemyGroups.batsHorizontal = batsHorizontal;

    const batsVertical = scene.physics.add.group({
        classType: BatEnemy,
        createCallback: (gameObject) => {
            gameObject.moveHorrizontal = false;
            gameObject.callbackFunction();
        }
    })
    scene.enemyGroupsArray.push(batsVertical);
    enemyGroups.batsVertical = batsVertical;

    const humpback = scene.physics.add.group({
        classType: HumpbackEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
            gameObject.body.setSize(19, 28).setOffset(5, 4);
        }
    })
    scene.enemyGroupsArray.push(humpback)
    scene.solidEnemies.push(humpback)
    enemyGroups.humpback = humpback;

    const triclops = scene.physics.add.group({
        classType: TriclopsEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    scene.enemyGroupsArray.push(triclops)
    scene.solidEnemies.push(triclops)
    enemyGroups.triclops = triclops;

    const bigmouth = scene.physics.add.group({
        classType: BigmouthEnemy,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    scene.enemyGroupsArray.push(bigmouth)
    scene.solidEnemies.push(bigmouth)
    enemyGroups.bigmouth = bigmouth;

    return enemyGroups;
}

export {
    createEnemyGroups
}