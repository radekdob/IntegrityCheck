import {Redirect, Route} from "react-router-dom";
import React from "react";



const GuardedRoute = ({ component: Component, auth, ...rest }) => (
    <Route {...rest} render={(props) => (
        !auth
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
)


export default GuardedRoute;
