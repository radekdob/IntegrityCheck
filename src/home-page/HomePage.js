import React from 'react';


const HomePage = () => {


    return (
        <section className="hero is-light is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title is-1">
                        Integrity check
                    </h1>
                    <h2 className="subtitle is-3">
                        Sprawdź integralność danych.
                    </h2>
                    <h3 className="subtitle is-4">
                        Wspierane algorytmy oraz narzędzia szyfrowania:
                        <div className="content">
                            <ul>
                                <li>SHA256</li>
                                <li>SHA512</li>
                                <li>MD5</li>
                                <li>PGP</li>
                            </ul>
                        </div>
                    </h3>
                </div>
            </div>
        </section>
    )
}
export default HomePage;
