import React from 'react';
import './header.css';
import {bindActionCreators} from "redux";
import * as actions from "../../store/actions";
import {connect} from "react-redux";

const Header = (props: any) => {

    const handleLogout = () => {
        props.onLogout(false);
    }

    return (
        <div className="header">
            <h1 className="app-title">News App</h1>
            <button onClick={handleLogout} className="logout-button">Log out</button>
        </div>
    );
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        onLogout: actions.logout
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Header);