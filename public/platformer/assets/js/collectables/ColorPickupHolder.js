import RedPickup from "./RedColorPickup.js";
import YellowPickup from "./YellowColorPickup.js";
import BluePickup from "./BlueColorPickup.js";

const createColorPickups = (scene) => {
    let colorPickups = {
        colorPickupsArray: []
    };

    const bluePickup = scene.physics.add.group({
        classType: BluePickup,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    });
    colorPickups.bluePickup = bluePickup;
    colorPickups.colorPickupsArray.push(bluePickup);

    const yellowPickup = scene.physics.add.group({
        classType: YellowPickup,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    });
    colorPickups.yellowPickup = yellowPickup;
    colorPickups.colorPickupsArray.push(yellowPickup);

    const redPickup = scene.physics.add.group({
        classType: RedPickup,
        createCallback: (gameObject) => {
            gameObject.callbackFunction();
        }
    });
    colorPickups.redPickup = redPickup;
    colorPickups.colorPickupsArray.push(redPickup);

    return colorPickups;
}

export {createColorPickups};