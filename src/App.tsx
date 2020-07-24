import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import './App.css';
import Login from './containers/auth/login';
import {connect} from "react-redux";
import Feeds from './containers/feeds/feeds';
import Header from './components/header/header';

interface IProps {
    isAuthenticated: boolean
}

class App extends Component<IProps> {
    constructor(props: any) {
        super(props);
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/Auth" component={Login}/>
                <Redirect to='/Auth'/>
            </Switch>
        );

        if(this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/Feeds" component={Feeds}/>
                    <Redirect to='/Feeds'/>
                </Switch>
            )
        }
        return (
            <div className="App">
                {this.props.isAuthenticated && <Header isAuthenticated={this.props.isAuthenticated}/>}
                {routes}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps)(App);
