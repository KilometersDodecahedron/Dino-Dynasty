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
        this.timeLimit = 300;

        //key of level to load when they reach the goal post
        this.nextLevelKey = "dungeon"

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

        this.collisionEffects;
    }

    preload() {
        //set the arrow keys and space bar to the cursor
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(){
        this.scene.run("game-ui");
        createPlayerAnims(this.anims);
        createEnemyAnims(this.anims);
        createCollectableAnims(this.anims);

        //what to do when object collide is stored here
        this.collisionEffects = createCollisionEffects();

        this.genericParticles = this.add.particles("particles");
        
        //set the boundaries of the world, to make them different from the canvas
        this.physics.world.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY, true, true, true, true)
        
        const map = this.make.tilemap({key: "practice-level"})
        //"Sand tiles" comes from the json file
        const tileset = map.addTilesetImage("Sand tiles", "sand-tiles")
        
        this.staticGround = [map.createDynamicLayer("Ground", tileset)]; 
        
        this.staticGround.forEach(ground => {
            ground.setCollisionByProperty({ground: true})
        })

        this.fireBalls = this.physics.add.group({
            classType: FireBall,
            createCallback: (gameObject) => {
                gameObject.callbackFunction();
            }
        })

        //store interatables here
        this.interactables = createInteractableGroups(this);
        this.interactables.checkpoints.get(300, 450, "checkpoint-flag-white")

        this,this.interactables.goalPost.get(270, 450, "goal-post")

        this.collectables = createCollectablesGroups(this);
        this.collectables.coins.coinOne.get(170, 460, "coin-one")
        this.collectables.coins.coinOne.get(200, 430, "coin-one")
        this.collectables.coins.coinOne.get(220, 430, "coin-one")
        this.collectables.coins.coinOne.get(200, 450, "coin-one")
        this.collectables.coins.coinOne.get(220, 450, "coin-one")
        this.collectables.coins.coinFive.get(240, 400, "coin-five")
        this.collectables.coins.coinTen.get(300, 430, "coin-ten")
        this.collectables.coins.coinTen.get(300, 350, "coin-ten")
        this.collectables.coins.coinTen.get(340, 430, "coin-ten")
        this.collectables.coins.coinTen.get(380, 430, "coin-ten")
        this.collectables.coins.coinTen.get(500, 380, "coin-ten")
        this.collectables.coins.coinTen.get(450, 330, "coin-ten")
        this.collectables.coins.coinTen.get(500, 300, "coin-ten")
        this.collectables.coins.coinTen.get(150, 450, "coin-ten")
        this.collectables.coins.coinTen.get(150, 410, "coin-ten")
        this.collectables.coins.coinTen.get(150, 370, "coin-ten")
        

        this.player = this.add.player(this.scene, 100, 400, "dino-green");
        this.player.callbackFunction(this.fireBalls);

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        //stores enemies to load in here
        this.enemies = createEnemyGroups(this);

        this.enemies.hazards.groundHazard.get(150, 400, "spikes")
        this.enemies.hazards.groundHazard.get(166, 400, "spikes")

        this.enemies.hazards.ceilingHazard.get(180, 400, "spikes")

        const lava = this.enemies.hazards.createLavaBlocks(464, 320, 10, this);

        //store color pickups here
        this.colorPickups = createColorPickups(this);

        this.colorPickups.bluePickup.get(150, 450, "Pickup")

        this.colorPickups.yellowPickup.get(250, 450, "Pickup")

        this.colorPickups.redPickup.get(350, 450, "Pickup")

        //spawn enemies
        this.enemies.batsHorizontal.get(150, 425, "bat-1")
        //this.enemies.batsVertical.get(300, 435, "bat-1")
        this.enemies.batsSedentary.get(250, 425, "bat-1")
        //this.enemies.humpback.get(300, 300, "humpback")
        this.enemies.triclops.get(790, 450, "triclops")
        this.enemies.bigmouth.get(300, 250, "bigmouth")
        //this.enemies.mustache.get(300, 400, "mustache")

        this.cameras.main.startFollow(this.player)
        this.cameras.main.setZoom(2.5);
        this.cameras.main.setBounds(0, 0, this.worldBoundsX, this.worldBoundsY);

        createCollision(this);

        sceneEvents.on(eventNames.gameOver, this.gameOver, this)
        sceneEvents.on(eventNames.loadWinScreen, this.winGame, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            sceneEvents.off(eventNames.gameOver, this.gameOver, this);
            sceneEvents.off(eventNames.loadWinScreen, this.winGame, this);
        });

        //send the event 10 milliseconds after the scene starts so the ui can recieve it
        let setTime = Phaser.Time.TimerEvent;
        setTime = this.time.addEvent({
            delay: 10,
            callback: () => {
                sceneEvents.emit(eventNames.setAndStartTimer, this.timeLimit);
            }
        });
    }

    update(){
        if(this.player){
            this.player.managePlayerMovement();
            this.player.managePlayerAnimations();
            this.player.managePlayerAttacking();
        }
    }

    //called by event
    gameOver(score){
        //sceneEvents.destroy();
        $.ajax({
            url: "/api/scores/dino",
            type: "GET",
            //set the "success" to fun in this context, to get the next scene
            context: this,
            success: function(highScoreArray) {
                this.scene.stop("game-ui");
                this.scene.start("gameOverScreen", {
                    score: score,
                    highScoreArray: highScoreArray
                });
            }
        }); 
    }

    winGame(scoreAndLives){
        $.ajax({
            url: "/api/scores/dino",
            type: "GET",
            //set the "success" to fun in this context, to get the next scene
            context: this,
            success: function(highScoreArray) {
                this.scene.stop("game-ui");
                
                this.scene.start("winScreen", {
                    score: scoreAndLives.score,
                    lives: scoreAndLives.lives,
                    bonusMultiplier: scoreAndLives.bonusMultiplier,
                    highScoreArray: highScoreArray
                });
            }
        }); 
    }
}