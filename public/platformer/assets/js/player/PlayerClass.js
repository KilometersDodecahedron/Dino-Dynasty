import { sceneEvents, eventNames } from "../events/events.js"

export default class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        this.isDead = false;

        this.playerWalkSpeed = 100;
        this.playerJumpHeight = -230;
        this.playerRunSpeed = 150;
        this.hitKnockback = 100;
        this.onBlock = false;

        this.hasDoubleJumped = false;
        this.playerDoubleJumpHeight = -175;

        this.fireBalls;
        this.fireBallTimer = 0;

        //swap between green, blue, red, and yellow
        this.currentColor = "blue"

        this.respawnPositionX = 0;
        this.respawnPositionY = 0;

        //how long to wait after dying before respawning
        this.respawnDelay = 3000;


        this.damageStateDuration = 500;
        this.currentDamageStateDuration = 0;
        this.inTakenDamageState = false;

        this.invulnerableAfterHitDuration = 2000;
        this.currentInvulnerableAfterHitDuration = 0;
        this.isInvulnerable = false;
    }

    callbackFunction(fireball){
        this.setFireballs(fireball);
        this.setRespawnPosition(this.x, this.y);
        //TODO remove this
        // $.ajax({
        //     url: "/api/users/",
        //     type: "GET",
        //     //set the "success" to fun in this context, to get the next scene
        //     context: this,
        //     success: function(highScoreArray) {
        //         console.log(highScoreArray);
        //     }
        // })
    }

    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        // if(this.onBlock){
        //     this.onBlock = false;
        // }
        
        if(this.fireBallTimer > 0){
            this.fireBallTimer -= deltaTime;
        }

        if(this.inTakenDamageState){
            this.currentDamageStateDuration += deltaTime;
            if(this.currentDamageStateDuration >= this.damageStateDuration){
                this.inTakenDamageState = false;
            }
        }

        if(this.isInvulnerable){
            this.currentInvulnerableAfterHitDuration += deltaTime;
            if(this.currentInvulnerableAfterHitDuration >= this.invulnerableAfterHitDuration){
                this.isInvulnerable = false;
            }
        }
    }

    instaKill(){
        this.changeColor("green")
        this.playerDied();
    }

    changeColor(newColor){
        this.currentColor = newColor;
        sceneEvents.emit(eventNames.colorChanged, newColor, this);
    }

    //run at start, and when hitting check point
    setRespawnPosition(x, y){
        this.respawnPositionX = x;
        this.respawnPositionY = y;
    }

    takeDamage(){
        if(this.isDead || this.isInvulnerable){
            return;
        }

        if(this.currentColor != "green"){
            this.changeColor("green")
            this.anims.play(`dino-${this.currentColor}-hurt`, true)
            this.currentInvulnerableAfterHitDuration = 0;
            this.isInvulnerable = true;
            this.currentDamageStateDuration = 0;
            this.inTakenDamageState = true;

            if(this.body.touching.right){
                this.setVelocity(-this.hitKnockback, 0)
            }else if(this.body.touching.left){
                this.setVelocity(this.hitKnockback, 0)
            }else{
                this.setVelocity(0, 0)
            }
        }
        //dies if hit without a powerup
        else{
            this.playerDied();
        }
    }

    playerDied(){
        this.isDead = true;
        this.body.setEnable(false)
        sceneEvents.emit(eventNames.playerDied);
        this.alpha = 0;

        //respawn after a delay
        this.scene.time.addEvent({
            delay: this.respawnDelay,
            callback: this.respawnAtCheckpoint
        })
    }

    respawnAtCheckpoint = () =>{
        this.isDead = false;
        this.body.setEnable(true);
        this.setVelocity(0, 0);
        this.alpha = 1;
        this.setPosition(this.respawnPositionX, this.respawnPositionY)
    }

    managePlayerMovement(){
        if(this.isDead || this.inTakenDamageState){
            return;
        }

        if(this.scene.cursors.left.isDown){
            //check if running or walking
            if(this.body.blocked.down && this.scene.cursors.space.isDown && this.currentColor === "yellow" ||
            this.onBlock && this.scene.cursors.space.isDown && this.currentColor === "yellow"){
                this.setVelocityX(-this.playerRunSpeed);
            }else{
                this.setVelocityX(-this.playerWalkSpeed);
            }
        }
        else if(this.scene.cursors.right.isDown){
            //check if running or walking
            if(this.body.blocked.down && this.scene.cursors.space.isDown && this.currentColor === "yellow" || 
            this.onBlock && this.scene.cursors.space.isDown && this.currentColor === "yellow"){
                this.setVelocityX(this.playerRunSpeed);
            }else{
                this.setVelocityX(this.playerWalkSpeed);
            }
        }else{
            this.setVelocityX(0);
        }

        //jump
        if(this.scene.cursors.up.isDown && this.body.blocked.down ||
            this.scene.cursors.up.isDown && this.onBlock){
            this.jump();
        }

        //manage double jump if blue
        if(this.currentColor === "blue"){
            if(this.body.blocked.down || this.onBlock){
                this.hasDoubleJumped = false;
            }
            //keep from double jumping on the ground or before descending
            else if(!this.hasDoubleJumped && this.body.velocity.y > 0 && Phaser.Input.Keyboard.JustDown(this.scene.cursors.space)){
                this.hasDoubleJumped = true;
                this.setVelocityY(this.playerDoubleJumpHeight);
            }
        }

        //end jump early if key is released
        if(Phaser.Input.Keyboard.JustUp(this.scene.cursors.up) && this.body.velocity.y < 0){
            this.setVelocityY(0);
        }
    }

    jumpOffEnemy(){
        //only jump full height if the up key is held
        if(this.scene.cursors.up.isDown){
            this.jump()
        }else{
            this.setVelocityY(-120)
        }
    }

    jump(){
        this.setVelocityY(this.playerJumpHeight);
    }

    managePlayerAttacking(){
        if(this.isDead || this.inTakenDamageState){
            return;
        }

        if(this.currentColor === "red" && Phaser.Input.Keyboard.JustDown(this.scene.cursors.space) && this.fireBallTimer <= 0){
            this.shootFireball()
        }
    }

    shootFireball(){
        const fireBall = this.fireBalls.get(this.x, this.y, "fire-ball")
        this.fireBallTimer = fireBall.duration;
    }

    managePlayerAnimations(){
        if(this.isDead || this.inTakenDamageState){
            return;
        }

        if(this.body.blocked.down || this.onBlock){
            if(this.scene.cursors.left.isDown){
                this.flipX = true;
                //check if running or walking
                if(this.scene.cursors.space.isDown && this.currentColor === "yellow"){
                    this.anims.play(`dino-${this.currentColor}-run`, true);
                }else{
                    this.anims.play(`dino-${this.currentColor}-walk`, true);
                }
            }
            else if(this.scene.cursors.right.isDown){
                this.flipX = false;
                //check if running or walking
                if(this.scene.cursors.space.isDown && this.currentColor === "yellow"){
                    this.anims.play(`dino-${this.currentColor}-run`, true);
                }else{
                    this.anims.play(`dino-${this.currentColor}-walk`, true);
                }
            }else{
                this.anims.play(`dino-${this.currentColor}-idle`, true);
            }
        }
        //player in air
        else{
            if(this.scene.cursors.left.isDown){
                this.flipX = true;
            }else if(this.scene.cursors.right.isDown){
                this.flipX = false;
            }

            if(this.body.velocity.y < 0){
                this.anims.play(`dino-${this.currentColor}-jump-up`, true);
            }else{
                this.anims.play(`dino-${this.currentColor}-jump-down`, true);
            }
        }
    }

    //run after calling the player, so be sure to set the fireballs first
    setFireballs(fireball){
        this.fireBalls = fireball;
    }    
}


//can now create this object with the this.add method
Phaser.GameObjects.GameObjectFactory.register("player", function (phaser, x, y, texture, frame){
    var player = new Player(phaser.scene, x, y, texture, frame);

    this.displayList.add(player);
    this.updateList.add(player);

    this.scene.physics.world.enableBody(player, Phaser.Physics.Arcade.DYNAMIC_BODY);

    //set their collider properly
    player.body.setSize(14, 17).setOffset(4, 4);
    player.setCollideWorldBounds(true);

    return player;
});