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
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/phaser-raycaster@0.9.0/dist/phaser-raycaster.min.js"></script>
            <div id="mygame"></div>
        </div>
    )
}

export default RogueBlitz;