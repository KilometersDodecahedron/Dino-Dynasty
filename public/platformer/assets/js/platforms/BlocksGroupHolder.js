import Block from "./floatingBlocks.js";

const createBlockGroups = (scene) => {
    let blockGroups = {
        collisionArray: []
    }

    const floatingBlocks = scene.physics.add.group({
        classType: Block,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    })
    blockGroups.collisionArray.push(floatingBlocks);
    blockGroups.floatingBlocks = floatingBlocks;

    return blockGroups;
}

export {
    createBlockGroups
}