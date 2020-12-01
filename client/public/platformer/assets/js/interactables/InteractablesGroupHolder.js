import CheckPoint from "./midLevelCheckpoint.js";

const createInteractableGroups = (scene) => {
    let interactableGroups = {
        //array for interactibles that collide with the tile map
        groudedCollisionArray: []
    }

    const checkpoints =  scene.physics.add.group({
        classType: CheckPoint,
        // createCallback: (gameObject) => {
        //     gameObject.callbackFunction();
        // }
    })
    interactableGroups.checkpoints = checkpoints;
    interactableGroups.groudedCollisionArray.push(checkpoints);

    return interactableGroups;
}

export {
    createInteractableGroups
}