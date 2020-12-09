import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/header.css";
import "../styles/footer.css";

const Platformer = (props) => {
    const [cheatState, setCheatState] = useState(1);

    let script;
    let holder;

    useEffect(() => {
        script = document.createElement('script');

        script.src = "/platformer/assets/js/MainGame.js";
        script.type = "module"
        script.async = true;
        script.cheatState = cheatState;

        document.body.appendChild(script);
        console.log(document.body)
        console.log(script)

        // holder = document.createElement("div");

        // holder.id = "mygame";

        return () => {
            script.remove();
            // holder.remove();
            console.log("goodbye")
            setCheatState(cheatState * -1);
            window.location.reload();

        }
    }, [])

    console.log(props.value)

    return (

        <div className="dyno">
            <Header> </Header>
            <div id="mygame"></div>
            <Footer></Footer>
        </div>
    )
}

export default Platformer;