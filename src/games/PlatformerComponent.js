import React, {useEffect} from "react";

const Platformer = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "./platformer/assets/js/MainGame.js";
        script.type = "module"
        script.async = true;

        document.body.appendChild(script);
    }, [])

    return(
        <div>
            <div id="mygame"></div>
        </div>
    )
}

export default Platformer;