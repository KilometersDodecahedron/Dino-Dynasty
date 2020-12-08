import FollowingZombieEnemy from "./followingZombieEnemies.js";

export default class Skeleton extends FollowingZombieEnemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        this.health = 10;
        this.damage = 1;
        this.speed = 60;
        this.knockBack = 300;

        //what range is needed to start chasing the player
        //NOTE: unlike ghost enemies, they won't stop until there's a wall between them and the player
        this.aquisitionRange = 150;
        //how often they check the player's position
        this.playerCheckInterval = 200;
        //this enemy is designed for jerky movement, randomly starting and stopping
        //it stops at different rates when chasing or not chasing the player
        this.randomMoveStopDuration = 250;
        this.chasingPlayerStopDuration = 150;
        //speed is multiplied by this number while shasing player
        this.chaseSpeedBonus = 1.2
        //how long each move lasts
        this.movementDuration = 200;
        this.pointValue = 15;
        this.descendantStartMethod();
    }

    //time = time sinces start, deltaTime = time since last frame update
    //deltaTime is used to make sure game speeds don't change based on faster/slower computers
    preUpdate(time, deltaTime){
        super.preUpdate(time, deltaTime);

        //moves based on directionTracker parent class property
        this.manageMovement("skelet-idle", "skelet-run");  
    }
}