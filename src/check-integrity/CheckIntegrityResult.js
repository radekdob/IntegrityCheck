import React from "react";


const CheckIntegrityResult = ({response: {status, message, link}}) => {


    return (
        <article className={status ? "message is-success" : "message is-danger"}>
            <div className="message-header">
                <p>{status ? 'Weryfikacja przebiegła pomyślnie.' : 'Weryfikacja przebiegła negatywnie'}</p>
            </div>
            <div className="message-body">
                <p>{message} </p>
                <br/>
                {link ? <a   href={link}  target="_blank" download><strong>{link}</strong></a> : null}
            </div>
        </article>
    )
}

export default CheckIntegrityResult;
