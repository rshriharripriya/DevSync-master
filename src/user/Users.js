import React, { Component } from "react";
import { list } from "./apiUser";
import DefaultProfile from "../images/avatar.jpg";
import { Link } from "react-router-dom";

class Users extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        list().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                this.setState({ users: data });
            }
        });
    }

    renderUsers = users => (
        <div className="row p-3 " style={{
    padding: "10px",display:"flex",marginLeft:"10cm"
    }}>
            {users.map((user, i) => (
                <div className="card col-md-4 center " key={i} style={{borderRadius: "10px",
    padding: "10px",
    margin: "10px",}}>
                    <img
                        style={{  height: "200px", width: "200px",
                        margin:"0.5cm", borderRadius: "50%",}}
                        className="img-thumbnail"
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${
                            user._id
                        }`}
                        onError={i => (i.target.src = `${DefaultProfile}`)}
                        alt={user.name}
                    />
                    <div className="card-body center">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link
                            to={`/user/${user._id}`}
                            className="btn btn-raised btn-primary btn-sm"
                            style={{float:"left"}}
                        >
                            View Profile
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );

    render() {
        const { users } = this.state;
        return (
            <div className="homeheight p-2 m-2 center">
                <h3 className="text-light align-center" style={{textAlign:"center"}}>Users</h3>

                {this.renderUsers(users)}
            </div>
        );
    }
}

export default Users;
