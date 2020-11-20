import { createPlayerAnims } from "../anims/playerAnims.js";
import { createEnemyAnims } from "../anims/enemyAnims.js"

//this grants the this.add.player function
import "../player/PlayerClass.js"

import FireBall from "../player/FireBall.js"

import BluePickup from "../collectables/BlueColorPickup.js"
import RedPickup from "../collectables/RedColorPickup.js"
import YellowPickup from "../collectables/YellowColorPickup.js"

import BatEnemy from "../enemies/BatEnemy.js"
import { createEnemyGroups } from "../enemies/EnemyGroupHolder.js"

export default class Game extends Phaser.Scene {
    constructor() {
        super("game");
        //the player
        this.player;
        this.cursors;
        this.fireBalls;
        this.genericParticles;
        //the ground layer that doesn't move
        this.staticGround;
        this.worldBoundsX = 800;
        this.worldBoundsY = 560;

        this.bluePickup;
        this.redPickup;
        this.yellowPickup;

        //both of these are set in EnemyGroupHolder.js
        //store enemy groups here, loop through it for collisions
        this.enemyGroupsArray = [];
        //used to make enemies collide with the group. set from EnemyGroupHolder.js
        this.solidEnemies = [];

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
        
        const map = this.make.tilemap({key: "practice-level"})
        //"Sand tiles" comes from the json file
        const tileset = map.addTilesetImage("Sand tiles", "sand-tiles")
        
        this.staticGround = map.createDynamicLayer("Ground", tileset)
        this.staticGround.setCollisionByProperty({ground: true})

        this.fireBalls = this.physics.add.group({
            classType: FireBall,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        })

        this.player = this.add.player(this.scene, 100, 400, "dino-blue");
        this.player.callbackFunction(this.fireBalls);

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        //stores enemies to load in here
        this.enemies = createEnemyGroups(this);

        this.bluePickup = this.physics.add.group({
            classType: BluePickup,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        });

        this.bluePickup.get(150, 450, "Pickup")

        this.yellowPickup = this.physics.add.group({
            classType: YellowPickup,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        });

        this.yellowPickup.get(250, 450, "Pickup")

        this.redPickup = this.physics.add.group({
            classType: RedPickup,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        });

        this.redPickup.get(350, 450, "Pickup")

        this.enemies.batsHorizontal.get(150, 425, "bat-1")
        this.enemies.batsVertical.get(300, 435, "bat-1")
        this.enemies.humpback.get(200, 300, "humpback")
        this.enemies.triclops.get(240, 450, "triclops")

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);
        
        //TODO store this in a different script
        this.physics.add.collider(this.staticGround, this.player)
        this.physics.add.collider(this.staticGround, this.fireBalls, this.handleProjectileWallCollision, undefined, this)

        //have enemies collide with the ground
        this.solidEnemies.forEach(enemy => {
            this.physics.add.collider(this.staticGround, enemy)
        });

        //collectables
        this.physics.add.overlap(this.bluePickup, this.player, this.handleColorChangePickup, undefined, this)
        this.physics.add.overlap(this.yellowPickup, this.player, this.handleColorChangePickup, undefined, this)
        this.physics.add.overlap(this.redPickup, this.player, this.handleColorChangePickup, undefined, this)

        this.enemyGroupsArray.forEach(enemy => {
            //enemies and player
            this.physics.add.overlap(this.player, enemy, this.handleEnemyPlayerCollision, undefined, this)
            //enemies and fireball
            this.physics.add.overlap(this.fireBalls, enemy, this.handleProjectileEnemyCollision, undefined, this)
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
}