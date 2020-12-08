import React from "react";
import Password from "../img-frontend/Password.png"
import "../styles/reset.css"


function Reset() {
    return (
        <div className="my-login-page">
            <section className="h-100">
                <div className="container h-100">
                    <div className="row justify-content-md-center align-items-center h-100" />
                    <div className="card-wrapper" />
                    <div className="brand" /><img src={Password} alt="logo" />

                </div>
                <div className="card fat" />
                <div className="card-body" />
                <h4 className="card-title">Reset Password</h4>
                <form method="POST" className="my-login-validation" novalidate="">
                    <div className="form-group">
                        <label for="new-password">New Password</label>
                        <input id="new-password" type="password" className="form-control" name="password"
                            required autofocus data-eye>
                            <div className="invalid-feedback">
                                Password is required
                                        </div>
                            <div className="form-text text-muted">
                                Make sure your password is strong and easy to remember
                                        </div>


                            <div className="form-group m-0">
                                <button type="submit" className="btn btn-primary btn-block">
                                    Reset Password
                                        </button>
                            </div>
                        </input>
                    </div>
                </form>
            </section>
            <div className="card-footer">
                Copyright &copy; 2020 &mdash; DG Universe
                        </div>
        </div >
    )
}

export default Reset; 
