import React, {useEffect} from "react";

const RogueBlitz = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "./rogueblitz/assets/js/mainGame.js";
        script.type = "module"
        script.async = true;

        document.body.appendChild(script);
    }, [])

    return(
        <div>
            <header>
                <div className="jumbotron text-center">
                    <div className="col-lg-6 col-md-6 col-sm-8 col-xs-8 offset-xs-3 float-md-center"></div>
                    <div className="page-header">
                        <h1>RogueBlitz</h1>
                    </div>
                </div>
            </header>

            <summary>
                <div className="container-lg">
                <div className="card-body text-muted">
                    <h3>
                        <center> <strong> Your Journey Awaits! </strong> </center>
                    </h3>
                    <p>
                        In a dungeon full of creatures, living breeds from other dimensions that slumber throughout the
                        underworld have woken from a mysterious encounter. The main player of this story is branded as
                        a dishonored warrior and has been sent to the underworld by fate and walked the path of being a rogue.
                        This gives players the opportunity to play a game that has no chance for life; tho a chance for glory!
                    </p>
                </div>
                </div>

            </summary>

            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/phaser-raycaster@0.9.0/dist/phaser-raycaster.min.js"></script>
            <div id="mygame"></div>
            
            <footer>
                <p>
                    Developed by: Troy Berentsen, Miles Cohn, Christopher Crook, and Carlos Benitez
                    <br />
                    &copy; 2020 🐱‍🏍🖱💻
                    
                </p>
            </footer>
        </div>
    )
}

export default RogueBlitz;