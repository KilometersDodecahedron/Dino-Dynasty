import { sceneEvents, eventNames } from "../events/events.js"

import { createPlayerAnims } from "../anims/playerAnims.js";
import { createEnemyAnims } from "../anims/enemyAnims.js"

//this grants the this.add.player function
import "../player/PlayerClass.js"

import FireBall from "../player/FireBall.js";

import { createEnemyGroups } from "../enemies/EnemyGroupHolder.js"
import { createColorPickups } from "../collectables/ColorPickupHolder.js"

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
        this.worldBoundsX = 3840;
        this.worldBoundsY = 320;

        //stores bluePickup, redPickup, yellowPickup
        //set with createColorPickups
        this.colorPickups;

        //enemy groups are stored here as object properties
        this.enemies;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(){
        createPlayerAnims(this.anims);
        createEnemyAnims(this.anims);

        this.genericParticles = this.add.particles("particles");
        
        //set the boundaries of the world, to make them different from the canvas
        this.physics.world.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY, true, true, true, true)
        
        const map = this.make.tilemap({key: "level1"})
        //assets from preloader
        const grassTileset = map.addTilesetImage("grass", "grass")
        const platformLongTileset = map.addTilesetImage("platform-long", "platform-long")
        const blockGoldTileset = map.addTilesetImage("small-platformGOLD", "small-platformGOLD")
        const blockTileset = map.addTilesetImage("block", "block")
        const blockBigTileset = map.addTilesetImage("block-big", "block-big")
        const treeTileset = map.addTilesetImage("tree", "tree")
        const backgroundTileset = map.addTilesetImage("background", "background")

        //creates background
        map.createStaticLayer('Background', backgroundTileset)

        //creates ground and platforms
        console.log(grassTileset);
        this.staticGround.push(map.createDynamicLayer("Ground", grassTileset))
        this.staticGround.push(map.createDynamicLayer("PlatformLong", platformLongTileset))
        this.staticGround.push(map.createDynamicLayer("BlockGold", blockGoldTileset))
        this.staticGround.push(map.createDynamicLayer("Block", blockTileset))
        this.staticGround.push(map.createDynamicLayer("BigBlock", blockBigTileset))
        this.staticGround.push(map.createDynamicLayer("Tree", treeTileset))

        //sets collision
        this.staticGround.forEach(ground => {
            ground.setCollisionByProperty({ground: true})
        })
        

        this.fireBalls = this.physics.add.group({
            classType: FireBall,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        })

        this.player = this.add.player(this.scene, 100, 200, "dino-green");
        this.player.callbackFunction(this.fireBalls);

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        //stores enemies to load in here
        this.enemies = createEnemyGroups(this);
        //store color pickups here
        this.colorPickups = createColorPickups(this);

        this.colorPickups.bluePickup.get(150, 450, "Pickup")

        this.colorPickups.yellowPickup.get(250, 450, "Pickup")

        this.colorPickups.redPickup.get(350, 450, "Pickup")

        //spawn enemies
        this.enemies.batsHorizontal.get(150, 425, "bat-1")
        this.enemies.batsVertical.get(300, 435, "bat-1")
        this.enemies.batsSedentary.get(250, 425, "bat-1")
        //this.enemies.humpback.get(200, 300, "humpback")
        this.enemies.triclops.get(790, 450, "triclops")
        this.enemies.bigmouth.get(550, 250, "bigmouth")
        this.enemies.mustache.get(300, 450, "mustache")

        this.enemies.weapons.cowSkull.get(250, 425, "cow-skull")

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);
        
        //TODO store this in a different script
        this.staticGround.forEach(ground => {
            this.physics.add.collider(ground, this.player)
            this.physics.add.collider(ground, this.fireBalls, this.handleProjectileWallCollision, undefined, this)

            //have enemies collide with the ground
            this.enemies.solidEnemies.forEach(enemy => {
                this.physics.add.collider(ground, enemy)
            });
        })

        //collectables
        this.colorPickups.colorPickupsArray.forEach(pickup => {
            this.physics.add.overlap(pickup, this.player, this.handleColorChangePickup, undefined, this)
        });

        this.enemies.collisionArray.forEach(enemy => {
            //enemies and player
            this.physics.add.overlap(this.player, enemy, this.handleEnemyPlayerCollision, undefined, this)
            //enemies and fireball
            this.physics.add.overlap(this.fireBalls, enemy, this.handleProjectileEnemyCollision, undefined, this)
        })

        //enemy projectiles
        this.enemies.collisionProjectilesArray.forEach(projectile => {
            this.physics.add.overlap(this.player, projectile, this.handlePlayerProjectileCollisions, undefined, this)
        })
    }

    update(){
        if(this.player){
            this.player.managePlayerMovement();
            this.player.managePlayerAnimations();
            this.player.managePlayerAttacking();
        }
    }

    handleProjectileWallCollision(projectile, wall){
        projectile.destroy();
    }

    handleProjectileEnemyCollision(projectile, enemy){
        projectile.destroy();
        enemy.takeFireballDamage();
    }

    handleColorChangePickup(player, color){
        player.changeColor(color.color);
        color.collect();
    }

    handleEnemyPlayerCollision(player, enemy){
        //jump on enemy
        if(enemy.body.touching.up && player.body.touching.down && !player.inTakenDamageState){
            player.jumpOffEnemy();
            player.hasDoubleJumped = false;
            enemy.takeDamageJump();
        }
        //take damage from enemy
        else{
            enemy.collidedWithEnemyFunction(player);
            player.takeDamage();
        }
    }

    handlePlayerHazardCollision(player, hazard){
        player.takeDamage();
    }

    handlePlayerProjectileCollisions(player, projectile){
        player.takeDamage();
        projectile.destroyProjectile();
    }
}