import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Index from './pages/index';
import Home from './pages/home';
import Admin from './pages/admin';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Client from "./Client";

const auth = {
    isAuthenticated: true,
    user: {
        userId: 0,
        userName: '',
        nickname: '',
        email: '',
        defaultAddrId: 0,
    },
    addresses: [],
    handleLogin(user, history) {
        console.log(user);
        Client.login(user, result => {
            const response = result[0].response;
            console.log(response);
            if (response.code === 0) {
                this.isAuthenticated = true;
                this.user = result[0].user;
                this.addresses = result[0].addresses;
                history.push('/home');
            }
        });
    },
};

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={Index} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <PrivateRoute exact path='/home' component={Home} />
            <Route path='/admin' component={Admin} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        auth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }}/>
        )
    )}/>
);

export { auth };
export default Routes;