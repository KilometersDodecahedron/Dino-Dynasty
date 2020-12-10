import React from "react";
import axios from "axios";
import Welcome from "../img-frontend/welcome.gif"
import { Link } from "react-router-dom";
import "../styles/login.css";


function Login() {
    function tryLoggingIn(data){
        if(
            data.userName.length > 0 && data.userName.length <= 30 &&
            data.password.length >= 8 && data.password.length <= 20
        ){
            axios.get("/api/users/")
            .then(response => {
                let foundMatchingUser = false;
                let activeUser;

                response.data.forEach(user => {
                    if(user.userName == data.userName && user.password == data.password){
                        foundMatchingUser = true;
                        activeUser = user;
                    }
                })

                if(foundMatchingUser){
                    localStorage.setItem("userID", activeUser._id);
                    document.location.href="/Game"
                }
            });
        }else{
            console.log("inva;id")
        }
    }

    function formatDataForCheck(e) {
        e.preventDefault();

        const userName = document.getElementById("email");
        const password = document.getElementById("password");

        const formattedData = {
            userName: userName.value,
            password: password.value
        }

        userName.value = "";
        password.value = "";

        tryLoggingIn(formattedData);
    }

    return (
        <div className="my-login-page" id="login" >
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="brand"><img src={Welcome}  alt="logo" />

                            </div>

                            <div className="card fat">
                                <div className="card-body">
                                    <h2 className="login-p">Login</h2>
                                    <form onSubmit={formatDataForCheck} className="my-login-validation" noValidate="">
                                        <div className="form-group">
                                            <label htmlFor="email">Username</label>
                                            <input id="email" type="text" className="form-control" name="email" required
                                                autoFocus />
                                            <div className="invalid-feedback">
                                                Email is invalid
                                                </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password
                                     
                                            </label>
                                            <input id="password" type="password" className="form-control" name="password" required
                                                data-eye />
                                            <div className="invalid-feedback">
                                                Password is required
                                    </div>
                                        </div>

                                        {/* <div className="form-group">
                                            <div className="custom-checkbox custom-control">

                                            </div>
                                        </div> */}

                                        <div className="form-group m-0">
                                            <button className="btn btn-dark btn-block">
                                                Login 
                                    </button>
                                        </div>
                                        <div className="mt-4 text-center">
                                          <Link to="/Account"> Don't have an account? </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-footer" id="login-footer">
                                Copyright &copy; 2020 &mdash; DG Universe
                    </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Login;