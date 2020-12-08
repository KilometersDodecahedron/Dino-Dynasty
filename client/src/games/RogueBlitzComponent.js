import React, { useEffect } from "react";
import HeaderR from "../components/HeaderR";
import Footer from "../components/Footer";

const RogueBlitz = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "/rogueblitz/assets/js/mainGame.js";
        script.type = "module"
        script.async = true;

        document.body.appendChild(script);
    }, [])

    return (
        <div>

            <HeaderR> </HeaderR>
            <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/phaser-raycaster@0.9.0/dist/phaser-raycaster.min.js"></script>
            <div id="roguegame"></div>
            <Footer> </Footer>
        </div>
    )
}

export default RogueBlitz;