import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' };
    else return { color: '#ffffff' };
};

const Menu = ({ history }) => (
    <div className="text-light " >
        <ul className="nav nav-tabs text-light navbar1"  style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
            <li className="nav-item" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                <Link className="nav-link" style={isActive(history, '/')} to="/" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                    Home
                </Link>
            </li>

            <li className="nav-item ">
                <Link
                    className={history.location.pathname === '/users' ? 'active nav-link' : 'not-active nav-link'}
                    to="/users" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}
                >
                    Users
                </Link>
            </li>

            <li className="nav-item">
                <Link to={`/post/create`} style={isActive(history, `/post/create`)} className="nav-link " style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                    Create Post
                </Link>
            </li>

            {!isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signin')} to="/signin" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                            Sign In
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/signup')} to="/signup" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                            Sign Up
                        </Link>
                    </li>
                </React.Fragment>
            )}
             

        
            {isAuthenticated() && isAuthenticated().user.role === 'admin' && (
                <li className="nav-item">
                    <Link to={`/admin`} style={isActive(history, `/admin`)} className="nav-link" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                        Admin
                    </Link>
                </li>
            )}

            {isAuthenticated() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link to={`/findpeople`} style={isActive(history, `/findpeople`)} className="nav-link" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                            Find People
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`/chat/${isAuthenticated().user._id}`} style={isActive(history, `//chat/${isAuthenticated().user._id}`)} className="nav-link" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                            Chat
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={isActive(history, `/user/${isAuthenticated().user._id}`)}
                            className="nav-link" style={{color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}
                        >
                             profile
                        </Link>
                    </li>

                    <li className="nav-item " style={{color:"white",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}>
                        <span
                            className="nav-link"
                            style={{ cursor: 'pointer',  color:"white ",fontSize:"18.667px",fontWeight:"bold",fontFamily:"sans-serif"}}
                            onClick={() => signout(() => history.push('/'))}
                        >
                            Sign Out
                        </span>
                    </li>

                </React.Fragment>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);
