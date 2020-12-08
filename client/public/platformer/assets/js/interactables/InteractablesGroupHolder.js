import CheckPoint from "./midLevelCheckpoint.js";
import GoalPost from "./GoalPost.js"

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

    const goalPost = scene.physics.add.group({
        classType: GoalPost,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    interactableGroups.goalPost = goalPost;
    interactableGroups.groudedCollisionArray.push(goalPost);

    return interactableGroups;
}

export {
    createInteractableGroups
}