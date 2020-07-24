import React, {useState} from 'react';
import './login.css';
import Input from '../../components/input/input';
import {login_credential} from "../../mock-data/mock-data";
import * as actions from "../../store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const Login = (props: any) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const handleChange = (event: any) => {

        if (event.target.name === 'username') {
            setUserName(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleSubmit = () => {
        if (username === login_credential.validCredentials.userName
            && password === login_credential.validCredentials.password) {
            props.onAuth(null, true);
        } else {
            props.onAuth('Please enter valid credentials', false);
        }
    }
    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Sign In</h2>
                <Input name={"username"}
                       type={"text"}
                       label={"Username"}
                       onChangeFunction={handleChange}
                       value={username}/>
                <Input name={"password"}
                       label={"Password"}
                       type={"password"}
                       onChangeFunction={handleChange}
                       value={password}/>
                {props.error && <p className="error">{props.error}</p>}
                <button className="login-button" onClick={handleSubmit}>Login</button>
                <div className="account-help-links">
                    <p className="user-status-query">New to Bridgify? <span><a href="#">Create an account</a></span></p>
                    <p><a href="#">Forgot passoword</a></p>
                </div>
            </div>
        </div>
    );
}


const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        onAuth: actions.auth
    }, dispatch)
};

const mapStateToProps = (state: any) => {
    return {
        error: state.auth.error,
        isLoggedIn: state.auth.isLoggedIn
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);