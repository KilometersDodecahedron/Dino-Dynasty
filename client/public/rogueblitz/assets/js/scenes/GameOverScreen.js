export default class GameOverScreen extends Phaser.Scene {
    constructor() {
        super("gameOverScreen");
        this.Menubackground;
        this.playAgainButton;
        this.score;
        this.highScoreArray;

        this.textConfig = {fontSize:'50px',color:'#ff0000',fontFamily: 'Arial'};
        this.buttonTextConfig = {fontSize:'40px',color:'#000000',fontFamily: 'Arial'};
    }

    init(data){
        this.score = data.score;
        this.highScoreArray = data.highScoreArray;

        this.highScoreArray.sort(function(a, b) {
            return b.rogueScore - a.rogueScore;
        });
    }

    create(){
        //background image
        this.Menubackground = this.add.image( 400, 280, "Menubackground");
        this.Menubackground.setScale(1.25,1.7)

        this.checkIfNewHighScore();

        const gameOverText = this.add.text(400, 50, "Game Over", this.textConfig).setOrigin(0.5);
        const finalScoreText = this.add.text(400, 150, "Final Score", this.textConfig).setOrigin(0.5);
        const scoreDisplay = this.add.text(400, 230, this.score, this.textConfig).setOrigin(0.5);

        this.playAgainButton = this.add.rectangle(400, 450, 320, 100, 0xff0000).setOrigin(0.5);
        const playAginText = this.add.text(400, 450, "Main Menu", this.buttonTextConfig).setOrigin(0.5);

        this.playAgainButton.setInteractive();

        this.playAgainButton.on('pointerdown', () => {
            this.scene.start("menu"); 
        });
    }

    checkIfNewHighScore(){
        var userID = localStorage.getItem("userID");

        if(userID == null){
            userID = "5fcbc3a5c88a4023c43e1b61";
        }

        var newHighScore = false;
        let newScoreObject = {rogueScore: this.score};

        

        //check against personal best
        $.ajax("/api/users/" + userID, {
            type: "GET",
            context: this
        }).then(function(user){
            if(this.score > user[0].rogueScore){
                $.ajax("/api/users/" + userID, {
                    type: "PUT",
                    data: newScoreObject,
                    context: this
                }).then(function(){
                    const newHighScoreText = this.add.text(400, 280, "New Personal Best!", this.textConfig).setOrigin(0.5);
                    for(let i = 0; i < this.highScoreArray.length && i < 10; i++){
                        if(this.score > this.highScoreArray[i].rogueScore){
                            const newHighScoreText = this.add.text(400, 350, "New High Score!", this.textConfig).setOrigin(0.5);
                            break;
                        }else{
                            console.log(this.highScoreArray[i].rogueScore)
                        }
                    }
                });

                //update score array
                $.ajax("/api/scores/method/" + userID, {
                    type: "PUT",
                    data: newScoreObject,
                    context: this
                }).then(function(){
                    // const newHighScoreText = this.add.text(400, 350, "New Personal Best!", this.textConfig).setOrigin(0.5);
                });

                
            }
        });

        //if there's a new high score, save it to the database
        
    }
}
