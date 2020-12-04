import { sceneEvents, eventNames } from "../events/events.js"

import { createPlayerAnims } from "../anims/playerAnims.js";
import { createEnemyAnims } from "../anims/enemyAnims.js"
import { createCollectableAnims } from "../anims/collectablesAnims.js"

//this grants the this.add.player function
import "../player/PlayerClass.js"

import FireBall from "../player/FireBall.js";

import { createEnemyGroups } from "../enemies/EnemyGroupHolder.js"
import { createColorPickups } from "../collectables/ColorPickupHolder.js"
import { createCollectablesGroups } from "../collectables/CollectablesHolder.js"
//import { createBlockGroups } from "../platforms/BlocksGroupHolder.js"
import { createInteractableGroups } from "../interactables/InteractablesGroupHolder.js"
import { createSpawnPointArrays, createStartingObjects, respawnObjects } from "../utils/CreateSpawnPointsFromMapFile.js"

import { createCollisionEffects } from "../utils/CollisionEffectsHolder.js"
import { createCollision } from "../utils/CollisionHolder.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("temple");
        //the player
        this.player;
        this.cursors;
        this.fireBalls;
        this.genericParticles;
        //the ground layer that doesn't move
        this.staticGround = [];
        this.worldBoundsX = 3840;
        this.worldBoundsY = 336;
        this.timeLimit = 300;

        //stores bluePickup, redPickup, yellowPickup
        //set with createColorPickups
        this.colorPickups;

        //enemy groups are stored here as object properties
        this.enemies;

        //collectables stored in here, coins stored in collectables.coins
        this.collectables;

        //stores interactables like checkpoints, set with createInteractableGroups from InteractablesGroupHolder.js
        this.interactables;
        //store the destroyable blocks, set from createBlockGroups
        //this.blocks;

        //store object arrays that spawn enemies here
        this.spawningArrays = {}

        this.collisionEffects;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        //this.scene.run("game-ui");
        createPlayerAnims(this.anims);
        createEnemyAnims(this.anims);
        createCollectableAnims(this.anims);

        //what to do when object collide is stored here
        this.collisionEffects = createCollisionEffects();

        this.genericParticles = this.add.particles("particles");

        //set the boundaries of the world, to make them different from the canvas
        this.physics.world.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY, true, true, true, true)

        const map = this.make.tilemap({ key: "temple-level" })

        //creates variables to import background, ground, and platforms
        const grassTileset = map.addTilesetImage("grass", "grass")
        const platformSmallTileset = map.addTilesetImage("small-platform", "small-platform")
        const platformLongTileset = map.addTilesetImage("platform-long", "platform-long")
        const blockGoldTileset = map.addTilesetImage("small-platformGOLD", "small-platformGOLD")
        const blockTileset = map.addTilesetImage("block", "block")
        const blockBigTileset = map.addTilesetImage("block-big", "block-big")
        const backgroundTileset = map.addTilesetImage("templeBackground", "temple-background")

        this.spawningArrays = createSpawnPointArrays(map, this);
        sceneEvents.on(eventNames.playerRespawned, this.respawnEnemiesAfterDelay, this)
        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.playerRespawned, this.respawnEnemiesAfterDelay, this)
        })

        //creates background
        map.createStaticLayer('Background', backgroundTileset)

        //creates ground and platforms
        this.staticGround.push(map.createDynamicLayer("Ground", grassTileset));
        this.staticGround.push(map.createDynamicLayer("Platform", platformSmallTileset))
        this.staticGround.push(map.createDynamicLayer("PlatformLong", platformLongTileset))
        this.staticGround.push(map.createDynamicLayer("BlockGold", blockGoldTileset))
        this.staticGround.push(map.createDynamicLayer("Block", blockTileset))
        this.staticGround.push(map.createDynamicLayer("BlockBig", blockBigTileset))

        this.staticGround.forEach(ground => {
            ground.setCollisionByProperty({ ground: true })
        })

        this.fireBalls = this.physics.add.group({
            classType: FireBall,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        })

        //store interatables here
        this.interactables = createInteractableGroups(this);

        this.collectables = createCollectablesGroups(this);

        //store color pickups here
        this.colorPickups = createColorPickups(this);
        
        // this.player = this.add.player(this.scene, this.spawningArrays.playerSpawn.objects[0].x, this.spawningArrays.playerSpawn.objects[0].y, "dino-green");
        // this.player.callbackFunction(this.fireBalls);
        //stores enemies to load in here
        this.enemies = createEnemyGroups(this);

        createStartingObjects(this);
        //spawn enemies


        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(1.8);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        createCollision(this);
        //send the event 10 milliseconds after the scene starts so the ui can recieve it
        let setTime = Phaser.Time.TimerEvent;
        setTime = this.time.addEvent({
            delay: 10,
            callback: () => {
                sceneEvents.emit(eventNames.setAndStartTimer, this.timeLimit);
            }
        });
    }

    respawnEnemiesAfterDelay(){
        this.time.addEvent({
            delay: 5,
            callback: () => {
                respawnObjects(this)
            }
        })
    }

    update() {
        if (this.player) {
            this.player.managePlayerMovement();
            this.player.managePlayerAnimations();
            this.player.managePlayerAttacking();
        }
    }
}