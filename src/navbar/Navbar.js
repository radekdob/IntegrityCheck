import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import {AuthContext} from "../auth/AuthContext";
import logo2 from "../assets/logo2.svg"
import "../App.css"
import { useHistory } from 'react-router-dom';
const Navbar = () => {
    const {isAuth, setAuth} = useContext(AuthContext);

    const history = useHistory();
    const logout = () => {
        setAuth(false);
        sessionStorage.removeItem('user');
        history.push('/')
    }
    return (

        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">

                <Link className="navbar-item" to="/">
                    <img src={logo2} alt="logo" className="logo"/>
                </Link>

            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">
                        Strona główna
                    </Link>

                    <Link className="navbar-item" to="/integrity">
                        Sprawdź plik
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">

                        <div className="buttons">
                            {isAuth ? <Link className="button is-light" to="/profile">Moje konto</Link> : null}
                            {!isAuth ? <Link className="button is-info" to="/login">Zaloguj się</Link> : null}
                            {isAuth ? <button className="button is-info" onClick={logout}>
                                Wyloguj się</button> : null}
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    )


}

export default Navbar;
