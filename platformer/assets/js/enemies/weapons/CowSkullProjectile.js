import EnemyProjectile from "./enemyProjectile.js";

export default class CowSkullProjectile extends EnemyProjectile{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);
    }

    setTrajectory(xVelocity, yVelocity, flipX){
        //set from the caveman who throws it
        if(flipX){
            xVelocity = -xVelocity;
        }
        this.setVelocity(xVelocity, yVelocity)
        this.flipX = !flipX;
    }
}