import React from "react";

const Modal = ({ popupMessage, setPopupMessage }) => {

    const ok = () => {
        setPopupMessage('')
    }

    return (
        <div className="modal-background">
            <div className="modal-content">
                <p>{popupMessage}</p>
                <button onClick={ok} >OK</button>
            </div>
        </div>
    )
}

export default Modal