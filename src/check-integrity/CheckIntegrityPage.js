import React from "react";
import CheckIntegrityForm from "./CheckIntegrityForm";

const CheckIntegrityPage = () => {

    return (
        <section className="hero check-integrity-background is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-6 has-text-centered">
                            <div className="box">
                                <CheckIntegrityForm/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

}
export default CheckIntegrityPage;
