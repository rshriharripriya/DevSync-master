import React, { Component } from "react";
import { signup } from "../auth";
import { Link } from "react-router-dom";
import SocialLogin from "./SocialLogin";
import app from "./../base"

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false,
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
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        // console.log(user);
        if (this.state.recaptcha) {
            signup(user).then(async data => {
                if (data.error){
                    this.setState({ error: data.error });
                }
                else{
                await app
                .auth()
                .createUserWithEmailAndPassword(email.trim(), password);
                    this.setState({
                        error: "",
                        name: "",
                        email: "",
                        password: "",
                        open: true
                    });
            }});
        } else {
            this.setState({
                error: "What day is today? Please write a correct answer!"
            });
        }
    };

    signupForm = (name, email, password, recaptcha) => (
        <form>
            <div className="form-group form text-light">
                <label className="text-muted text-light">Name</label>
                <input
                    onChange={this.handleChange("name")}
                    type="text"
                    className="form-control textarea"
                    value={name}
                />
            </div>
            <div className="form-group form text-light">
                <label className="text-muted textarea text-light">Email</label>
                <input
                    onChange={this.handleChange("email")}
                    type="email"
                    className="form-control textarea"
                    value={email}
                />
            </div>
            <div className="form-group form text-light">
                <label className="text-muted textarea text-light">Password</label>
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
                className="btn btn-raised btn-primary text-light"
            >
                Submit
            </button>
        </form>
    );

    render() {
        const { name, email, password, error, open, recaptcha } = this.state;
        return (
            <div className="container text-light">
                <h2 className="text-light">Signup</h2>
                <hr />
                <SocialLogin />
                <hr />
                <h6>Or</h6>
                <br />
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" , width:"max-content"}}
                >
                    {error}
                </div>

                <div
                    className="alert alert-info "
                    style={{ display: open ? "" : "none" }}
                >
                    New account is successfully created. Please{" "}
                    <Link to="/signin" className="text-primary" >Sign In</Link>.
                </div>

                {this.signupForm(name, email, password, recaptcha)}
            </div>
        );
    }
}

export default Signup;
