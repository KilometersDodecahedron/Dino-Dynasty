import CoinClass from "./CoinClass.js"

const createCollectablesGroups = (scene) => {
    let collectables = {
        //property of collectables object
        coins: {
            collisionArray: []
        }
    }

    const coinOne = scene.physics.add.group({
        classType: CoinClass,
        createCallback: (gameObject) => {
            gameObject.setValueAndScale(1, 8, 8, "coin-one");
        }
    })
    collectables.coins.coinOne = coinOne;
    collectables.coins.collisionArray.push(coinOne)

    const coinFive = scene.physics.add.group({
        classType: CoinClass,
        createCallback: (gameObject) => {
            gameObject.setValueAndScale(5, 12, 4, "coin-five");
        }
    })
    collectables.coins.coinFive = coinFive;
    collectables.coins.collisionArray.push(coinFive)

    const coinTen = scene.physics.add.group({
        classType: CoinClass,
        createCallback: (gameObject) => {
            gameObject.setValueAndScale(10, 16, 0, "coin-ten");
        }
    })
    collectables.coins.coinTen = coinTen;
    collectables.coins.collisionArray.push(coinTen)

    return collectables;
}

export {
    createCollectablesGroups
}