import {useForm} from "react-hook-form";
import React, {useContext, useState} from "react";
import axios from 'axios';
import CheckIntegrityResult from "./CheckIntegrityResult";
import {AuthContext} from "../auth/AuthContext";
import {getBasicAuthHeaderValue} from "../shared/UserUtilities";

const CheckIntegrityForm = () => {
    const {isAuth} = useContext(AuthContext);

    const {register, handleSubmit, watch, errors, formState, reset} = useForm({mode: 'onChange'});
    const algoritmDropdownValue = watch('algoritmType', 'PGP');

    const [isLoading, setIsLoading] = useState(false)
    const [showLoadingInfo, setShowLoadingInfo] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [checkIntegrityResponse, setCheckIntegrityResponse] = useState(null)


    const onSubmit = data => {

        if (showResult) {
            setShowResult(false)
            setCheckIntegrityResponse(null)
        }

        setIsLoading(true)
        const timeout = setTimeout(() => {

            setShowLoadingInfo(true)

        }, 4000)


        const headers = {
            'Content-Type': 'application/json'
        }
        if (isAuth) {
            headers.Authorization = getBasicAuthHeaderValue()
        }
        axios.post("https://localhost:443/v1/integrity/", data, {
            headers
        })
            .then(response => {
                clearTimeout(timeout);
                setIsLoading(false)
                reset()
                setShowLoadingInfo(false)
                setCheckIntegrityResponse({
                    status: true,
                    message: response.data.message,
                    link: response.data.localLink ?? null
                })
                setShowResult(true)
            })
            .catch(error => {
                clearTimeout(timeout);
                setCheckIntegrityResponse({
                    status: false,
                    message: error.response.data.message
                })
                setIsLoading(false)
                setShowLoadingInfo(false)
                setShowResult(true)
            })

    };
    return (

        <form onSubmit={handleSubmit(onSubmit)}>

            <p className="title has-text-black has-text-weight-light	">
                Wprowadź adres zasobu:
            </p>
            <div className="field has-addons">
                <div className="control" style={{width: 800}}>
                    <input
                        name="assetAddress" defaultValue="" ref={register({required: true})}
                        className={errors.assetAddress ? "input is-rounded is-large is-danger" : "input is-rounded is-large"}
                        type="text" placeholder="Adres pliku..."/>
                </div>
                <div className="control">
                    <button className="button is-danger is-large"
                            type="submit" disabled={!formState.isValid}
                    >
                        Sprawdź
                    </button>
                </div>
            </div>
            {errors.assetAddress ?
                <p className="help is-danger">Te pole jest wymagane !</p> : null}

            {showLoadingInfo ? <div className="notification is-info">
                Proces sprawdzania pliku jest w toku. W zależności od rozmiaru będzie trwał on
                odpowiednio dłużej.
            </div> : null}
            {isLoading ?
                <progress className="progress is-large is-info" max="100"></progress> : null}

            {showResult ? <CheckIntegrityResult response={checkIntegrityResponse}/> : null}


            <nav className="level">
                <div className="level-item has-text-centered">
                    <div className="field">
                        <label className="label">Wybierz typ skrótu/sygnatury:</label>
                        <div className="control">
                            <div className="select is-rounded">
                                <select name="algoritmType"
                                        ref={register({required: true})}>
                                    <option>PGP</option>
                                    <option>MD5</option>
                                    <option>SHA256</option>
                                    <option>SHA512</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="field">
                <label
                    className="label">{algoritmDropdownValue !== 'PGP' ? 'Hasz/skrót pliku:' : 'Sygnatura pliku:'}</label>
                <div className="control">
                                    <textarea className={errors.algoritmValue ? "textarea is-danger" : "textarea"}
                                              name="algoritmValue" defaultValue=""
                                              ref={register({required: true})}
                                              placeholder={algoritmDropdownValue === 'PGP' ?
                                                  'Wprowadź sygnaturę PGP pliku' : 'Wprowadź wartość haszu/skrótu'}>
                                    </textarea>
                    {errors.algoritmValue ?
                        <p className="help is-danger">Te pole jest wymagane !</p> : null}
                </div>
            </div>
            {algoritmDropdownValue === 'PGP' ?
                <div className="field">
                    <label className="label">Klucz publiczny:</label>
                    <div className="control">
                                    <textarea className={errors.publicKey ? "textarea is-danger" : "textarea"}
                                              name="publicKey" defaultValue=""
                                              ref={register({required: true})}
                                              placeholder="Wprowadź klucz publiczny, aby zweryfikować sygnaturę">
                                    </textarea>
                        {errors.publicKey ?
                            <p className="help is-danger">Te pole jest wymagane !</p> : null}
                    </div>
                </div> : null}

        </form>

    )

}
export default CheckIntegrityForm;
