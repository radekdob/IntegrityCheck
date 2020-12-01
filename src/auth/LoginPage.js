import React, {useContext, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useForm} from "react-hook-form";
import {AuthContext} from "./AuthContext";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faLock, faUser} from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {

    const history = useHistory();
    const {isAuth, setAuth} = useContext(AuthContext);
    const [failureText, setFailureText] = useState('')

    const {register, handleSubmit, watch, errors} = useForm({mode: 'onChange'});
    const onSubmit = data => {
        const credentialsStringBtoa = window.btoa(data.username + ':' + data.password);

        axios.get("http://localhost:8080/auth/", {
            headers: {
                'Authorization': 'Basic ' + credentialsStringBtoa,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                const user = {
                    username : data.username,
                    btoa: credentialsStringBtoa
                }
                sessionStorage.setItem('user', JSON.stringify(user))
                setAuth(true)
                history.push('/')
            })
            .catch(error => {
                if (error?.response?.status === 401) {
                    setFailureText('Nieprawidłowe dane');
                } else {
                    setFailureText('Błąd połączenia. Spróbuj ponownie.')
                }

            })

    }


    return (
        <section className="hero is-fullheight-with-navbar">
            <div className="hero-body image-background">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4">
                            <div className="box">

                                <nav className="level" style={{marginBottom: 50}}>
                                    <div className="level-item has-text-centered">
                                        <h3 className="title has-text-weight-light">Logowanie</h3>
                                    </div>
                                </nav>
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="field">
                                        <label className="label">Nazwa użytkownika</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input name="username" defaultValue="" ref={register({required: true})}
                                                   className={errors.username ? 'input is-danger' : 'input'}
                                                   type="text"
                                                   placeholder="Wprowadź nazwę użytkownika"
                                            />
                                            <span className="icon is-small is-left">

                                                <FontAwesomeIcon icon={faUser}/>
                                    </span>
                                            <span className="icon is-small is-right">
                                     <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        </div>
                                        {errors.username ?
                                            <p className="help is-danger">Te pole jest wymagane !</p> : null}
                                    </div>

                                    <div className="field">
                                        <label className="label">Hasło</label>
                                        <div className="control has-icons-left has-icons-right">
                                            <input name="password" defaultValue="" ref={register({required: true})}
                                                   className={errors.password ? 'input is-danger' : 'input'}
                                                   type="password"
                                                   placeholder="Wprowadź hasło"
                                            />
                                            <span className="icon is-small is-left">
                                        <FontAwesomeIcon icon={faLock}/>
                                    </span>
                                            <span className="icon is-small is-right">
                                    <FontAwesomeIcon icon={faCheck}/>
                                        </span>
                                        </div>
                                        {errors.password ?
                                            <p className="help is-danger">Te pole jest wymagane !</p> : null}
                                    </div>

                                    {failureText ? <div className="notification is-danger">
                                        <strong>{failureText}</strong>

                                    </div> : null}


                                    <nav className="level">
                                        <div className="level-item has-text-centered">
                                            <div className="control">
                                                <button type="submit"
                                                        className="button is-info">Zaloguj
                                                </button>
                                            </div>
                                        </div>
                                    </nav>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );

}

export default LoginPage;
