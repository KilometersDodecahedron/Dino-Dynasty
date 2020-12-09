import React from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Create from "../img-frontend/Create.gif"
import "../styles/account.css";

function Account() {
    function tryCreateAccount(data){
        console.log(data);
        if(
            data.userName.length > 0 && data.userName.length <= 30 &&
            data.password.length >= 8 && data.userName.length <= 20 &&
            data.gamerTag.length >= 3 && data.gamerTag.length <= 6
        ){
            console.log("This is Valid")
        }else{
            console.log("this is invalid")
        }
        axios.get("/api/users/")
            .then(response => {
                console.log(response.data)
                response.data.forEach(user => {
                    console.log(user)
                })
            })
    }

    function formatDataForCheck(e) {
        e.preventDefault();

        const userName = document.getElementById("name");
        const gamerTag = document.getElementById("gamerTag");
        const password = document.getElementById("password");

        const formattedData = {
            userName: userName.value,
            password: password.value,
            gamerTag: gamerTag.value
        }

        userName.value = "";
        password.value = "";
        gamerTag.value = "";

        tryCreateAccount(formattedData);
    }

    return (
        <section className="h-100" id="account">
            <div className="container h-100">
                <div className="row justify-content-md-center h-100">
                    <div className="card-wrapper">
                        <div className="brand"><img src={Create} alt="Join the Force" />
                        </div>
                        <div className="card fat">
                            <div className="card-body" id="join">
                                <h4 className="card-title">Join the Force</h4>
                                <form onSubmit={formatDataForCheck} className="my-login-validation" noValidate="">
                                    <div className="form-group">
                                        <label htmlFor="name">Username</label>
                                        <input id="name" type="text" className="form-control" name="name" required autoFocus />
                                        <div className="invalid-feedback">
                                            What's your name?
                                    </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="gamerTag">Gamer Tag (3-6 Characters)</label>
                                        <input id="gamerTag" type="gamerTag" className="form-control" name="gamerTag" required />
                                        <div className="invalid-feedback">
                                            Your Tag is invalid
                                    </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input id="password" type="password" className="form-control" name="password" required
                                            data-eye />
                                        <div className="invalid-feedback">
                                            Password is required
                                    </div>
                                    </div>
                                    <div className="form-group m-0">
                                        <button className="btn btn-primary btn-block">
                                            Register
                                    </button>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <Link to="/">Already have an account? </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card-footer" id="account-footer">
                            Copyright &copy; 2020 &mdash; DG Universe
                    </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default Account;