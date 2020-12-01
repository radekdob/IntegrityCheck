import React, {useEffect, useState} from "react";
import axios from 'axios';
import {getBasicAuthHeaderValue} from '../shared/UserUtilities'

const ProfilePage = () => {

    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {

        const header = {
            'Content-Type': 'application/json',
            'Authorization': getBasicAuthHeaderValue()
        }

        axios.get('https://localhost:8443/auth/profile', {
            headers: header
        })
            .then(response => {
                setIsLoading(false)
                setProfile(response.data)
            })
            .catch(error => {
                setIsLoading(false)
                throw error
            })


    }, [])


    return (
                <div className="container custom-full-height">
                    <div className="columns is-centered">
                        <div className="column">
                            <div className="box ">

                                <h1 className="title has-text-centered has-text-weight-light">Historia sprawdzeń plików:</h1>
                                <hr/>
                                { isLoading ? <progress className="progress is-large is-info" max="100">60%</progress>: null}

                                {  !profile?.filesHistory ? <h2 className="subtitle has-text-centered">Nie dokonano jeszcze żadnych sprawdzeń integralności plików</h2> :
                                <table className="table is-striped">
                                    <thead>
                                    <tr>
                                        <th>L.p.</th>
                                        <th>Nazwa pliku:</th>
                                        <th>Link do pobrania:</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {profile?.filesHistory ? profile.filesHistory.map((fileHistory, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <th>{fileHistory.filename}</th>
                                                <th><a href={fileHistory.localLink} download>{fileHistory.localLink}</a>
                                                </th>
                                            </tr>
                                        )
                                    ) : null}
                                    </tbody>

                                </table> }
                            </div>
                        </div>
                    </div>
                </div>

    )

}
export default ProfilePage;
