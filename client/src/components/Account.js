import React from 'react';
import "../img-frontend/Create.gif"
import "../styles/account.css";

function Account() {
    return (
        <div class="my-login-page">
            <section class="h-100" />
            <div class="container h-100" />
            <div class="row justify-content-md-center h-100" />
            <div class="card-wrapper" />
            <div class="brand" />
            <div className="brand"><img src={Create} alt="Join Us" />

            </div>
            <div class="card fat" />
            <div class="card-body" id="join" />
            <h4 class="card-title" style="text-align: center;">Join the Force</h4>
            <form method="POST" class="my-login-validation" novalidate="">
                <div class="form-group">
                    <label for="name">GamerTag</label>
                    <input id="name" type="text" class="form-control" name="name" required autofocus>
                        <div class="invalid-feedback">
                            What's your name?
                                        </div>


                        <div class="form-group">
                            <label for="email">E-Mail Address</label>
                            <input id="email" type="email" class="form-control" name="email" required>
                                <div class="invalid-feedback">
                                    Your email is invalid
                                        </div>


                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input id="password" type="password" class="form-control" name="password" required
                                        data-eye>
                                        <div class="invalid-feedback">
                                            Password is required
                                        </div>


                                        <div class="form-group">
                                            <div class="custom-checkbox custom-control">
                                                <input type="checkbox" name="agree" id="agree" class="custom-control-input"
                                                    required="">
                                                    <label for="agree" class="custom-control-label">I agree to the <a href="#">Terms
                                                    and Conditions</a></label>
                                                    <div class="invalid-feedback">
                                                        You must agree with our Terms and Conditions
                                            </div>
                                        </div>
                                            </div>

                                            <div class="form-group m-0">
                                                <button type="submit" class="btn btn-primary btn-block">
                                                    Register
                                        </button>
                                            </div>
                                            <div class="mt-4 text-center">
                                                Already have an account? <a href="index.html">Login</a>
                                            </div>
                                        </div>
                                                    </div>
                                </div>
                                <div class="card-footer">
                                    Copyright &copy; 2020 &mdash; DG Universe
                        </div>
                                            </div>
                        </div>
                                    </div>
        </section>

export default Account;