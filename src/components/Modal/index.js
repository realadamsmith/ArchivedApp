import React, { useState } from "react";
import "./styles.scss";
import {AiOutlineCloseCircle} from "react-icons/ai"

const Modal = ({ hideModal, toggleModal, children }) => {
    if (hideModal) return null;

    return (
        <>
            <div className="modalOverlay" onClick={() => toggleModal()} />

            <div className="modal">
            <AiOutlineCloseCircle className="ExitButton" onClick={() => toggleModal()}/>
            {children}</div>
        </>
    );
};

export default Modal;
