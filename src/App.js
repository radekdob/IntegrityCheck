import './App.css';
import React, {useEffect, useState} from "react";
import Navbar from "./navbar/Navbar";
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import HomePage from "./home-page/HomePage";
import {AuthContext} from "./auth/AuthContext";
import CheckIntegrityPage from "./check-integrity/CheckIntegrityPage";
import GuardedRoute from "./shared/GuardedRoute";
import LoginPage from "./auth/LoginPage";
import ProfilePage from "./auth/ProfilePage"
import {isUserLogged} from './shared/UserUtilities'
import Footer from "./footer/Footer";

const App = ({authState}) => {
    const [isAuth, setAuth] = useState(authState);
    const [firstLoad, setFirstLoad] = useState(false);


    /*useEffect(() => {

        if (isUserLogged() && !isAuth) {
            setAuth(true)
        }
        setFirstLoad(true)
    }, [])*/

    return (
        <div className="container">

             <Router data-testid="router" >
                <AuthContext.Provider value={{isAuth, setAuth}}>
                    <Navbar/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <GuardedRoute path="/login" component={LoginPage} auth={isAuth}/>
                        <GuardedRoute path="/profile" component={ProfilePage} auth={!isAuth}/>
                        <Route path="/integrity"  component={CheckIntegrityPage}/>
                    </Switch>
                    <Footer/>
                </AuthContext.Provider>
            </Router>
        </div>

    );
}

export default App;
