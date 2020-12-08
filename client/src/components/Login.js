import React from "react";
import Welcome from "../img-frontend/welcome.gif"
import { Link } from "react-router-dom";
import "../styles/login.css";


function Login() {
    return (
        <div className="my-login-page" >
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center h-100">
                        <div className="card-wrapper">
                            <div className="brand"><img src={Welcome} alt="logo" />

                            </div>

                            <div className="card fat">
                                <div className="card-body">
                                    <h4 className="card-title">Login</h4>
                                    <form method="POST" className="my-login-validation" noValidate="">
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
                                            <button className="btn btn-primary btn-block">
                                                Login
                                    </button>
                                        </div>
                                        <div className="mt-4 text-center">
                                          <Link to="/Account"> Don't have an account? </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="card-footer">
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