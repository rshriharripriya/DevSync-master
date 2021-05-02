import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import SocialLogin from "./SocialLogin";

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirectToReferer: false,
            loading: false,
            recaptcha: false
        };
    }

    handleChange = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    recaptchaHandler = e => {
        this.setState({ error: "" });
        let userDay = e.target.value.toLowerCase();
        let dayCount;

        if (userDay === "sunday") {
            dayCount = 0;
        } else if (userDay === "monday") {
            dayCount = 1;
        } else if (userDay === "tuesday") {
            dayCount = 2;
        } else if (userDay === "wednesday") {
            dayCount = 3;
        } else if (userDay === "thursday") {
            dayCount = 4;
        } else if (userDay === "friday") {
            dayCount = 5;
        } else if (userDay === "saturday") {
            dayCount = 6;
        }

        if (dayCount === new Date().getDay()) {
            this.setState({ recaptcha: true });
            return true;
        } else {
            this.setState({
                recaptcha: false
            });
            return false;
        }
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true });
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signin(user).then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false });
                } else {
                    // authenticate
                    authenticate(data, () => {
                        this.setState({ redirectToReferer: true });
                    });
                }
            });
        } else {
            this.setState({
                loading: false,
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    signinForm = (email, password, recaptcha) => (
        <form>
            <div className="form-group form text-light">
                <label className="text-muted text-light">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control textarea"
                    value={email}
                />
            </div>
            <div className="form-group form text-light">
                <label className="text-muted textarea text-light" >Password</label>
                <input
                    onChange={this.handleChange("password")}
                    type="password"
                    className="form-control textarea"
                    value={password}
                />
            </div>

            <div className="form-group text-light">
                <label className="text-muted text-light">
                    {recaptcha ? "Thanks. You got it!" : "What day is today?"}
                </label>

                <input
                    onChange={this.recaptchaHandler}
                    type="text"
                    className="form-control text-light"
                />
            </div>

            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const {
            email,
            password,
            error,
            redirectToReferer,
            loading,
            recaptcha
        } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container text-light">
                <h2 className="text-light">SignIn</h2>
                <hr />
                <SocialLogin />
                <hr />
                <h6>Or</h6>
                <br />
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none", width:"max-content" }}
                >
                    {error}
                </div>

                {loading ? (
                    <div className="jumbotron text-center text-light">
                        <h2>Loading...</h2>
                    </div>
                ) : (
                    ""
                )}

                {this.signinForm(email, password, recaptcha)}

                <p>
                    <Link
                        to="/forgot-password"
                        className="btn btn-raised btn-danger text-light"
                    >
                        {" "}
                        Forgot Password
                    </Link>
                </p>
            </div>
        );
    }
}

export default Signin;
