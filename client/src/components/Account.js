import React from 'react';
import "../img-frontend/Create.gif"
import "../styles/account.css";

function Account() {
    return (
        <div className="my-login-page">
            <section className="h-100" />
            <div className="container h-100" />
            <div className="row justify-content-md-center h-100" />
            <div className="card-wrapper" />
            <div className="brand" />
            <div className="brand"><img src={Create} alt="Join Us" />

            </div>
            <div className="card fat" />
            <div className="card-body" id="join" />
            <h4 className="card-title" style="text-align: center;">Join the Force</h4>
            <form method="POST" className="my-login-validation" novalidate="" />
                <div className="form-group">
                    <label for="name">GamerTag</label>
                    <input id="name" type="text" className="form-control" name="name" required autofocus>
                        <div className="invalid-feedback">
                            What's your name?
                                        </div>


                        <div className="form-group">
                            <label for="email">E-Mail Address</label>
                            <input id="email" type="email" className="form-control" name="email" required>
                                <div className="invalid-feedback">
                                    Your email is invalid
                                </div>


                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" type="password" className="form-control" name="password" required
                                        data-eye />
                                        <div className="invalid-feedback">
                                            Password is required
                                        </div>


                                        <div className="form-group">
                                            <div className="custom-checkbox custom-control">
                                                <input type="checkbox" name="agree" id="agree" className="custom-control-input"
                                                    required="" />
                                                    <label for="agree" className="custom-control-label">I agree to the <a href="#">Terms
                                                    and Conditions</a></label>
                                                    <div className="invalid-feedback">
                                                        You must agree with our Terms and Conditions
                                            </div>
                                        </div>
                                            </div>

                                            <div className="form-group m-0">
                                                <button type="submit" className="btn btn-primary btn-block">
                                                    Register
                                        </button>
                                            </div>
                                            <div className="mt-4 text-center">
                                                Already have an account? <a href="index.html">Login</a>
                                            </div>
                                        </div>
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

export default Account;