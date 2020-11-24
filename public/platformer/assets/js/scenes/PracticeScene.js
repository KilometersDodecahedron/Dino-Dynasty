import { sceneEvents, eventNames } from "../events/events.js"

import { createPlayerAnims } from "../anims/playerAnims.js";
import { createEnemyAnims } from "../anims/enemyAnims.js"

//this grants the this.add.player function
import "../player/PlayerClass.js"

import FireBall from "../player/FireBall.js";

import { createEnemyGroups } from "../enemies/EnemyGroupHolder.js"
import { createColorPickups } from "../collectables/ColorPickupHolder.js"
import { createBlockGroups } from "../platforms/BlocksGroupHolder.js"

import { createCollisionEffects } from "../utils/CollisionEffectsHolder.js"
import { createCollision } from "../utils/CollisionHolder.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
        //the player
        this.player;
        this.cursors;
        this.fireBalls;
        this.genericParticles;
        //the ground layer that doesn't move
        this.staticGround = [];
        this.worldBoundsX = 800;
        this.worldBoundsY = 560;

        //stores bluePickup, redPickup, yellowPickup
        //set with createColorPickups
        this.colorPickups;

        //enemy groups are stored here as object properties
        this.enemies;

        //store the destroyable blocks, set from createBlockGroups
        this.blocks;

        this.collisionEffects;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(){
        createPlayerAnims(this.anims);
        createEnemyAnims(this.anims);

        //what to do when object collide is stored here
        this.collisionEffects = createCollisionEffects();

        this.genericParticles = this.add.particles("particles");
        
        //set the boundaries of the world, to make them different from the canvas
        this.physics.world.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY, true, true, true, true)
        
        const map = this.make.tilemap({key: "practice-level"})
        //"Sand tiles" comes from the json file
        const tileset = map.addTilesetImage("Sand tiles", "sand-tiles")
        
        this.staticGround.push(map.createDynamicLayer("Ground", tileset)); 
        
        this.staticGround.forEach(ground => {
            ground.setCollisionByProperty({ground: true})
        })

        this.fireBalls = this.physics.add.group({
            classType: FireBall,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        })

        this.player = this.add.player(this.scene, 100, 400, "dino-green");
        this.player.callbackFunction(this.fireBalls);

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        //stores enemies to load in here
        this.enemies = createEnemyGroups(this);
        //store color pickups here
        this.colorPickups = createColorPickups(this);
        this.blocks = createBlockGroups(this);

        this.colorPickups.bluePickup.get(150, 450, "Pickup")

        this.colorPickups.yellowPickup.get(250, 450, "Pickup")

        this.colorPickups.redPickup.get(350, 450, "Pickup")

        //spawn enemies
        this.enemies.batsHorizontal.get(150, 425, "bat-1")
        //this.enemies.batsVertical.get(300, 435, "bat-1")
        this.enemies.batsSedentary.get(250, 425, "bat-1")
        //this.enemies.humpback.get(300, 300, "humpback")
        // this.enemies.triclops.get(790, 450, "triclops")
        // this.enemies.bigmouth.get(300, 250, "bigmouth")
        //this.enemies.mustache.get(300, 400, "mustache")
        this.blocks.floatingBlocks.get(300, 420, "block")
        this.blocks.floatingBlocks.get(230, 475, "block")

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        createCollision(this);
    }

    update(){
        if(this.player){
            this.player.managePlayerMovement();
            this.player.managePlayerAnimations();
            this.player.managePlayerAttacking();
        }
    }
}