import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Platformer = () => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = "/platformer/assets/js/MainGame.js";
        script.type = "module"
        script.async = true;

        document.body.appendChild(script);
    }, [])

    return (

        <div>
            <Header> </Header>
            <div id="mygame"></div>
            <Footer></Footer>
        </div>
    )
}

export default Platformer;